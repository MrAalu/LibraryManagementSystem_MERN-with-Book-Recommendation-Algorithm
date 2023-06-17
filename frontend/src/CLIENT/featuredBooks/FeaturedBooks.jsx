import React, { useEffect, useState } from 'react'
import CategoryButtons from './CategoryButtons'
import BookList from './BookList'
import { Row } from 'react-bootstrap'
import axios from 'axios'
import { backend_server } from '../../main'

const FeaturedBooks = () => {
  const featuredBooks_API_URL = `${backend_server}/api/v1/featuredBooks`

  // All Featured books
  const [allFeaturedBooks, setAllFeaturedBooks] = useState([])

  // All featured books categories types
  const [bookCategories, setBookCategories] = useState([])

  // Books to be displayed based on CATEGORIES
  const [books, setBooks] = useState(allFeaturedBooks)

  const fetchFeaturedBooks = async () => {
    try {
      const response = await axios.get(featuredBooks_API_URL)

      const books_data = await response.data.data

      // mapping fetched books data and extracting unique CATEGORY names
      const allCategories = [
        'SHOW ALL',
        ...new Set(
          books_data.map((items) => {
            return items.category
          })
        ),
      ]

      setBookCategories(allCategories)
      setAllFeaturedBooks(books_data)
      setBooks(books_data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchFeaturedBooks()
  }, [])

  const FilterItems = (category) => {
    if (category === 'SHOW ALL') {
      setBooks(allFeaturedBooks)
    } else {
      let newArray = allFeaturedBooks.filter((filter_para) => {
        return filter_para.category === category
      })
      setBooks(newArray)
    }
  }

  return (
    <div className='container'>
      <h1 className='h1 text-center'>Featured Books</h1>

      {allFeaturedBooks.length > 0 ? (
        <div>
          <Row className='text-center mt-4'>
            <CategoryButtons
              filterFunction={FilterItems}
              categories={bookCategories}
            ></CategoryButtons>
          </Row>
          <Row className='my-3'>
            <BookList books={books}></BookList>
          </Row>{' '}
        </div>
      ) : (
        <p className='p text-center'>Loading ...</p>
      )}
    </div>
  )
}

export default FeaturedBooks
