import React from 'react'

const FilterBooks = () => {
  return (
    <div>
      <h2 className='fitler text-center'>Filter</h2>

      <form className='book-filter-form'>
        {/* Search by Title Filter */}
        <div className='form-group mb-2'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by title . . .'
          />
        </div>

        {/* Category Filter */}
        <div className='form-group mb-2'>
          <select className='form-control' defaultValue='all'>
            <option value='all' disabled hidden>
              Categories
            </option>
            <option value='all'>All Categories</option>
            <option value='fiction'>Fiction</option>
            <option value='non-fiction'>Non-Fiction</option>
            <option value='mystery'>Mystery</option>
          </select>
        </div>

        {/* Language Filter */}
        <div className='form-group mb-2'>
          <select className='form-control' defaultValue='all'>
            <option value='all' disabled hidden>
              Language
            </option>
            <option value='all'>All</option>
            <option value='english'>English</option>
            <option value='nepali'>Nepali</option>
          </select>
        </div>

        {/* Author Filter */}
        <div className='form-group mb-2'>
          <select className='form-control' defaultValue='all'>
            <option value='all' disabled hidden>
              Author
            </option>
            <option value='all'>Any</option>
            <option value='english'>English</option>
            <option value='nepali'>Nepali</option>
          </select>
        </div>

        {/* Available Filter (stock/outofStock) */}
        <div className='form-group mb-2'>
          <div className='form-check'>
            <label htmlFor='showAvailable' className='form-check-label'>
              Show Available
            </label>
            <input
              type='checkbox'
              className='form-check-input'
              id='showAvailable'
              defaultChecked
            />
          </div>
        </div>

        {/* Apply / Clear FILTER properties */}
        <div className='form-group mb-2 justify-content-center d-flex'>
          <button type='button' className='btn btn-success me-2'>
            Apply Filters
          </button>
          <button type='button' className='btn btn-danger me-2'>
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  )
}

export default FilterBooks
