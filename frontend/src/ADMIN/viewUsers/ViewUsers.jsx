import React, { useState, useEffect } from 'react'
import useFetch from '../../useFetch'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'

const ViewUsers = () => {
  const users_api = `${backend_server}/api/v1/users`
  const [totalUsers, setTotalUsers] = useState([])

  const fetched_data = useFetch(users_api)
  const data = fetched_data.fetched_data.data
  // console.log(fetched_data.fetched_data.data)
  useEffect(() => {
    setTotalUsers(data)
  }, [data])

  return (
    <div className='container mt-2'>
      <h1 className='h1 text-center'>View User's</h1>

      <div className='row mt-3'>
        {totalUsers && totalUsers.length > 0 ? (
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th scope='col'>Total Books</th>
                <th scope='col'>Book Details</th>
              </tr>
            </thead>
            <tbody>
              {totalUsers &&
                totalUsers.map((user, index) => {
                  const { _id, username, email, phone, totalAcceptedBooks } =
                    user

                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{totalAcceptedBooks}</td>
                      <td>
                        <Link to={`/admin/viewusers/${_id}`}>
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
        ) : (
          <p className='text-center my-1' style={{ fontSize: '2rem' }}>
            0 Registered Users
          </p>
        )}
      </div>
    </div>
  )
}

export default ViewUsers
