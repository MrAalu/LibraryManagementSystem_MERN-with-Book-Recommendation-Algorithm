import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FilterBooks from './FilterBooks'

import CustomPagination from '../pagination/CustomPagination'

import { bookDataDummy, dummyPopular } from '../myDatabase/dummyBookData'
import SmallBanner from '../bannerHome/SmallBanner'

import { backend_server } from '../../main'

const Books = () => {
  const API_URL = `${backend_server}/api/v1/book/`

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
    fetchData()
  }, [])

  return (
    <div className='container'>
      {/* Popular Books Heading */}
      <div className='row'>
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
                    />{' '}
                  </div>
                  <div className='card-body'>
                    <h5 className='h5 card-title'>{name}</h5>
                    <p className='p card-text'>{author}</p>
                    <div className='form-group mb-2 justify-content-center d-flex'>
                      <button type='button' className='btn btn-primary me-2'>
                        Buy
                      </button>
                      <button type='button' className='btn btn-secondary me-2'>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Into the Wild Banner */}
      <SmallBanner></SmallBanner>

      <div className='col mt-5 '>
        {/* Browse Collections HEADING */}
        <h1 className='h1' style={{ textAlign: 'center' }}>
          Browse Collections
        </h1>
        <div className='mt-1'>
          {/* FILTER BOOKS SECTION */}
          <FilterBooks></FilterBooks>
        </div>

        {/* Browse Collections */}
        <div className='row mt-3'>
          {bookData.map((book) => {
            const { _id, title, image, author } = book
            const imgSrc = `${backend_server}/${image}`

            return (
              <div
                className='col-xxl-2 col-lg-3 col-md-4 col-sm-4 col-6 gy-3 '
                key={_id}
              >
                <div className='card h-100'>
                  <div className='card-img-top'>
                    <img
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      className='img-fluid'
                      src={imgSrc}
                      alt='book image'
                    />
                  </div>
                  <div className='card-body'>
                    <h5 className='h5 card-title'>{title}</h5>
                    <p className='p card-text'>{author}</p>
                    <div className='form-group mb-2 justify-content-center d-flex'>
                      <button type='button' className='btn btn-primary me-2'>
                        Buy
                      </button>
                      <button type='button' className='btn btn-secondary me-2'>
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
  )
}

export default Books
