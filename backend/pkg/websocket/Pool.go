package websocket

import (
	"encoding/json"
	"fmt"
)

type Rooms struct {
	Pools map[string]*Pool
}

func InitRooms() *Rooms {
	return &Rooms{
		Pools: make(map[string]*Pool),
	}
}

type Pool struct {
	ID         string
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool(id string) *Pool {
	return &Pool{
		ID:         id,
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for c := range pool.Clients {
				user, _ := json.Marshal(&Client{ID: c.ID, Name: c.Name})
				c.Conn.WriteJSON(Message{Type: 2, Body: fmt.Sprint(client.Name, " has Joined..."), User: string(user), Pool: pool.ID})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			if len(pool.Clients) == 0 {
				fmt.Println("NO ONE LEFT IN ROOM")
				// delete(Rooms, pool)
			} else {
				for c := range pool.Clients {
					user, _ := json.Marshal(&Client{ID: c.ID, Name: c.Name})
					c.Conn.WriteJSON(Message{Type: 3, Body: fmt.Sprint(client.Name, " has Disconnected..."), User: string(user), Pool: pool.ID})
				}
			}
			break
		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients in Pool")
			for c := range pool.Clients {
				if err := c.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}
		}
	}
}
