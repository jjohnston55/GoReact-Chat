import React from 'react'
import './index.css'

const Header = () => {
	return (
		<div className='header'>			
			<h1>GoReact Chatroom</h1>
			<img id='golang' src='./img/gopher.png' alt='gopher.png' title='Golang Gopher' />
			<img id='react' src='./img/react.png' alt='react.png' />
		</div>
	)
}

export default Header