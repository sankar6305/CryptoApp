import React from 'react'

const Header = () => {
  return (
    <header className='HeaderTable'>
      <h1 className="p-2 flex-grow-1"><a href='/'>CRYPTOMANIA</a></h1>

      <ul className='Links'>
        <li className="p-2 flex-grow-1"><a href="/trading">Trade Here</a></li>
        <li className="p-2"><a href="/signin">Sign In</a></li>
        <li className="p-2"><a href="/signup">Sign Up</a></li>
      </ul>
    </header>
  )
}

export default Header
