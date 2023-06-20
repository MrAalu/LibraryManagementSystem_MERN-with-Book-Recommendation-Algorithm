import React, { useState, useEffect } from 'react'
import { useLoginState } from '../../LoginState'
import { Col, Row } from 'react-bootstrap'
import ClientDashboard from './ClientDashboard'
import ClientDetails from './ClientDetails'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { backend_server } from '../../main'

const ClientProfile = () => {
  const userLoginState = useLoginState()

  const getSingleUser_API_URL = `${backend_server}/api/v1/users/`

  const [userBookData, setUserBookData] = useState([])
  const [userData, setUserData] = useState()

  // Using post to send Cookie and fetch user data
  const fetchData = async () => {
    try {
      const response = await axios.post(getSingleUser_API_URL, {})

      const bookData = await response.data.bookDataAll
      const usersData = await response.data.userData

      if (bookData) {
        setUserBookData(bookData)
      }
      if (usersData) {
        setUserData(usersData)
      }
    } catch (error) {
      console.log(error.response)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [userBookData, userData])

  const [showDashboard, setShowDashboard] = useState(true)
  const [showProfile, setShowProfile] = useState(false)

  const handleOnclickDashboard = () => {
    setShowDashboard(true)
    setShowProfile(false)
  }
  const handleOnclickProfile = () => {
    setShowProfile(true)
    setShowDashboard(false)
  }

  return (
    <div className='container-fluid'>
      <Row className='my-3'>
        <h1 className='h1 text-center'>
          Welcome, {userLoginState.userLogState}
        </h1>
      </Row>

      {/* Left Bar */}
      <Row className='row my-3'>
        <Col className='col-md-2'>
          <button
            onClick={handleOnclickDashboard}
            className='btn btn-primary my-1 mx-1'
            style={{ width: '100%' }}
          >
            Dashboard
          </button>

          <button
            onClick={handleOnclickProfile}
            className='btn btn-primary my-1 mx-1'
            style={{ width: '100%' }}
          >
            My Details
          </button>

          <Link to='/logout'>
            <button
              className='btn btn-primary my-1 mx-1'
              style={{ width: '100%' }}
            >
              Logout
            </button>
          </Link>
        </Col>

        {/* Right Bar Page */}
        {/* Dashboard */}
        {showDashboard && (
          <Col>
            <ClientDashboard userBookData={userBookData}></ClientDashboard>
          </Col>
        )}

        {showProfile && (
          <Col>
            <ClientDetails userData={userData}></ClientDetails>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default ClientProfile
