import React, { useEffect, useState } from 'react'
import ManageSearchBooks from './ManageSearchBooks'
import axios from 'axios'
import './managebooks.css'
import CustomPagination from '../../CLIENT/pagination/CustomPagination'

// API BASE URL
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ManageBooks = () => {
  const API_URL = `${backend_server}/api/v1/books`
  const API_SKIPFETCH = `${backend_server}/api/v1/book/`

  // If 0 results then display false , true = results found , false = 0 search results
  const [searchResult, setSearchResult] = useState(true)

  // if filterForm is active , disbale pagination else allow paginations
  const [filterActive, setFilterActive] = useState(false)

  const fetchData = async (pageNumber) => {
    try {
      const resp = await axios.get(`${API_SKIPFETCH}/?page=${pageNumber}`)
      const data = await resp.data.data
      setAllBooks(data)
    } catch (error) {
      console.log('Error fetching books collections', error)
    }
  }

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

      // setAllBooks(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }
  useEffect(() => {
    fetchBooks() //Fetches all books
    fetchData() //fetches only 8 books
  }, [])

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Manage Books </h1>

      <div className='row my-3'>
        {/* Filter gareko books lai set Gareko */}
        <ManageSearchBooks
          setAllBooks={setAllBooks}
          bookCategories={categories}
        />
      </div>

      {/* TABLE BOOK DATA */}
      {allBooks.length > 0 ? (
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
                      <Link to={`/admin/managebooks/${_id}`}>
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
          {/* Pagination */}
          <div className='my-3 d-flex justify-content-center'>
            <CustomPagination
              fetchData={fetchData}
              filterActive={filterActive}
            ></CustomPagination>
          </div>
        </div>
      ) : (
        <p className='p text-center'>0 Book result's</p>
      )}
    </div>
  )
}

export default ManageBooks
