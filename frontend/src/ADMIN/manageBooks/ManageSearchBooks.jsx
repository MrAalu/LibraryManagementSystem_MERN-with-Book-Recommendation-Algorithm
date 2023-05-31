import React from 'react'

const ManageSearchBooks = () => {
  return (
    <div className='container '>
      <div className='row'>
        <div className='col-md-8'>
          <form
            method='get'
            className='form-inline d-flex justify-content-center'
          >
            <input
              type='text'
              className='form-control mx-1'
              autoComplete='off'
              placeholder='Search by title . . .'
            />
            <button type='submit' className='btn btn-success mx-1 my-1'>
              search
            </button>
          </form>
        </div>

        <div className='col mx-1 my-1'>
          <button className='btn btn-primary'>Add new Book</button>
        </div>
      </div>
    </div>
  )
}

export default ManageSearchBooks
