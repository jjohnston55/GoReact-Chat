import React from 'react'

const Message = (props) => {
    const message = JSON.parse(props.message)

    return (
        <div className='message'>{message.body}</div>
    )
}

export default Message