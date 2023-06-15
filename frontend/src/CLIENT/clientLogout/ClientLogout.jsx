import React from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ClientLogout = () => {
  const logout_Api_url = `${backend_server}/api/v1/logout`

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Clear cookie using API
      await axios.post(logout_Api_url)

      // Clear LoginState from LocalStorage
      localStorage.clear()

      navigate('/', { replace: true })
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col text-center'>
          <img className='img-fluid' src='/LogoutImage.jpg' alt='' />

          <h3 className='h3'>are you sure, you want to Logout ? </h3>

          <button className='btn btn-success mx-5 my-3' onClick={handleLogout}>
            Yes
          </button>

          <button className='btn btn-secondary'>Go Back</button>
        </div>
      </div>
    </div>
  )
}

export default ClientLogout
