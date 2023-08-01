import React, { useState, useEffect } from 'react'
import { backend_server } from '../../main'
import './adminpanel.css'
import axios from 'axios'

import { GiBookshelf } from 'react-icons/gi'
import { FaUserFriends } from 'react-icons/fa'
import { GiBookPile } from 'react-icons/gi'
import { FiGitPullRequest } from 'react-icons/fi'
import { BiCategoryAlt } from 'react-icons/bi'
import { BsFillJournalBookmarkFill } from 'react-icons/bs'

import { Card, Col, Row } from 'react-bootstrap'

const AdminPanel = () => {
  const FetchInfo_API = `${backend_server}/api/v1/adminHomePageInfo`

  const [homepageData, setHomepageData] = useState({})

  const fetchData = async () => {
    try {
      const response = await axios.get(FetchInfo_API)
      setHomepageData(response.data.data)
      // console.log(response.data.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='container mt-5 adminpanel-container'>
      <Row>
        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <GiBookshelf />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalBooks}</h3>
                <h5>Total Books</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <GiBookPile />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalIssuedBooks}</h3>
                <h5>Issued Books</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <FiGitPullRequest />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalBookRequests}</h3>
                <h5>Book Requests</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <FaUserFriends />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalRegisteredUsers}</h3>
                <h5>Registered Users</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <BsFillJournalBookmarkFill />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalAuthors}</h3>
                <h5>Authors Listed</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>

        <div className='col-xs-12 col-md-4 card-admin-main'>
          <Card className='card-admin my-3 mx-3' style={{ width: '250px' }}>
            <Card.Body>
              <span className='card-admin-icon'>
                <BiCategoryAlt />{' '}
              </span>
              <Card.Title className='card-admin-title'>
                <h3 className='h3 p-3'>{homepageData.totalCategories}</h3>
                <h5>Categories Listed</h5>
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  )
}

export default AdminPanel
