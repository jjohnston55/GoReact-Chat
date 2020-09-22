package main

import (
	"fmt"
	"net/http"

	"./pkg/websocket"
)

func servWs(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Host)

	ws, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	go websocket.Writer(ws)
	websocket.Reader(ws)
}

func setupRoutes() {
	http.HandleFunc("/ws", servWs)
}

func main() {
	fmt.Println("GoReact - Chat Application")
	setupRoutes()
	http.ListenAndServe(":8080", nil)
}
