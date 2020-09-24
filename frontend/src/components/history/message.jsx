import React, { useState } from 'react'

const Message = (props) => {
    const message = JSON.parse(props.message)
    const [imgSrc, ] = useState('/img/profile_' + Math.floor(Math.random() * 24) + '.jpg')

    switch (message.type) {
        case 2: // User Joined
        case 3: // User Disconnected
            return (
                <div className='userStatus'>{message.body}</div>
            )
        case 1: // Message
        default:
            return (
                <div className='chat'>
                    <img id='avatar' alt='avatar' src={imgSrc} />
                    <div className='message'>{message.body}</div>
                </div>
            )
    }
}

export default Message