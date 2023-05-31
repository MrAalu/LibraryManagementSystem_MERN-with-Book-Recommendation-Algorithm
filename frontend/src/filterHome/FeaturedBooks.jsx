import React, { useState } from 'react'
import CategoryButtons from './CategoryButtons'
import BookList from './BookList'
import { BooksDatabase } from '../myDatabase/Data'
import { Row } from 'react-bootstrap'

const bookCategories = [
  'show all',
  ...new Set(
    BooksDatabase.map((items) => {
      return items.category
    })
  ),
]

const FeaturedBooks = () => {
  const [books, setBooks] = useState(BooksDatabase)

  const [categories, setCategories] = useState(bookCategories)

  const FilterItems = (category) => {
    if (category === 'show all') {
      setBooks(BooksDatabase)
    } else {
      let newArray = BooksDatabase.filter((filter_para) => {
        return filter_para.category === category
      })
      setBooks(newArray)
    }
  }

  return (
    <div className='container'>
      <h1 className='h1 text-center'>Featured Books</h1>

      <Row className='text-center mt-4'>
        <CategoryButtons
          filterFunction={FilterItems}
          categories={categories}
        ></CategoryButtons>
      </Row>

      <Row className='my-3'>
        <BookList books={books}></BookList>
      </Row>
    </div>
  )
}

export default FeaturedBooks
