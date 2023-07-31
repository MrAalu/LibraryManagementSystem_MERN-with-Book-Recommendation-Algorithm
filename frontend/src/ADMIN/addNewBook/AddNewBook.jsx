import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { backend_server } from '../../main'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddNewBook = () => {
  const API_URL = `${backend_server}/api/v1/books`

  const navigate = useNavigate()

  const empty_inputfield = {
    title: '',
    author: '',
    description: 'some random description about book',
    category: '',
    available: true,
    featured: false,
    language: 'ENGLISH',
  }

  const [selectedImage, setSelectedImage] = useState(null)
  const [inputvalue, setInputValue] = useState(empty_inputfield)

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputvalue, [name]: value })
  }

  const handleCategoryOnChange = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputvalue, [name]: value.toUpperCase() })
  }
  const handleLanguageOnChange = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputvalue, [name]: value.toUpperCase() })
  }

  const handleOnChangeSelectOptions = (e) => {
    const { name, value } = e.target
    setInputValue({ ...inputvalue, [name]: value === 'true' ? true : false })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log(inputvalue)

    const formData = new FormData()
    formData.append('image', selectedImage)
    formData.append('title', inputvalue.title)
    formData.append('author', inputvalue.author)
    formData.append('description', inputvalue.description)
    formData.append('category', inputvalue.category)
    formData.append('available', inputvalue.available)
    formData.append('featured', inputvalue.featured)
    formData.append('language', inputvalue.language)

    try {
      await axios.post(API_URL, formData)
      toast.success('new Book Created Successfully')

      setInputValue(empty_inputfield)
    } catch (error) {
      console.error('Error creating new Book : ', error.response)
      toast.error('Error creating new Book')
    }
  }

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Add New Book</h1>

      <Container className='my-5'>
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                onChange={handleOnChange}
                value={inputvalue.title}
                placeholder='Title'
                name='title'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                onChange={handleOnChange}
                value={inputvalue.author}
                placeholder='Author'
                name='author'
                autoComplete='off'
                required
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                onChange={handleOnChange}
                value={inputvalue.description}
                placeholder='Description'
                name='description'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                onChange={handleCategoryOnChange}
                value={inputvalue.category}
                placeholder='Category'
                name='category'
                autoComplete='off'
                required
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Language</Form.Label>
              <Form.Control
                type='text'
                onChange={handleLanguageOnChange}
                value={inputvalue.language}
                placeholder='Language'
                name='language'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className='d-flex'
              style={{ alignItems: 'center' }}
            >
              <div className='me-3 '>
                <Form.Label>Available</Form.Label>
                <Form.Select
                  style={{ width: 'fit-content' }}
                  onChange={handleOnChangeSelectOptions}
                  value={inputvalue.available.toString()}
                  name='available'
                  required
                >
                  <option value='true'>TRUE</option>
                  <option value='false'>FALSE</option>
                </Form.Select>
              </div>

              <div className='mx-3'>
                <Form.Label>Featured</Form.Label>
                <Form.Select
                  style={{ width: 'fit-content' }}
                  onChange={handleOnChangeSelectOptions}
                  value={inputvalue.featured.toString()}
                  name='featured'
                  required
                >
                  <option value='true'>TRUE</option>
                  <option value='false'>FALSE</option>
                </Form.Select>
              </div>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                style={{ width: 'fit-content' }}
                type='file'
                onChange={handleImageChange}
                accept='image/*'
                required
              />
            </Form.Group>
          </Row>

          <div className='text-center mt-5'>
            <Button type='submit' variant='success'>
              Submit
            </Button>

            <button
              type='button'
              className='btn btn-secondary mx-1'
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </Form>
      </Container>
      <Toaster />
    </div>
  )
}

export default AddNewBook
