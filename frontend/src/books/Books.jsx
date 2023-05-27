import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FilterBooks from './FilterBooks'

import CustomPagination from '../pagination/CustomPagination'

import { bookDataDummy, dummyPopular } from './dummyBookData'

const API_URL = 'http://localhost:5000/api/v1/books/'

const Books = () => {
  const [bookData, setBookData] = useState([])

  const fetchData = async () => {
    try {
      const resp = await axios.get(API_URL)
      const data = resp.data.data
      console.log(data)
      setBookData(data)
    } catch (error) {
      console.log('Error fetching books collections')
    }
  }

  useEffect(() => {
    // fetchData()
  }, [])

  return (
    <div className='container-fluid'>
      {/* FILTER BOOKS SECTION */}
      <div className='row mt-3'>
        <div className='col-md-3'>
          <FilterBooks></FilterBooks>
        </div>

        <div className='col md-9'>
          {/* Popular Books Heading */}
          <h1 className='h1 mt-3' style={{ textAlign: 'center' }}>
            Popular Books
          </h1>

          {/* Popular Books */}
          <div className='row'>
            {dummyPopular.map((book) => {
              const { id, name, img, author } = book
              return (
                <div
                  className='col-xxl-2 col-lg-3 col-md-4 col-sm-4 col-6 gy-3 '
                  key={id}
                >
                  <div className='card h-100'>
                    <div className='card-img-top'>
                      <img
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        className='img-fluid'
                        src={img}
                        alt='book image'
                      />
                    </div>
                    <div className='card-body'>
                      <h5 className='h5 card-title'>{name}</h5>
                      <p className='p card-text'>{author}</p>
                      <div className='form-group mb-2 justify-content-center d-flex'>
                        <button type='button' className='btn btn-primary me-2'>
                          Buy
                        </button>
                        <button
                          type='button'
                          className='btn btn-secondary me-2'
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Books Collections HEADING */}
          <h1 className='h1 mt-3' style={{ textAlign: 'center' }}>
            Browse Collections
          </h1>

          {/* Browse Collections */}
          <div className='row'>
            {bookDataDummy.map((book) => {
              const { id, name, img, author } = book
              return (
                <div
                  className='col-xxl-2 col-lg-3 col-md-4 col-sm-4 col-6 gy-3 '
                  key={id}
                >
                  <div className='card h-100'>
                    <div className='card-img-top'>
                      <img
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        className='img-fluid'
                        src={img}
                        alt='book image'
                      />
                    </div>
                    <div className='card-body'>
                      <h5 className='h5 card-title'>{name}</h5>
                      <p className='p card-text'>{author}</p>
                      <div className='form-group mb-2 justify-content-center d-flex'>
                        <button type='button' className='btn btn-primary me-2'>
                          Buy
                        </button>
                        <button
                          type='button'
                          className='btn btn-secondary me-2'
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          <div className='my-3 d-flex justify-content-center'>
            <CustomPagination></CustomPagination>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books

// BACKEND Fetch data lai map gareko
{
  /* Book Collection */
}
{
  /* <div className='col-md-10'>
  <div className='row'>
    {bookData.map((book) => {
      const { _id, title, image, author } = book
      return (
        <div key={_id} className='col-md-2'>
          <div className='card'>
            <img
              src={image}
              className='card-img-top'
              alt='Book Cover'
            />
            <div className='card-body'>
              <h3 className='card-title'>{title}</h3>
              <p className='card-text'>{author}</p>
              <button className='btn btn-primary'>Reserve</button>
              <button className='btn btn-secondary'>
                View Details
              </button>
            </div>
          </div>
        </div>
      )
    })}
  </div>
</div> */
}
