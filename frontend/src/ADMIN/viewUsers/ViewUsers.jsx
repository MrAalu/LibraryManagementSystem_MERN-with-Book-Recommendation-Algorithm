import React, { useState, useEffect } from 'react'
import useFetch from '../../useFetch'
import { backend_server } from '../../main'

const ViewUsers = () => {
  const users_api = `${backend_server}/api/v1/users`
  const [totalUsers, setTotalUsers] = useState([])

  const fetched_data = useFetch(users_api)
  const data = fetched_data.fetched_data.data

  useEffect(() => {
    setTotalUsers(data)
  }, [data])

  return (
    <div className='container'>
      <h1 className='h1 text-center my-3'>View User's</h1>

      <div className='row mt-3'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Username</th>
              <th scope='col'>Email</th>
              <th scope='col'>Phone</th>
            </tr>
          </thead>
          <tbody>
            {totalUsers &&
              totalUsers.map((user, index) => {
                const { _id, username, email, phone } = user

                return (
                  <tr key={_id}>
                    <th scope='row'>{index + 1}</th>
                    <td>{username}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewUsers
