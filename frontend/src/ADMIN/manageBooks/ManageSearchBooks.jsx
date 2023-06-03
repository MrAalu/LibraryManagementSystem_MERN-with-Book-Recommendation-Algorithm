import axios from 'axios'
import React, { useState } from 'react'
import { backend_server } from '../../main'

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

  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-8'>
          <form
            method='get'
            className='form-inline d-flex justify-content-center'
          >
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
              className='form-control mx-1'
              defaultValue='all'
              onChange={handleCategoryChange}
            >
              <option key='' value=''>
                All Categories
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

            <button
              type='submit'
              className='btn btn-success mx-1 my-1'
              onClick={handleFormSubmit}
            >
              search
            </button>
          </form>
        </div>

        <div className='col mx-1 my-1'>
          <button className='btn btn-primary'>Add new Book</button>
        </div>
      </div>
    </div>
  )
}

export default ManageSearchBooks
