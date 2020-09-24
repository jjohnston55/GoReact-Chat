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
	let socket = useRef()

	useEffect(() => {
		if (loggedIn) {
			socket.current = new WebSocket("ws://localhost:8080/ws?username=" + username)
			console.log("Attempting Connection...")
			
			socket.current.onopen = () => {
				console.log("Successfully Connected")
			}
		
			socket.current.onmessage = (msg) => {
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
		if (evt.keyCode === 13 && evt.target.value.trim() != '') {
			setLoggedIn(true)
			setUsername(evt.target.value)
		}
	}

	const logIn = () => {
		if (document.getElementById('name').value.trim() != '') {
			setLoggedIn(true)
			setUsername(document.getElementById('name').value)
		}
	}

	return (
		<>
			{ !loggedIn &&
				<div className='modal'>
					<div className='modalContent'>
						<label htmlFor='name'>Your Name Is:</label>
						<input id='name' type='text' onKeyDown={typeName} placeholder='Enter name here...' />
						<button onClick={logIn} type='button'>Log In</button>
					</div>
				</div>
			}
			<Header />
			<div className='content'>
				<History chatHistory={chatHistory} me={username} />
				<ChatInput send={send} />
			</div>
		</>
	);
}

export default App;
