import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  const API_URL = 'http://localhost:5000/api/v1/login'

  const Empty_Field_Object = { email: '', password: '' }
  const [textfield, setTextField] = useState(Empty_Field_Object)
  const [successPrompt, setSuccessPrompt] = useState(false)
  const [errorPrompt, setErrorPrompt] = useState(false)

  const HandleSubmit = async (e) => {
    try {
      e.preventDefault()
      const email = textfield.email
      const password = textfield.password

      const response = await axios.post(API_URL, { email, password })
      const token = await response.data.token
      console.log('Generated Token : ', token)

      localStorage.setItem('token', token)

      setSuccessPrompt('Login Success')
      setTextField(Empty_Field_Object)

      setTimeout(() => {
        setSuccessPrompt(false)
      }, 2000)
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the 'if' error message from the backend to frontend
        const error_message = error.response.data.message
        setErrorPrompt(error_message)
      }

      setTimeout(() => {
        setErrorPrompt(false)
      }, 2000)
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textfield, [field_name]: field_value })
  }

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
          />

          <input
            type='text'
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
        {successPrompt ? <p id='p-success'>{successPrompt}</p> : ''}
        {errorPrompt ? <p id='p-fail'>{errorPrompt}</p> : ''}
      </div>

      {/* LOWER DIV */}
      <div className='login-lowerdiv'>
        <Link to=''>Forgot Password ?</Link>
        <Link to='/signup' id='signupbtn-link'>
          <button>SignUp</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
