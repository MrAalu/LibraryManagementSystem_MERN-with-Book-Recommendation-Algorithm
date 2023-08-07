import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { backend_server } from '../../main'
import './viewBooks.css'
import useFetch from '../../useFetch'
import RequestBook from '../requestBooks/RequestBook'
import SimilarBooks from './SimilarBooks'

const ViewBook = () => {
  const { id } = useParams() //fetching book id from url params
  const API_URL = `${backend_server}/api/v1/books/${id}`

  const { request_Book } = RequestBook()
  const navigate = useNavigate()

  const getData = useFetch(API_URL)

  // Destructuring fetched data
  const data = getData.fetched_data.data
  const imageFullPath = getData.imagePath

  const [bookData, setBookData] = useState({})

  useEffect(() => {
    setBookData({ ...data, image: imageFullPath })
    window.scrollTo(0, 0)
  }, [data])

  return (
    <div className='container'>
      <h1 className='h1 text-center my-4'>Book Details</h1>

      <div className='row mt-1 mb-3 shadow'>
        <div className='col-lg-6 col-sm-12 mx-5 my-2  image-div'>
          <img
            src={bookData.image}
            alt=''
            style={{ height: '90%', width: '300px' }}
            className='img-fluid'
          />
        </div>

        <div className='col mx-5 my-5 '>
          <h2>{bookData.title} </h2>
          <p>by '{bookData.author}' </p>
          <h5 className='h5'>Category : {bookData.category} </h5>
          <h5>Language : {bookData.language} </h5>
          <h5>
            Available :
            {bookData.available ? (
              <span> In Stock</span>
            ) : (
              <span> Out of Stock</span>
            )}{' '}
          </h5>

          <h5 className='h5 my-1 mt-3 '>Sypnosis :</h5>
          <h6 className='h6  my-2'> {bookData.description}</h6>

          {/* Request Books Button */}
          <div className='text-center'>
            {bookData.available ? (
              <button
                type='button'
                className='btn btn-primary me-2 mt-3'
                onClick={() => request_Book(bookData._id)}
              >
                Request
              </button>
            ) : (
              <button
                disabled
                type='button'
                className='btn btn-primary me-2 mt-3'
              >
                Out of Stock
              </button>
            )}

            <button
              type='button'
              className='btn btn-secondary me-2 mt-3'
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <SimilarBooks />
    </div>
  )
}

export default ViewBook
