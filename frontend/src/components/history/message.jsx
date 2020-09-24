import React, { useState } from 'react'

const Message = (props) => {
    const message = JSON.parse(props.message)
    
    const hashCode = s => Math.abs(s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)) % 25

    const [imgSrc, ] = useState('/img/profile_' + hashCode(message.user) + '.jpg')

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
                    <div className='chatText'>
                        <div className='message'>{message.body}</div>
                        <div className='user'>{message.user}</div>
                    </div>
                </div>
            )
    }
}

export default Message