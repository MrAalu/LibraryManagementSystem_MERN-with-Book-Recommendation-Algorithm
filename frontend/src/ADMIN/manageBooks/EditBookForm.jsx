import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

// Are you sure you want to delete confirm prompt
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { backend_server } from '../../main'
import { Col, Row } from 'react-bootstrap'
function EditBookForm() {
  const API_URL = `${backend_server}/api/v1/books`

  const { id } = useParams()
  const [bookData, setBookData] = useState({
    title: '',
    category: '',
    author: '',
    available: false,
    featured: false,
    description: '',
    language: '',
  })

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`)

      setBookData(response.data.data)
      // console.log(bookData)
    } catch (error) {
      console.log('ERROR FETCHING BOOK data using _id')
    }
  }

  useEffect(() => {
    fetchBookData()
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log(bookData)
  }

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setBookData({ ...bookData, [name]: value })
    setBookData((prevData) => ({
      ...prevData,
      [name]: name === 'category' ? value.toUpperCase() : value,
    }))
  }

  const handleCancelButton = () => {
    window.location.href = '/admin-managebooks'
  }
  const handleUpdateButton = async () => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, bookData)
      toast.success('Update Success')
      console.log(response)
    } catch (error) {
      console.log(error.response)
      toast.error('error updating book')
    }
  }

  const showConfirmation = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: handleDeleteButton,
        },
        {
          label: 'No',
          onClick: () => console.log('Cancelled!'),
        },
      ],
    })
  }

  const handleDeleteButton = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      toast.promise(new Promise((resolve) => setTimeout(resolve, 100)), {
        loading: 'Deleting ...',
        success: <b>Delete Success</b>,
        error: <b>Delete Failed</b>,
      })

      setTimeout(() => {
        window.location.href = '/admin-managebooks'
      }, 1000)
    } catch (error) {
      console.log(error.response)
      toast.error('error deleting book')
    }
  }

  return (
    <div className='container'>
      <h1 className='h1 text-center'>Edit Book</h1>

      <form className='form my-3' onSubmit={handleSubmit}>
        <Col className='d-flex align-items-center'>
          <label htmlFor='title' className='col-md-1 my-1 me-2'>
            Title
          </label>
          <input
            id='title'
            type='text'
            className='form-control my-1'
            value={bookData.title}
            onChange={handleOnChange}
            name='title'
          />
        </Col>

        <Col className='d-flex align-items-center'>
          <label htmlFor='category' className='col-md-1 my-1 me-2'>
            Category
          </label>
          <input
            type='text'
            className='form-control my-1'
            value={bookData.category}
            onChange={handleOnChange}
            name='category'
          />
        </Col>

        <Col className='d-flex align-items-center'>
          <label htmlFor='author' className='col-md-1 my-1 me-2'>
            Author
          </label>
          <input
            type='text'
            className='form-control my-1'
            value={bookData.author}
            onChange={handleOnChange}
            name='author'
          />
        </Col>

        <Col className='d-flex align-items-center'>
          <label htmlFor='available' className='my-1 me-2'>
            Available
          </label>
          <input
            className='form-check-input'
            id='available'
            type='checkbox'
            checked={bookData.available}
            onChange={() =>
              setBookData({ ...bookData, available: !bookData.available })
            }
          />

          <label htmlFor='featured' className='my-1 me-2 ms-4'>
            Featured
          </label>

          <input
            className='form-check-input'
            id='featured'
            type='checkbox'
            checked={bookData.featured}
            onChange={() =>
              setBookData({ ...bookData, featured: !bookData.featured })
            }
          />
        </Col>

        <Col className='d-flex align-items-center'>
          <label htmlFor='language' className='col-md-1 my-1 me-2'>
            Language
          </label>
          <input
            type='text'
            className='form-control my-1'
            value={bookData.language}
            onChange={handleOnChange}
            name='language'
          />
        </Col>

        <Col className='d-flex align-items-center'>
          <label htmlFor='description' className='col-md-1 my-1 me-2'>
            Description
          </label>
          <textarea
            name='description'
            cols='20'
            rows='5'
            className='form-control my-1'
            value={bookData.description}
            onChange={handleOnChange}
          ></textarea>
        </Col>

        <div
          className='col mt-3'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <button
            className='btn btn-secondary mx-3'
            onClick={handleCancelButton}
          >
            Back
          </button>
          <button
            type='submit'
            className='btn btn-success mx-3'
            onClick={handleUpdateButton}
          >
            Update
          </button>
          <button className='btn btn-danger mx-3' onClick={showConfirmation}>
            Delete
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  )
}

export default EditBookForm
