package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"./pkg/websocket"
)

func servWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request, user string, key string) {
	fmt.Println("Websocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}

	client := &websocket.Client{
		ID:   key,
		Name: user,
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func generateID() string {
	rand.Seed(time.Now().UnixNano())
	chars := []rune("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
	nums := []rune("0123456789")
	var b strings.Builder
	for i := 0; i < 5; i++ {
		if i < 2 {
			b.WriteRune(chars[rand.Intn(len(chars))])
		} else {
			b.WriteRune(nums[rand.Intn(len(nums))])
		}
	}
	return b.String()
}

func setupRoutes() {
	rooms := websocket.InitRooms()
	initialPool := websocket.NewPool(generateID())
	rooms.Pools[initialPool.ID] = initialPool
	go initialPool.Start()

	rand.Seed(time.Now().UnixNano())

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		key := r.Header.Get("Sec-Websocket-Key")
		name := r.URL.Query()["username"][0]
		room := r.URL.Query()["room"][0]
		if room == "" {
			// randomPool
			for id := range rooms.Pools {
				n := rand.Intn(len(rooms.Pools))
				fmt.Println("IDS: ", id, "RANDOM", n)
			}
			servWs(initialPool, w, r, name, key)
		} else {
			if p, ok := rooms.Pools[room]; ok {
				servWs(p, w, r, name, key)
			} else {
				pool := websocket.NewPool(room)
				go pool.Start()
				rooms.Pools[pool.ID] = pool
				servWs(pool, w, r, name, key)
			}
		}
	})
}

func main() {
	fmt.Println("GoReact - Chat Application")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
