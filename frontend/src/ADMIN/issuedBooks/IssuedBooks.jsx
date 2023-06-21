import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { backend_server } from '../../main'
import IssueBookToUser from './IssueBookToUser'
import { Link } from 'react-router-dom'

const IssuedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`
  const Update_Return_Status_API = `${backend_server}/api/v1/requestBooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  // Stored selected return Status from FORM
  const [bookReturnStatus, setBookReturnStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(true)

  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API)
      setNotReturnedBooks(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotReturnedBooks()
  }, [])

  // FORM
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleFormUpdate = async (transactionId) => {
    const updateReturnStatus = bookReturnStatus === 'true' ? true : false

    try {
      await axios.patch(Update_Return_Status_API, {
        id: transactionId,
        isReturned: updateReturnStatus,
      })
      toast.success('Update Success')
    } catch (error) {
      console.log(error)
      console.log(error.response)
    }
  }

  const handleSelectChange = (e) => {
    const selectedReturnStatus = e.target.value
    setBookReturnStatus(selectedReturnStatus)
  }

  return (
    <div className='container'>
      <Toaster />
      <h1 className='h1 text-center'>Issued Books</h1>

      <Link to='/admin/issuedbooks/issuebooktouser'>
        <button className='btn btn-primary' type='button'>
          Issue book to User
        </button>
      </Link>

      {isAnyBooksPending ? (
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
          <p>Loading ...</p>
        )
      ) : (
        <p className='p text-center my-3'>0 Book's left to RETURN</p>
      )}
    </div>
  )
}

export default IssuedBooks
