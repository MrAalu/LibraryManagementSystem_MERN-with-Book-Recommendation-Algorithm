import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { backend_server } from '../../main'
import FilterBooksForm from './FilterBooksForm'

const FilterBooks = ({ setBookData, bookData }) => {
  const API_FILTER_URL = `${backend_server}/api/v1/filter`
  const API_ALLBOOKS_URL = `${backend_server}/api/v1/books`

  const [allBooks, setAllBooks] = useState([])
  const [categories, setCategories] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_ALLBOOKS_URL)

      const bookCategories = [
        ...new Set(
          response.data.data.map((items) => {
            return items.category
          })
        ),
      ]
      setCategories(bookCategories)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className='container '>
      <div className='row my-3'>
        {/* Filter gareko books lai set Gareko */}
        <FilterBooksForm
          setAllBooks={setAllBooks}
          bookCategories={categories}
        />
      </div>
    </div>
  )
}

export default FilterBooks
