import React from 'react'
import './pagenotfound.css'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
  return (
    <div className='not-found-container'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <br />
      <Link to='/admin'>
        <button className=' btn' id='admin-pagenotfound-btn'>
          Goto Home Page
        </button>
      </Link>
    </div>
  )
}

export default PagenotFound
