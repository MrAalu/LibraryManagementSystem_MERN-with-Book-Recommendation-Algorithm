import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CustomPagination from '../pagination/CustomPagination'
import SmallBanner from '../bannerHome/SmallBanner'
import PopularBooks from './PopularBooks'
import { backend_server } from '../../main'
import BrowseCollectionBooks from './BrowseCollectionBooks'
import { Toaster } from 'react-hot-toast'
import FilterBooksForm from './FilterBooksForm'

const Books = () => {
  const API_URL = `${backend_server}/api/v1/book/`

  const [bookData, setBookData] = useState([])

  // If 0 results then display false , true = results found , false = 0 search results
  const [searchResult, setSearchResult] = useState(true)

  // if filterForm is active , disbale pagination else allow paginations
  const [filterActive, setFilterActive] = useState(false)

  const fetchData = async (pageNumber) => {
    try {
      const resp = await axios.get(`${API_URL}/?page=${pageNumber}`)
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
          <FilterBooksForm
            setBookData={setBookData}
            setSearchResult={setSearchResult}
            setFilterActive={setFilterActive}
          ></FilterBooksForm>
        </div>

        {/* BROWSE COLLECTIONS BOOKS */}
        <BrowseCollectionBooks
          bookData={bookData}
          searchResult={searchResult}
        ></BrowseCollectionBooks>

        {/* Pagination */}
        <div className='my-3 d-flex justify-content-center'>
          <CustomPagination
            fetchData={fetchData}
            filterActive={filterActive}
          ></CustomPagination>
        </div>
      </div>
    </div>
  )
}

export default Books
