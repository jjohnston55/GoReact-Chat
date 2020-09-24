import React from 'react'
import './index.css'

const Header = () => {
	return (
		<div className='header'>			
			<h1>GoReact Chatroom</h1>
			<a href='https://golang.org/' target="_blank" rel="noopener noreferrer">
				<img id='golang' src='./img/gopher.png' alt='gopher.png' />
			</a>
			<a href='https://reactjs.org/' target="_blank" rel="noopener noreferrer">
				<img id='react' src='./img/react.png' alt='react.png' />
			</a>
		</div>
	)
}

export default Header