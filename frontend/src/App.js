import React, { useState, useEffect } from 'react';
import Header from './components/header'
import History from './components/history'

import { connect, sendMsg } from './api';
import './App.css';

function App() {
  const [message, setMessage] = useState({})
  const [chatHistory, setChatHistory] = useState([])

  useEffect(() => {
    connect((msg) => {
      console.log("New Message")
      setMessage(msg)
    });
  }, [])

  useEffect(() => {
    setChatHistory([...chatHistory, message])
  }, [message])

  const send = () => {
    sendMsg('test ' + Math.random())
  }

  return (
    <div className="App">
      <Header />
      <History chatHistory={chatHistory} />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default App;
