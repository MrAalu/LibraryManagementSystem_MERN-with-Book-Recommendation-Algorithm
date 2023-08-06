import React, { useState } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { FiCopy } from 'react-icons/fi'
import { toast, Toaster } from 'react-hot-toast'
import './issuebooktouser.css'

const IssueBookToUser = () => {
  const API_URL = `${backend_server}/api/v1/filter`
  const IssueBOOK_URL = `${backend_server}/api/v1/requestBooks/issuebook`

  const empty_field = {
    title: '',
  }

  const [filterFields, setFilterFields] = useState(empty_field)
  const [allBooks, setAllBooks] = useState([])

  const handleOnChange = async (e) => {
    const { name, value } = e.target
    setFilterFields({ ...filterFields, [name]: value })

    const { title } = filterFields
    try {
      const response = await axios.get(API_URL, {
        params: {
          title,
        },
      })

      setAllBooks(response.data.data)
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  const handleSearchFormSubmit = async (e) => {
    e.preventDefault()

    // if empty field then dont search anything , (else all 40books will be fetched)
    if (JSON.stringify(filterFields) !== JSON.stringify(empty_field)) {
      const { title } = filterFields
      try {
        const response = await axios.get(API_URL, {
          params: {
            title,
          },
        })

        setAllBooks(response.data.data)
      } catch (error) {
        console.log(error)
        console.log(error.response)
      }
    }
  }

  // COPY to CLIPBOARD Function
  const handleCopyId = (_id) => {
    navigator.clipboard
      .writeText(_id)
      .then(() => {
        toast('Book ID Copied to Clipboard', {
          icon: 'ℹ️',
        })
      })
      .catch((error) => {
        console.error('Copy failed:', error)
      })
  }

  // 2nd Form (Form to issue user a BOOK)
  const [bookId, setBookId] = useState('')
  const [email, setEmail] = useState('')

  const handleBookIssueFormSubmit = async (e) => {
    try {
      e.preventDefault()

      await axios.post(IssueBOOK_URL, {
        bookId,
        userEmail: email,
      })
      toast.success('Book Issue Success')
      // Reset form fields
      setBookId('')
      setEmail('')
    } catch (error) {
      const x = error.response.data.message

      // Check is object is empty , BookID find garena vane empty object hunxa 'x'
      const isEmpty = Object.keys(x).length === 0
      if (!isEmpty) {
        toast.error(x)
      }
      if (isEmpty) {
        toast.error('Invalid BOOK ID')
      }
    }
  }

  return (
    <div className='container'>
      <h1 className='h1 text-center my-3'>Issue a Book to User</h1>

      <div className='row'>
        {/* BOOK SEARCH FORM */}
        <p>Search Book</p>
        <div className='col-md-7'>
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
              required
              value={filterFields.title}
              onChange={handleOnChange}
            />

            <button
              type='submit'
              className='btn btn-success mx-1 my-1'
              onClick={handleSearchFormSubmit}
            >
              search
            </button>
          </form>

          {allBooks.length > 0 ? (
            <div className='row'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Book ID</th>
                    <th scope='col'>Title</th>
                  </tr>
                </thead>

                <tbody>
                  {allBooks.map((book, index) => {
                    const { title, _id } = book
                    return (
                      <tr key={_id}>
                        <th scope='row'>{index + 1}</th>
                        <td
                          onClick={() => handleCopyId(_id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className='d-flex align-items-center'>
                            {_id}
                            <FiCopy style={{ margin: '0px 10px' }} />
                          </span>
                        </td>
                        <td>{title}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='p my-3'>No books to display</p>
          )}
        </div>

        {/* ISSUE BOOK FORM */}
        <div className='col shadow mx-2 issue-book-form'>
          <form onSubmit={handleBookIssueFormSubmit}>
            <div className='mb-3 mt-3'>
              <label htmlFor='bookId' className='form-label'>
                Book ID
              </label>
              <input
                type='text'
                className='form-control'
                id='bookId'
                autoComplete='off'
                placeholder='Enter Book ID'
                value={bookId}
                required
                onChange={(e) => setBookId(e.target.value)}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                User's Email
              </label>
              <input
                type='email'
                required
                autoComplete='off'
                className='form-control'
                id='email'
                placeholder='Enter Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='text-center my-3'>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IssueBookToUser
