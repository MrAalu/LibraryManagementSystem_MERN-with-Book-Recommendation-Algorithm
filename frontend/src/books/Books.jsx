import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import './books.css'
import 'bootstrap/dist/css/bootstrap.css'

const API_URL = 'http://localhost:5000/api/v1/books/'
const Books = () => {
  const [bookData, setBookData] = useState([])

  const fetchData = async () => {
    try {
      const resp = await axios.get(API_URL)
      const data = resp.data.data
      console.log(data)
      setBookData(data)
    } catch (error) {
      console.log('Error fetching books')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <img
            src='https://c4.wallpaperflare.com/wallpaper/348/534/415/into-the-wild-christopher-mccandless-movie-scenes-men-wallpaper-preview.jpg'
            alt='Cover Image'
            className='img-fluid'
          />
        </div>
      </div>

      <h1 className='h1' style={{ textAlign: 'center' }}>
        Browse Collections
      </h1>

      <div className='row'>
        <h2>Filter</h2>
        {/* Filter Option */}
        <div className='col-md-2'>
          <form className='book-filter-form'>
            <div className='form-group'>
              <input
                type='text'
                className='form-control'
                placeholder='Search . . .'
              />
            </div>

            <div className='form-group'>
              <select className='form-control'>
                <option value=''>All Categories</option>
                <option value='fiction'>Fiction</option>
                <option value='non-fiction'>Non-Fiction</option>
                <option value='mystery'>Mystery</option>
              </select>
            </div>

            <div className='form-group'>
              <div className='form-check'>
                <label htmlFor='showAvailable' className='form-check-label'>
                  Show Available
                </label>
                <input
                  type='checkbox'
                  className='form-check-input'
                  id='showAvailable'
                  defaultChecked
                />
              </div>
            </div>

            <div className='form-group'>
              <button type='button' className='btn btn-success'>
                Apply Filters
              </button>
              <button type='button' className='btn btn-danger mr-2'>
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        {/* Book Collection */}
        <div className='col-md-10'>
          <div className='row'>
            {bookData.map((book) => {
              const { _id, title, image, author } = book
              return (
                <div key={_id} className='col-md-2'>
                  <div className='card'>
                    <img
                      src={image}
                      className='card-img-top'
                      alt='Book Cover'
                    />
                    <div className='card-body'>
                      <h3 className='card-title'>{title}</h3>
                      <p className='card-text'>{author}</p>
                      <button className='btn btn-primary'>Reserve</button>
                      <button className='btn btn-secondary'>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books

// BrowseCollectin h1
