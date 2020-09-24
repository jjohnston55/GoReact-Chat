import React from 'react'
import './index.css'

const ChatInput = (props) => {
    const { send } = props

    const keyDown = (evt) => {
        if (evt.target.value.trim() != '') {
            send(evt)
        }
    }

    const submit = () => {
        if (document.getElementById('userMessage').value.trim() != '') {
            send(document.getElementById('userMessage').value)
        }
    }

    return (
        <div className='chatInput'>
            <input id='userMessage' onKeyDown={keyDown} type='text' placeholder='Enter message here...' />
            <button type='button' onClick={submit}>Send Message</button>
        </div>
    )
}

export default ChatInput