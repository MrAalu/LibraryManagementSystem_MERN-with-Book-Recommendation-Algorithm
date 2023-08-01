import axios from 'axios'
import React, { useState } from 'react'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ManageSearchBooks = ({ setAllBooks, bookCategories }) => {
  const API_URL = `${backend_server}/api/v1/filter`

  const empty_field = {
    title: '',
    category: '',
    featured: '',
    available: '',
  }

  const [filterFields, setFilterFields] = useState(empty_field)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (JSON.stringify(filterFields) == JSON.stringify(empty_field)) {
      return false
    }

    const { title, category, featured, available } = filterFields
    try {
      const response = await axios.get(API_URL, {
        params: {
          title,
          category,
          featured,
          available,
        },
      })

      setAllBooks(response.data.data)
      // console.log(filterFields)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFilterFields({ ...filterFields, [name]: value })
  }

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value
    setFilterFields({ ...filterFields, category: selectedCategory })
  }
  const handleFeaturedChange = (e) => {
    const selectedFeatured = e.target.value
    setFilterFields({ ...filterFields, featured: selectedFeatured })
  }
  const handleAvailableChange = (e) => {
    const selectedAvailable = e.target.value
    setFilterFields({ ...filterFields, available: selectedAvailable })
  }

  // TODO : Handle Clear Form Filter
  const handleClearFilters = () => {
    setFilterFields(empty_field)

    // Reset the "Category" select dropdown to the default placeholder option
    const categorySelect = document.getElementById('categorySelect')
    if (categorySelect) {
      categorySelect.selectedIndex = 0
    }

    // Reset the "Featured" select dropdown to the default placeholder option
    const featuredSelect = document.getElementById('featuredSelect')
    if (featuredSelect) {
      featuredSelect.selectedIndex = 0
    }

    // Reset the "Available" select dropdown to the default placeholder option
    const availableSelect = document.getElementById('availableSelect')
    if (availableSelect) {
      availableSelect.selectedIndex = 0
    }
  }

  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-10'>
          <form
            method='get'
            className='form-inline d-flex justify-content-center'
          >
            {/* Search Filter */}
            <input
              type='text'
              className='form-control mx-1'
              autoComplete='off'
              placeholder='Search by title . . .'
              name='title'
              value={filterFields.title}
              onChange={handleOnChange}
            />

            {/* Category Filter */}
            <select
              id='categorySelect'
              className='form-control mx-1'
              defaultValue=''
              onChange={handleCategoryChange}
            >
              <option key='' value=''>
                Categories
              </option>
              {bookCategories.map((books_category) => {
                return (
                  <option key={books_category} value={books_category}>
                    {books_category}
                  </option>
                )
              })}
            </select>

            {/* Featured Filter */}
            <select
              id='featuredSelect'
              className='form-control mx-1'
              defaultValue='all'
              onChange={handleFeaturedChange}
            >
              <option key='' value=''>
                Featured
              </option>
              <option key='true' value='true'>
                Yes-Featured
              </option>
              <option key='false' value='false'>
                Not-Featured
              </option>
            </select>

            {/* Available Filter */}
            <select
              id='availableSelect'
              className='form-control mx-1'
              defaultValue='all'
              onChange={handleAvailableChange}
            >
              <option key='' value=''>
                Available
              </option>
              <option key='true' value='true'>
                Yes-Available
              </option>
              <option key='false' value='false'>
                Not-Available
              </option>
            </select>

            <div
              className='col-xl-2 text-center d-flex '
              style={{ width: 'fit-content' }}
            >
              <button
                type='submit'
                className='btn btn-success mx-1 my-1'
                onClick={handleFormSubmit}
              >
                Search
              </button>

              {/* Clear FORM Filter BTN */}
              <button
                type='button'
                className='btn btn-danger mx-1 my-1'
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Add new BOOK */}
        {/* <div className='col mx-1 my-1'>
          <Link to='/admin/managebooks/addnewbook'>
            <button className='btn btn-primary' type='button'>
              Add new Book
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default ManageSearchBooks
