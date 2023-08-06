import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { backend_server } from '../../main'

const ReturnedBooks = () => {
  const NOT_RETURNED_API = `${backend_server}/api/v1/requestBooks/notreturnedbooks`
  const Update_Return_Status_API = `${backend_server}/api/v1/requestBooks`

  const [notReturnedBooks, setNotReturnedBooks] = useState([])

  // Stored selected return Status from FORM
  const [bookReturnStatus, setBookReturnStatus] = useState()
  const [isAnyBooksPending, setIsAnyBooksPending] = useState(false)

  const fetchNotReturnedBooks = async () => {
    try {
      const response = await axios.get(NOT_RETURNED_API)

      if (response.data.data.length > 0) {
        setIsAnyBooksPending(true)
      } else {
        setIsAnyBooksPending(false)
      }
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

      fetchNotReturnedBooks()
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
    <div className='container mt-2'>
      <h1 className='h1 text-center'>Return Due Books</h1>
      {isAnyBooksPending ? (
        notReturnedBooks.length > 0 ? (
          <div className='row mt-3'>
            <table className='table table-hover'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  {/* <th scope='col'>Username</th> */}
                  <th scope='col'>Email</th>
                  <th scope='col'>Book</th>
                  <th scope='col'>Return Due</th>
                  <th scope='col'>Return Status</th>
                  <th scope='col'>Charge</th>
                  <th scope='col'> Update</th>
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
                  } = book

                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      {/* <td>{username}</td> */}
                      <td>{userEmail}</td>
                      <td style={{ width: '250px' }}>{bookTitle}</td>
                      <td>{new Date(returnDate).toDateString()}</td>
                      {isReturned ? <td>Returned</td> : <td>Not Returned</td>}
                      <td>Nrs.{extraCharge}/-</td>

                      <td>
                        <form className='d-flex' onSubmit={handleFormSubmit}>
                          <select
                            className='form-control mx-1'
                            defaultValue='false'
                            onChange={handleSelectChange}
                          >
                            <option key='false' value='false'>
                              Not Returned
                            </option>
                            <option key='true' value='true'>
                              Returned
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
        <p className='p text-center my-3'>0 Book's left to RETURN</p>
      )}
    </div>
  )
}

export default ReturnedBooks
