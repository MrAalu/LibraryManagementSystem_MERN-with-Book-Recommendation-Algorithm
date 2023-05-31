import React from 'react'
import ManageSearchBooks from './ManageSearchBooks'
import './managebooks.css'

const ManageBooks = () => {
  return (
    <div className='container '>
      <h1 className='h1 text-center'>Manage Books </h1>

      <div className='row my-3'>
        <ManageSearchBooks />
      </div>

      {/* TABLE BOOK DATA */}
      <div className='row mt-3'>
        <table class='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Title</th>
              <th scope='col'>Category</th>
              <th scope='col'>Featured</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope='row'>ID</th>
              <td>Death : An Inside Story </td>
              <td>Spiritual</td>
              <td>True</td>
              <button className='btn mx-1 edit-books-btn'>Edit</button>
              <button className='btn mx-1 delete-books-btn'>Delete</button>
            </tr>
          </tbody>
        </table>
        <p>admin le filter garnu milna paryo for faster edit</p>
        <p>category,featured in form </p>
      </div>
    </div>
  )
}

export default ManageBooks
