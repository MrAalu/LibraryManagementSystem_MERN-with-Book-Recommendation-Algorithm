import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Login = () => {
  const API_URL = 'http://localhost:5000/api/v1/login'

  const refUsername = useRef(null)

  const Empty_Field_Object = { email: '', password: '' }
  const [textfield, setTextField] = useState(Empty_Field_Object)

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault()
      const email = textfield.email
      const password = textfield.password

      const response = await axios.post(API_URL, { email, password })
      const token = await response.data.token

      localStorage.setItem('token', token)

      toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
        loading: 'Logging in...',
        success: <b>Login Success</b>,
        error: <b>Login Failed</b>,
      })
      // Redirect to the home page after a delay
      setTimeout(() => {
        setTextField(Empty_Field_Object)
        window.location.href = '/'
      }, 2000)
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the 'if' error message from the backend to frontend
        const error_message = error.response.data.message

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
    <div className='login-maindiv'>
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

          <input
            type='password'
            placeholder='Enter Password'
            value={textfield.password}
            onChange={HandleOnChange}
            name='password'
            autoComplete='off'
            required
          />

          <button type='submit'>Login</button>
        </form>
        <br />
      </div>

      {/* LOWER DIV */}
      <div className='login-lowerdiv'>
        <Link to=''>Forgot Password ?</Link>
        <Link to='/signup' id='signupbtn-link'>
          <button>SignUp</button>
        </Link>
      </div>
      <Toaster />
    </div>
  )
}

export default Login
