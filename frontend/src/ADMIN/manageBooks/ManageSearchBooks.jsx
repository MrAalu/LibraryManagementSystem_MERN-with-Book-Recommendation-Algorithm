import axios from 'axios'
import React, { useState } from 'react'
import { backend_server } from '../../main'

const ManageSearchBooks = ({ setAllBooks }) => {
  const API_URL = `${backend_server}/api/v1/filter`

  const empty_field = {
    title: '',
  }

  const [filterFields, setFilterFields] = useState(empty_field)

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const { title } = filterFields

    try {
      const response = await axios.get(API_URL, {
        params: {
          title: title,
        },
      })

      setAllBooks(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFilterFields({ ...filterFields, [name]: value })
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
