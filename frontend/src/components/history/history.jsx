import React from 'react'
import Message from './message'
import './index.css'

const History = (props) => {
    const me = props.me

    const messages = props.chatHistory.map((msg, idx) => (
        <Message key={idx} message={msg.data} me={me} />
    ))

    return (
        <div className='chatHistory'>
            <h1>Chat History</h1>
            <div className='messages'>
                {messages}
            </div>
        </div>
    )
}

export default History