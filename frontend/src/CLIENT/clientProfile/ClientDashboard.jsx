import React, { useEffect, useState } from 'react'
import { backend_server } from '../../main'
import axios from 'axios'

const ClientDashboard = ({ userBookData }) => {
  return (
    <div className='container my-3'>
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
                  } = users

                  const bookissuedate = new Date(issueDate).toDateString()

                  const returnOrNot = isReturned === true ? 'True' : 'False'
                  return (
                    <tr key={_id}>
                      <th scope='row'>{index + 1}</th>
                      <td>{bookTitle}</td>
                      <td>{issueStatus}</td>
                      <td>{bookissuedate}</td>
                      <td>When to REturn</td>
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

export default ClientDashboard
