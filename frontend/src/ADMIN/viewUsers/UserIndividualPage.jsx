import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { backend_server } from '../../main'
import useFetch from '../../useFetch'

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
    <div className='container my-3'>
      {/* users details */}
      {userData && userData.username ? (
        <div className='row text-center'>
          <h1 className='h1 text-center'>User Details '{userData.username}'</h1>
        </div>
      ) : (
        <p className='p text-center mt-4'>Loading ...</p>
      )}

      {/* User Books data table */}
      {userBookData.length > 0 ? (
        <div className='row my-4'>
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
