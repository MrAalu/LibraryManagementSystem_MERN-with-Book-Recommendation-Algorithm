import React, { useState, useEffect } from 'react'
import { useLoginState } from '../../LoginState'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { backend_server } from '../../main'
import ClientDashboard from './ClientDashboard'
import ClientDetails from './ClientDetails'
import ClientLogout from '../clientLogout/ClientLogout'
import './clientprofile.css'

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
  const [showLogout, setShowLogout] = useState(false)

  const handleOnclickDashboard = () => {
    setShowDashboard(true)
    setShowProfile(false)
    setShowLogout(false)
  }
  const handleOnclickProfile = () => {
    setShowProfile(true)
    setShowDashboard(false)
    setShowLogout(false)
  }
  const handleOnclickLogout = () => {
    setShowLogout(true)
    setShowDashboard(false)
    setShowProfile(false)
  }

  return (
    <div className='container-fluid'>
      {/* <Row className='my-3'>
        <h1 className='h1 text-center'>
          Welcome, {userLoginState.userLogState}
        </h1>
      </Row> */}

      <Row className='row client-sidebar'>
        {/* Left Bar */}
        <Col className='col-md-2 client-dashboard-buttons'>
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

          <button
            className='btn btn-primary my-1 mx-1'
            onClick={handleOnclickLogout}
            style={{ width: '100%' }}
          >
            Logout
          </button>
        </Col>

        {/* Right Bar Page */}
        {/* Dashboard */}

        {showDashboard && (
          <Col>
            <ClientDashboard userBookData={userBookData}></ClientDashboard>
          </Col>
        )}

        {/* Profile */}
        {showProfile && (
          <Col>
            <ClientDetails userData={userData}></ClientDetails>
          </Col>
        )}

        {/* Logout */}
        {showLogout && (
          <Col>
            <ClientLogout></ClientLogout>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default ClientProfile
