package websocket

import (
	"encoding/json"
	"fmt"
)

type Pool struct {
	Rooms map[string]*Room
}

func InitPools() *Pool {
	return &Pool{
		Rooms: make(map[string]*Room),
	}
}

type Room struct {
	ID         string
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewRoom(id string) *Room {
	return &Room{
		ID:         id,
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (room *Room) Start(pool *Pool) {
	defer func() {
		fmt.Println("Closing Room")
		delete(pool.Rooms, room.ID)
	}()

	for {
		select {
		case client := <-room.Register:
			room.Clients[client] = true
			fmt.Println("Size of Connection Room: ", len(room.Clients))
			for c := range room.Clients {
				user, _ := json.Marshal(&Client{ID: c.ID, Name: c.Name})
				c.Conn.WriteJSON(Message{Type: 2, Body: fmt.Sprint(client.Name, " has Joined..."), User: string(user), Room: room.ID})
			}
			break
		case client := <-room.Unregister:
			delete(room.Clients, client)
			fmt.Println("Size of Connection Room: ", len(room.Clients))
			if len(room.Clients) == 0 {
				fmt.Println("No one left in room")
				return
			} else {
				for c := range room.Clients {
					user, _ := json.Marshal(&Client{ID: c.ID, Name: c.Name})
					c.Conn.WriteJSON(Message{Type: 3, Body: fmt.Sprint(client.Name, " has Disconnected..."), User: string(user), Room: room.ID})
				}
			}
			break
		case message := <-room.Broadcast:
			fmt.Println("Sending message to all clients in room")
			for c := range room.Clients {
				if err := c.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
