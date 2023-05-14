import React from 'react'
import './navbar.css'
const Navbar = () => {
  return (
    <div className='navbar-maindiv'>
      {/* Logo Div Here */}
      <div className='nav-logodiv'>
        <a href=''>
          <img src='/book-min.png' alt='' />
        </a>
        <h1>Library Management System</h1>
      </div>

      {/* Nav Bar items Here */}
      <div className='navbar-items'>
        <a href=''>Home</a>
        <a href='#'>Books</a>
        <input type='text' placeholder='Search ...' />

        {/* Profile Drop Down Menu */}
        <div className='dropdown'>
          <button className='profile-btn'>
            <img src='/profileicon-min.png' alt='' />
          </button>

          {/* Drop down ko Contents */}
          <div className='dropdown-content'>
            <a href='#'>Login</a>
            <a href='#'>Signup</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
