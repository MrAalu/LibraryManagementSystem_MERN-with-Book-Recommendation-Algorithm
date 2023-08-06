import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backend_server } from '../../main'
import useFetch from '../../useFetch'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'

const UserIndividualPage = () => {
  const { id } = useParams()
  const getSingleUser_API_URL = `${backend_server}/api/v1/users/${id}`

  const [userBookData, setUserBookData] = useState([])
  const [userData, setUserData] = useState()

  const fetched_data = useFetch(getSingleUser_API_URL)
  const bookData = fetched_data.fetched_data.bookData
  const usersData = fetched_data.fetched_data.userData

  // console.log(fetched_data.fetched_data)

  useEffect(() => {
    // Handles Array Length error without throwing error
    if (bookData) {
      setUserBookData(bookData)
    }
    if (usersData) {
      setUserData(usersData)
    }
  }, [bookData, usersData])

  return (
    <div className='container mt-2'>
      {/* users details */}
      {userData && userData.username ? (
        <div className='row text-left my-2'>
          <Row className='align-items-center '>
            {/* Image Section */}
            <Col md={4} className='text-center mx-1 my-2'>
              <div className='profile-details border p-4 shadow'>
                <img
                  style={{ width: '100px' }}
                  className='img-fluid'
                  src='/clientprofile.png'
                />
                <p className='mt-3'>{userData.username.toUpperCase()}</p>
              </div>
            </Col>

            {/* Other user INFO */}
            <Col md={6}>
              <div className='profile-details border p-4 shadow mx-1 my-2'>
                <h5>Email: {userData.email}</h5>
                <hr />

                <h5>Phone: {userData.phone}</h5>
                <hr />
                <h5>Total Books: {userData.totalAcceptedBooks}</h5>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <p className='p text-center mt-4'>Loading ...</p>
      )}

      {/* User Books data table */}
      {userBookData.length > 0 ? (
        <div className='row'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Book Title</th>
                <th scope='col'>Issue Status</th>
                <th scope='col'>Issue Date</th>
                <th scope='col'> Return Due</th>
                <th scope='col'> Returned Status</th>
                <th scope='col'>Extra Charge</th>
              </tr>
            </thead>
            <tbody>
              {userBookData &&
                userBookData.map((users, index) => {
                  const {
                    bookTitle,
                    _id,
                    issueStatus,
                    isReturned,
                    extraCharge,
                    issueDate,
                    returnDate,
                  } = users

                  const bookissuedate = new Date(issueDate).toDateString()

                  const returnOrNot = isReturned === true ? 'True' : 'False'

                  const updateReturnDate =
                    returnDate === null
                      ? 'NULL'
                      : new Date(returnDate).toDateString()
                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{bookTitle}</td>
                      <td>{issueStatus}</td>
                      <td>{bookissuedate}</td>
                      <td>{updateReturnDate}</td>
                      <td>{returnOrNot}</td>
                      <td>Nrs.{extraCharge} /-</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className='p text-center mt-4'>0 Book Data</p>
      )}
    </div>
  )
}

export default UserIndividualPage
