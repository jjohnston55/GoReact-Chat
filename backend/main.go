package main

import (
	"fmt"
	"net/http"

	"./pkg/websocket"
)

func servWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request, user string) {
	fmt.Println("Websocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}

	client := &websocket.Client{
		ID:   user,
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := websocket.NewPool()

	go pool.Start()
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("REQUEST INFO: ", r.URL.Query()["username"][0])
		name := r.URL.Query()["username"][0]
		servWs(pool, w, r, name)
	})
}

func main() {
	fmt.Println("GoReact - Chat Application")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
