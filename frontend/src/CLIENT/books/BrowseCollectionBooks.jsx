import React from 'react'
import { backend_server } from '../../main'
import { Link } from 'react-router-dom'
import './card.css'
import RequestBook from '../requestBooks/RequestBook'

const BrowseCollectionBooks = ({ bookData, searchResult }) => {
  const { request_Book } = RequestBook()

  return (
    <div className='row mt-3'>
      {bookData.length > 0 ? (
        bookData.map((book) => {
          const { _id, title, image, author, available } = book

          const imgSrc = `${backend_server}/${image}`

          return (
            <div className='col-lg-3 col-md-4 col-sm-6 col-6 gy-3 ' key={_id}>
              <div className='card h-100'>
                <div className='card-img-top'>
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                    className='img-fluid'
                    src={imgSrc}
                    alt='book image'
                  />
                </div>
                <div className='card-body'>
                  <h5 className='h5 card-title'>{title}</h5>
                  <p className='p card-text'>{author}</p>
                  <div className='form-group mb-2 justify-content-center d-flex mt-auto'>
                    {available ? (
                      <button
                        type='button'
                        className='btn btn-primary me-2'
                        onClick={() => request_Book(_id)}
                      >
                        Request
                      </button>
                    ) : (
                      <button
                        type='button'
                        className='btn btn-primary me-2'
                        disabled
                      >
                        Out of Stock
                      </button>
                    )}

                    {/* View Books Button */}
                    <Link to={`/books/${_id}`}>
                      <button type='button' className='btn btn-secondary me-2'>
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <h5 className='p text-center'>
          {searchResult ? <p>Loading...</p> : <p>0 Results</p>}
        </h5>
      )}
    </div>
  )
}

export default BrowseCollectionBooks
