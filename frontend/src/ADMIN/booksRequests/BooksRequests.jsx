import React, { useEffect } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

const BooksRequests = () => {
  const Pending_Book_API_Url = `${backend_server}/api/v1/requestBooks`

  const [pendingBooks, setPendingBooks] = useState([])

  // Stored selected IssueStatus from FORM
  const [bookIssueStatus, setBookIssueStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(true)

  const fetchPendingBooks = async () => {
    try {
      const response = await axios.get(Pending_Book_API_Url)

      // console.log(response)

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
    fetchPendingBooks()
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
      fetchPendingBooks()
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleSelectChange = (e) => {
    const selectedIssueStatus = e.target.value
    setBookIssueStatus(selectedIssueStatus)
  }

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Books Request's</h1>
      {isAnyBooksPending ? (
        pendingBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>Email</th>
                  <th scope='col'>Book</th>
                  <th scope='col'>Status</th>
                  <th scope='col'> Update</th>
                </tr>
              </thead>

              <tbody>
                {pendingBooks.map((book, index) => {
                  const { _id, userEmail, bookTitle, issueStatus, username } =
                    book

                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{username}</td>
                      <td>{userEmail}</td>
                      <td>{bookTitle}</td>
                      <td>{issueStatus}</td>

                      <td>
                        <form className='d-flex' onSubmit={handleFormSubmit}>
                          <select
                            className='form-control mx-1'
                            // defaultValue='PENDING'
                            defaultValue={issueStatus.toUpperCase()}
                            onChange={handleSelectChange}
                          >
                            <option key='PENDING' value='PENDING'>
                              PENDING
                            </option>
                            <option key='READY' value='READY'>
                              READY to PICK
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
