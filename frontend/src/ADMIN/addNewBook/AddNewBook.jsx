import React, { useState } from 'react'
import axios from 'axios'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import { backend_server } from '../../main'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const AddNewBook = () => {
  const API_URL = `${backend_server}/api/v1/books`

  const empty_inputfield = {
    title: '',
    author: '',
    description: 'some random description about book',
    category: '',
    available: true,
    featured: false,
    language: 'english',
  }

  const [selectedImage, setSelectedImage] = useState(null)
  const [inputvalue, setInputValue] = useState(empty_inputfield)

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0])
  }

  const handleOnChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInputValue({ ...inputvalue, [name]: value })
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
      console.log('new Book Created Successfully')
      // setInputValue(empty_inputfield)
    } catch (error) {
      console.error('Error creating new Book : ', error.response)
      toast.error('Error creating new Book')
    }
  }

  return (
    <div className='container'>
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
                onChange={handleOnChange}
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
                onChange={handleOnChange}
                value={inputvalue.language}
                placeholder='Language'
                name='language'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Available</Form.Label>
              <Form.Control
                type='text'
                onChange={handleOnChange}
                value={inputvalue.available}
                placeholder='Available'
                name='available'
                autoComplete='off'
                required
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col}>
              <Form.Label>Featured</Form.Label>
              <Form.Control
                type='text'
                onChange={handleOnChange}
                value={inputvalue.featured}
                placeholder='Featured'
                name='featured'
                autoComplete='off'
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='file'
                onChange={handleImageChange}
                accept='image/*'
                required
              />
            </Form.Group>
          </Row>
          <Button type='submit' variant='success'>
            Submit
          </Button>
          <Link to='/admin-managebooks'>
            <button type='button' className='btn btn-secondary mx-1'>
              Back
            </button>
          </Link>
        </Form>
      </Container>
      <Toaster />
    </div>
  )
}

export default AddNewBook
