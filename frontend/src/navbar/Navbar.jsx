import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbar-maindiv'>
      {/* Logo Div Here */}
      <div className='nav-logodiv'>
        <Link to='/'>
          <img src='/book-min.png' alt='' />
        </Link>
        <h1>Library Management System</h1>
      </div>

      {/* Nav Bar items Here */}
      <div className='navbar-items'>
        <Link to='/'>Home</Link>
        <Link to='/'>Books</Link>

        <input type='text' placeholder='Search ...' />

        {/* Profile Drop Down Menu */}
        <div className='dropdown'>
          <button className='profile-btn'>
            <img src='/profileicon-min.png' alt='' />
          </button>

          {/* Drop down ko Contents */}
          <div className='dropdown-content'>
            <Link to='/login'>login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
