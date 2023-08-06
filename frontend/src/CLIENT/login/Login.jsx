import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { backend_server } from '../../main'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

import { useLoginState } from '../../LoginState'

const Login = () => {
  const API_URL = `${backend_server}/api/v1/login`

  const navigate = useNavigate()
  const refUsername = useRef(null)

  const Empty_Field_Object = { email: '', password: '' }
  const [textfield, setTextField] = useState(Empty_Field_Object)
  const [showPassword, setShowPassword] = useState(false) // State variable to track password visibility

  const showLoadingToast = () => {
    return toast.loading('Loggin in...', {
      position: 'top-center',
      duration: Infinity, // The toast will not automatically close
    })
  }

  const userLoginState = useLoginState()

  // Login Form submit
  const HandleSubmit = async (e) => {
    const loadingToastId = showLoadingToast()
    try {
      e.preventDefault()
      const email = textfield.email
      const password = textfield.password

      const response = await axios.post(API_URL, { email, password })
      const userType = await response.data.userType

      toast.dismiss(loadingToastId)

      // Passing user email to refrence user is logged in , userType to refrence what user ROLE is
      userLoginState.login(email, userType)
      if (userType === 'normal_user') {
        toast.success('Login Success')
        navigate('/', { replace: true })
      } else if (userType === 'admin_user') {
        // Hard reload into ADMIN Page
        window.location.href = '/admin'
      }
    } catch (error) {
      toast.dismiss(loadingToastId)
      // console.log('ERROR : ', error.response)

      if (error.response.data.ENTER_OTP === true) {
        navigate('/otp', { replace: true })
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the 'if' error message from the backend to frontend
        const error_message = error.response.data.message
        // console.log(error_message)
        toast.error(error_message)
      }
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textfield, [field_name]: field_value })
  }

  useEffect(() => {
    refUsername.current.focus()
  }, [])

  return (
    <div className='login-maindiv '>
      {/* TOP DIV */}
      <div className='login-upperdiv'>
        <h1>Login</h1>
      </div>

      {/* MIDDLE DIV */}
      <div className='login-middlediv'>
        <form onSubmit={HandleSubmit} method='post'>
          <input
            type='email'
            placeholder='Enter Email'
            value={textfield.email}
            onChange={HandleOnChange}
            name='email'
            autoComplete='off'
            required
            ref={refUsername}
          />

          <div className='password-field'>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
              placeholder='Enter Password'
              value={textfield.password}
              onChange={HandleOnChange}
              name='password'
              autoComplete='off'
              required
            />
            <span
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <BsEye /> : <BsEyeSlash />}
            </span>
          </div>

          <button type='submit'>Login</button>
        </form>
        <br />
      </div>

      {/* LOWER DIV */}
      <div className='login-lowerdiv'>
        <Link to='/forgotpassword'>Forgot Password ?</Link>
        <Link to='/signup' id='signupbtn-link'>
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
