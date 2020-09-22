import React, { useState, useEffect } from 'react'

const History = (props) => {
    const messages = props.chatHistory.map((msg, idx) => (
        <p key={idx}>{msg.data}</p>
    ))

    return (
        <div className='chatHistory'>
            <h2>Chat History</h2>
            {messages}
        </div>
    )
}

export default History