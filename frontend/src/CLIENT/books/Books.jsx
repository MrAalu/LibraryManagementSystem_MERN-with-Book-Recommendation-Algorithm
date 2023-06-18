import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FilterBooks from './FilterBooks'
import { Link } from 'react-router-dom'

import CustomPagination from '../pagination/CustomPagination'

import SmallBanner from '../bannerHome/SmallBanner'
import PopularBooks from './PopularBooks'

import { backend_server } from '../../main'
import BrowseCollectionBooks from './BrowseCollectionBooks'
import { Toaster } from 'react-hot-toast'

const Books = () => {
  const API_URL = `${backend_server}/api/v1/book/`

  const [bookData, setBookData] = useState([])

  const fetchData = async () => {
    try {
      const resp = await axios.get(API_URL)
      const data = resp.data.data
      // console.log(data)
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
      <Toaster />
      {/* Popular Books Heading */}
      <div className='row'>
        <h1 className='h1 mt-3' style={{ textAlign: 'center' }}>
          Popular Books
        </h1>

        {/* Popular Books */}
        <PopularBooks></PopularBooks>
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
          <FilterBooks
            setBookData={setBookData}
            bookData={bookData}
          ></FilterBooks>
        </div>

        {/* BROWSE COLLECTIONS BOOKS */}
        <BrowseCollectionBooks bookData={bookData}></BrowseCollectionBooks>

        {/* Pagination */}
        <div className='my-3 d-flex justify-content-center'>
          <CustomPagination></CustomPagination>
        </div>
      </div>
    </div>
  )
}

export default Books
