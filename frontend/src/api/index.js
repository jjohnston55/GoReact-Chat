const socket = new WebSocket("ws://localhost:8080/ws")

const connect = () => {
    console.log("Attempting Connection...")

    socket.onopen = () => {
        console.log("Successfully Connected")
    }

    socket.onmessage = (msg) => {
        console.log(msg)
    }

    socket.onclose = (evt) => {
        console.log("Socket COnnection Closed: ", evt)
    }

    socket.onerror = (err) => {
        console.error("Socket Error: ", err)
    }
}

const sendMsg = (msg) => {
    console.log("Sending Message: ", msg)
    socket.send(msg)
}

export { connect, sendMsg }