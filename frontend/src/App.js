import React, { useState, useEffect, useRef } from 'react';
import Header from './components/header'
import History from './components/history'
import ChatInput from './components/chatInput'

// import { connect, sendMsg } from './api';
import './App.css';

function App() {
	const [message, setMessage] = useState({})
	const [chatHistory, setChatHistory] = useState([])
	const [loggedIn, setLoggedIn] = useState(false)
	const [username, setUsername] = useState('')
	const [key, setKey] = useState('')
	const [room, setRoom] = useState('')
	let socket = useRef()

	useEffect(() => {
		if (loggedIn) {
			socket.current = new WebSocket("ws://localhost:8080/ws?username=" + username + "&room=" + room)
			console.log("Attempting Connection...")
			
			socket.current.onopen = () => {
				console.log("Successfully Connected")
			}
		
			socket.current.onmessage = (msg) => {
				console.log(msg)
				setMessage(msg)
			}
			
			socket.current.onerror = (err) => {
				console.error("Socket Error: ", err)
			}
			return (
				socket.current.onclose = (evt) => {
					console.log("Socket Connection Closed: ", evt)
				}
			)
		}
	}, [loggedIn])

	useEffect(() => {
		if (Object.keys(message).length !== 0) {
			setChatHistory([...chatHistory, message])
			if (chatHistory.length === 0) {
				setKey(JSON.parse(JSON.parse(message.data).user).id)
			}
		}
	}, [message])

	const send = (evt) => {
		if (evt.keyCode === 13) {
			console.log("Sending Message: ", evt.target.value)
			socket.current.send(evt.target.value)
			evt.target.value = ''
		}
	}

	const typeName = (evt) => {
		if (evt.keyCode === 13 && evt.target.value.trim() !== '') {
			setLoggedIn(true)
			if (testRoomCode()) {
				setRoom(document.getElementById('room').value.toUpperCase())
			}
			setUsername(evt.target.value)
		}
	}

	const testRoomCode = () => RegExp(/([A-Z][A-Z][0-9][0-9][0-9])/g).test(document.getElementById('room').value.toUpperCase())

	const logIn = () => {
		if (document.getElementById('name').value.trim() !== '') {
			setLoggedIn(true)
			if (testRoomCode()) {
				setRoom(document.getElementById('room').value.toUpperCase())
			}
			setUsername(document.getElementById('name').value)
		}
	}

	return (
		<>
			{ !loggedIn &&
				<div className='modal'>
					<div className='modalContent'>
						<div>
							<label htmlFor='room'>Enter Room Code:</label>
							<input id='room' type='text' placeholder='Leave blank to join random room' />
							<div className='toolTip'>format
								<span className='toolTipText'>Room Code: 'AA000'</span>
							</div>
						</div>
						<div>
							<label htmlFor='name'>Your Name Is:</label>
							<input id='name' type='text' maxLength='20' onKeyDown={typeName} placeholder='Enter name here...' />
							<button onClick={logIn} type='button'>Log In</button>
						</div>
					</div>
				</div>
			}
			<Header />
			<div className='content'>
				<History chatHistory={chatHistory} me={key} />
				<ChatInput send={send} />
			</div>
		</>
	);
}

export default App;
