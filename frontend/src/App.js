import React, { useState, useEffect } from 'react';
import Header from './components/header'
import History from './components/history'
import ChatInput from './components/chatInput'

import { connect, sendMsg } from './api';
import './App.css';

function App() {
	const [message, setMessage] = useState({})
	const [chatHistory, setChatHistory] = useState([])

	useEffect(() => {
		connect((msg) => {
			console.log("New Message")
			setMessage(msg)
		})
	}, [])

	useEffect(() => {
		if (Object.keys(message).length != 0) {
			setChatHistory([...chatHistory, message])
			console.log([...chatHistory, message])
		}
	}, [message])

	const send = (evt) => {
		if (evt.keyCode === 13) {
			sendMsg(evt.target.value)
			evt.target.value = ''
		}
	}

	return (
		<>
			<Header />
			<History chatHistory={chatHistory} />
			<ChatInput send={send} />
		</>
	);
}

export default App;
