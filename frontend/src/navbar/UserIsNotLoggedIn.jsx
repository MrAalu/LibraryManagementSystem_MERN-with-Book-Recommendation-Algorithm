import React from 'react'
import { Link } from 'react-router-dom'
import navbarData from './navbardata'
import './navbar.css'

const UserIsNotLoggedIn = () => {
  const { navbarLinksNotAuthenticated } = navbarData
  return (
    <div id='nav-conditional-rendering'>
      {navbarLinksNotAuthenticated.map((map_para, index) => {
        const { name, url } = map_para
        return (
          <li className='nav-item' key={index}>
            <Link to={url} className='nav-link'>
              {name}
            </Link>
          </li>
        )
      })}
    </div>
  )
}

export default UserIsNotLoggedIn
