import React from 'react'
import Message from './message'

const History = (props) => {
    const messages = props.chatHistory.map((msg, idx) => (
        <Message key={idx} message={msg.data} />
    ))

    return (
        <div className='chatHistory'>
            <h2>Chat History</h2>
            {messages}
        </div>
    )
}

export default History