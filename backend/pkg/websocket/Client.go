package websocket

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Conn *websocket.Conn
	Room *Room
}

type Message struct {
	Type int    `json:"type"`
	Body string `json:"body"`
	User string `json:"user"`
	Room string `json:"room"`
}

func (c *Client) Read() {
	defer func() {
		c.Room.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		user, _ := json.Marshal(&Client{ID: c.ID, Name: c.Name})
		message := Message{Type: messageType, Body: string(p), User: string(user), Room: c.Room.ID}
		c.Room.Broadcast <- message
		fmt.Printf("Message Received: %+v\n", message)
	}
}
