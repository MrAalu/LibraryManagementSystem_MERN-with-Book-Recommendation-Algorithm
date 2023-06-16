import React, { useEffect, useState } from 'react'
import ManageSearchBooks from './ManageSearchBooks'
import axios from 'axios'
import './managebooks.css'

// API BASE URL
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ManageBooks = () => {
  const API_URL = `${backend_server}/api/v1/books`

  const [allBooks, setAllBooks] = useState([])
  const [categories, setCategories] = useState([])

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL)

      const bookCategories = [
        ...new Set(
          response.data.data.map((items) => {
            return items.category
          })
        ),
      ]

      // console.log(bookCategories)
      setCategories(bookCategories)

      setAllBooks(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchBooks()
  }, [])

  return (
    <div className='container '>
      <h1 className='h1 text-center'>Manage Books </h1>

      <div className='row my-3'>
        {/* Filter gareko books lai set Gareko */}
        <ManageSearchBooks
          setAllBooks={setAllBooks}
          bookCategories={categories}
        />
      </div>

      {/* TABLE BOOK DATA */}
      <div className='row mt-3'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Title</th>
              <th scope='col'>Category</th>
              <th scope='col'>Featured</th>
              <th scope='col'>Available</th>
              <th scope='col'> Update</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, index) => {
              const { _id, title, category, featured, available } = book

              // Convert boolean values to strings
              const featuredText = featured ? 'Yes' : 'No'
              const availableText = available ? 'Yes' : 'No'

              return (
                <tr key={_id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{title}</td>
                  <td>{category}</td>
                  <td>{featuredText}</td>
                  <td>{availableText}</td>
                  <td>
                    <Link to={`admin-edit-books/${_id}`}>
                      <button className='btn mx-1 edit-books-btn'>
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p>admin le filter garnu milna paryo for faster edit</p>
        <p>category,featured in form </p>
      </div>
    </div>
  )
}

export default ManageBooks
