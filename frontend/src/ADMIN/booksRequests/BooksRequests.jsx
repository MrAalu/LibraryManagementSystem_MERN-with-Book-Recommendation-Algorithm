import React, { useEffect } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'

const BooksRequests = () => {
  const Pending_Book_API_Url = `${backend_server}/api/v1/requestBooks`

  const [pendingBooks, setPendingBooks] = useState([])

  // Stored selected IssueStatus from FORM
  const [bookIssueStatus, setBookIssueStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(true)

  const fetchPendingBoots = async () => {
    try {
      const response = await axios.get(Pending_Book_API_Url)

      const totalHits = response.data.totalHits
      if (totalHits == 0) {
        setIsAnyBooksPending(false)
      } else {
        setPendingBooks(response.data.data)
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchPendingBoots()
  }, [])

  // FORM
  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  const handleFormUpdate = async (transactionId) => {
    try {
      const response = await axios.patch(Pending_Book_API_Url, {
        id: transactionId,
        issueStatus: bookIssueStatus,
      })
      toast.success('Update Success')
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleSelectChange = (e) => {
    const selectedIssueStatus = e.target.value
    setBookIssueStatus(selectedIssueStatus)
  }

  return (
    <div className='container'>
      <Toaster />
      <h1 className='h1 text-center'>Books Request's</h1>
      {isAnyBooksPending ? (
        pendingBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>User</th>
                  <th scope='col'>Book</th>
                  <th scope='col'>Status</th>
                  <th scope='col'> Update</th>
                </tr>
              </thead>

              <tbody>
                {pendingBooks.map((book, index) => {
                  const { _id, userEmail, bookTitle, issueStatus } = book

                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{userEmail}</td>
                      <td>{bookTitle}</td>
                      <td>{issueStatus}</td>
                      {/* <td>
                      <Link to={`/admin/booksrequests/editstatus/${_id}`}>
                        <button className='btn mx-1 edit-books-btn'>
                          View Details
                        </button>
                      </Link>
                    </td> */}
                      <td>
                        <form className='d-flex' onSubmit={handleFormSubmit}>
                          <select
                            className='form-control mx-1'
                            defaultValue='PENDING'
                            onChange={handleSelectChange}
                          >
                            <option key='PENDING' value='PENDING'>
                              PENDING
                            </option>
                            <option key='ACCEPTED' value='ACCEPTED'>
                              ACCEPTED
                            </option>
                            <option key='CANCELLED' value='CANCELLED'>
                              CANCELLED
                            </option>
                          </select>
                          <button
                            className='btn btn-success mx-1'
                            onClick={() => handleFormUpdate(_id)}
                          >
                            Update
                          </button>
                        </form>
                      </td>
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
        <p className='p text-center my-3'>0 Book Requests</p>
      )}
    </div>
  )
}

export default BooksRequests
