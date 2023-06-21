import React from 'react'
import { backend_server } from '../../main'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLoginState } from '../../LoginState'

const AdminLogout = () => {
  const logout_Api_url = `${backend_server}/api/v1/logout`

  const navigate = useNavigate()

  const userLoginState = useLoginState()

  const handleLogout = async () => {
    try {
      localStorage.clear()

      // Clear cookie using API
      const resp = await axios.post(logout_Api_url)
      console.log(resp)

      window.location.href = '/'
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col text-center'>
          <img
            className='img-fluid'
            src='/LogoutImage.jpg'
            alt=''
            style={{ width: '350px' }}
          />

          <h3 className='h3'>are you sure, you want to Logout ? </h3>

          <button className='btn btn-success mx-5 my-3' onClick={handleLogout}>
            Yes
          </button>

          <button className='btn btn-secondary' onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogout
