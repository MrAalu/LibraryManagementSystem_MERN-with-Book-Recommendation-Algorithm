import React, { useState } from 'react'
import CategoryButtons from './CategoryButtons'
import BookList from './BookList'
import './menu.css'
import { BooksDatabase } from '../myDatabase/Data'

const bookCategories = [
  'show all',
  ...new Set(
    BooksDatabase.map((items) => {
      return items.category
    })
  ),
]

const Menu = () => {
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
    <div className='menu'>
      <h1>MENU</h1>

      <CategoryButtons
        filterFunction={FilterItems}
        categories={categories}
      ></CategoryButtons>

      <BookList books={books}></BookList>
    </div>
  )
}

export default Menu
