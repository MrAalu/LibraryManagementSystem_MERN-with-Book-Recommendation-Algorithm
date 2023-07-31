import React from 'react'
import { Link } from 'react-router-dom'
import { sidebarData } from './sidebarData'
import './sidebar.css'

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <ul className='nav flex-column'>
        {sidebarData.map((panelItem) => (
          <li className='nav-item sidebar-nav-item' key={panelItem.id}>
            <Link to={panelItem.url} className='nav-link sidebar-nav-link'>
              {panelItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Sidebar
