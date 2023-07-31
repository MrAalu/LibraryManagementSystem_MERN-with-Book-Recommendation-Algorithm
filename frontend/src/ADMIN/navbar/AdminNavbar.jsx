import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

// Importing all Navbar data's i.e. title,logo,links,etc
import navbarData from './adminnavbardata'

const AdminNavbar = () => {
  const { navbarLinks, navbarTitle, navbarImage } = navbarData

  return (
    <nav className='navbar admin-navbar navbar-expand-xl '>
      <div className='container-fluid'>
        <Link to='/admin' className='a'>
          <img
            src={navbarImage}
            alt='Logo'
            width={'50'}
            className='d-sm-inline-block d-none'
          />
          <h4 className='h4 d-inline ' id='navbar-title-text'>
            {navbarTitle}
          </h4>
        </Link>

        <button
          id='navbar-mobileview-btn'
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav  mb-2 mb-lg-0 fs-5'>
            {navbarLinks.map((link, index) => {
              const { name, url } = link
              return (
                <li className='nav-item' key={index}>
                  <Link to={url} className='nav-link'>
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminNavbar
