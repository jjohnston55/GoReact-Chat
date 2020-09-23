import React from 'react'

const ChatInput = (props) => {
    const { send } = props

    const keyDown = (evt) => send(evt) 

    return (
        <div className='ChatInput'>
            <input onKeyDown={keyDown} />
        </div>
    )
}

export default ChatInput