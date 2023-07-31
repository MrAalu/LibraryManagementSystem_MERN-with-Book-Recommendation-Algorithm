import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const IssuedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  const [isAnyBooksIssued, setIsAnyBooksIssued] = useState(false)

  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API)
      setNotReturnedBooks(response.data.data)

      if (response.data.data != undefined) {
        setIsAnyBooksIssued(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotReturnedBooks()
  }, [])

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Issued Books</h1>

      {/* Issue Book to User Button */}
      {/* <Link to='/admin/issuedbooks/issuebooktouser'>
        <button className='btn btn-primary' type='button'>
          Issue book to User
        </button>
      </Link> */}

      {isAnyBooksIssued ? (
        notReturnedBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Book</th>
                  {/* <th scope='col'>Username</th> */}
                  <th scope='col'>Email</th>
                  <th scope='col'>Issue Date</th>
                  <th scope='col'>Return Due</th>
                  <th scope='col'>Return Status</th>
                </tr>
              </thead>

              <tbody>
                {notReturnedBooks.map((book, index) => {
                  const {
                    _id,
                    userEmail,
                    bookTitle,
                    username,
                    isReturned,
                    returnDate,
                    extraCharge,
                    issueDate,
                  } = book

                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{bookTitle}</td>
                      {/* <td>{username}</td> */}
                      <td>{userEmail}</td>
                      <td>{new Date(issueDate).toDateString()}</td>
                      <td>{new Date(returnDate).toDateString()}</td>
                      {isReturned ? <td>Returned</td> : <td>Not Returned</td>}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='p text-center my-3'>No Issued Books Yet</p>
        )
      ) : (
        <p className='p text-center my-3'>No Issued Books Yet</p>
      )}
    </div>
  )
}

export default IssuedBooks
