import React, { useState } from 'react'

const Message = (props) => {
    const message = JSON.parse(props.message)
    const user = JSON.parse(message.user)
    const me = props.me
    
    const hashCode = s => Math.abs(s.split('').reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)) % 24 + 1

    const [imgSrc, ] = useState('/img/profile_' + hashCode(user.id) + '.jpg')

    switch (message.type) {
        case 2: // User Joined
        case 3: // User Disconnected
            return (
                <div className='userStatus'>{message.body}</div>
            )
        case 1: // Message
        default:
            if (user.id == me) {
                return (
                    <div className='chatMe'>
                        <div className='chatTextMe'>
                            <div className='message'>{message.body}</div>
                            <div className='user'>(you)</div>
                        </div>
                        <img id='avatar' alt='avatar' src={imgSrc} />
                    </div>
                )
            } else {
                return (
                    <div className='chat'>
                        <img id='avatar' alt='avatar' src={imgSrc} />
                        <div className='chatText'>
                            <div className='message'>{message.body}</div>
                            <div className='user'>{user.name}</div>
                        </div>
                    </div>
                )
            }
    }
}

export default Message