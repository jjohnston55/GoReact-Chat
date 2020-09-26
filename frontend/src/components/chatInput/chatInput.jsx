import React from 'react'
import './index.css'

const ChatInput = (props) => {
    const { send } = props

    const keyDown = (evt) => {
        if (evt.target.value.trim() != '') {
            send(evt)
        }
    }

    return (
        <div className='chatInput'>
            <input id='userMessage' onKeyDown={keyDown} type='text' placeholder='Enter message here...' />
        </div>
    )
}

export default ChatInput