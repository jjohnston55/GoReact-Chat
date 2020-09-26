import React from 'react'
import Message from './message'
import './index.css'

const History = (props) => {
    const me = props.me
    const chatHistory = props.chatHistory

    const messages = chatHistory.map((msg, idx) => (
        <Message key={idx} message={msg.data} me={me} />
    ))

    return (
        <div className='chatHistory'>
            <h1>Chat History {chatHistory.length > 0 ? '- Room Code: ' + JSON.parse(chatHistory[0].data).pool : ''}</h1>
            <div className='messages'>
                {messages}
            </div>
        </div>
    )
}

export default History