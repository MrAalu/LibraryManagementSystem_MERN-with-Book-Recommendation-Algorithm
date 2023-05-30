import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <h5>Info</h5>
            <ul className='list-unstyled'>
              <li>Email: info@library.com</li>
              <li>Phone: +977-9801234568</li>
              <li>Address: Kathmandu,Nepal</li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5>Links</h5>
            <ul className='list-unstyled'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/books'>Books</Link>
              </li>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h5>Legal</h5>
            <ul className='list-unstyled'>
              <li>
                <Link to='/about'>Privacy Policy</Link>
              </li>
              <li>
                <Link to='/about'>Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
