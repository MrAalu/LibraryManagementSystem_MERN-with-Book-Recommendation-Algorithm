import React from 'react'

const NavbarSearch = () => {
  return (
    <form className='d-flex' role='search'>
      <input
        className='form-control me-2'
        type='search'
        placeholder='e.g. java book . . .'
        aria-label='Search'
      />
      <button className='btn' type='submit' id='navbar-search-btn'>
        Search
      </button>
    </form>
  )
}

export default NavbarSearch
