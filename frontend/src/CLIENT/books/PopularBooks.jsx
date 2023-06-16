import React from 'react'
import { dummyPopular } from '../myDatabase/dummyBookData'
import { Link } from 'react-router-dom'
import './card.css'
import RequestBook from '../requestBooks/RequestBook'

const PopularBooks = () => {
  const { request_Book } = RequestBook()

  return (
    <div className='row'>
      {dummyPopular.map((book) => {
        const { id, name, img, author } = book

        return (
          <div
            className='col-lg-3 col-md-4 col-sm-6 col-6 gy-3 mx-auto'
            key={id}
          >
            <div className='card h-100'>
              <div className='card-img-top'>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  className='img-fluid'
                  src={img}
                  alt='book image'
                />{' '}
              </div>

              <div className='card-body'>
                <h5 className='h5 card-title'>{name}</h5>
                <p className='p card-text'>{author}</p>
                <div className='form-group mb-2 justify-content-center d-flex'>
                  <button
                    type='button'
                    className='btn btn-primary me-2'
                    // onClick={() => request_Book(_id)}
                  >
                    Request
                  </button>

                  <Link to={`/books/${id}`}>
                    <button type='button' className='btn btn-secondary me-2'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default PopularBooks
