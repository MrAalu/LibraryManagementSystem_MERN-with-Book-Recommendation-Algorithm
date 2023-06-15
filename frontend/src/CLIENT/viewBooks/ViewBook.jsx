import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { backend_server } from '../../main'
import './viewBooks.css'

import useFetch from '../../useFetch'

const ViewBook = () => {
  const bookId = useParams()
  const API_URL = `${backend_server}/api/v1/books/${bookId.id}`

  const getData = useFetch(API_URL)

  // Destructuring fetched data
  const data = getData.fetched_data.data

  const [bookData, setBookData] = useState({})

  useEffect(() => {
    setBookData({ ...data })
  }, [data])

  return (
    <div className='container'>
      <h1 className='h1 text-center my-4'>Book Details</h1>

      <div className='row mt-1 mb-3 shadow'>
        <div className='col-lg-6 col-sm-12 mx-5 my-2  image-div'>
          <img
            src={`${backend_server}/${bookData.image}`}
            alt=''
            style={{ height: '100%', width: '250px' }}
            className='img-fluid'
          />
        </div>

        <div className='col mx-5 my-5 '>
          <h2>{bookData.title} </h2>
          <p>by '{bookData.author}' </p>
          <h5 className='h5'>Category : {bookData.category} </h5>
          <h5>Language : {bookData.language} </h5>
          <h5 className='h5 my-1 mt-3 '>Sypnosis :</h5>
          <h6 className='h6  my-2'> {bookData.description}</h6>

          {/* Request Books Button */}
          <div className='text-center'>
            <button type='button' className='btn btn-primary me-2 mt-3'>
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewBook
