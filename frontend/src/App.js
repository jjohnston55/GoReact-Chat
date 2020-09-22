import React, { useEffect } from 'react';
import { connect, sendMsg } from './api';
import './App.css';

function App() {

  useEffect(() => {
    connect();
  }, [])

  const send = () => {
    console.log('test')
    sendMsg('test')
  }

  return (
    <div className="App">
      <button onClick={send}>Send</button>
    </div>
  );
}

export default App;
