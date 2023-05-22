import React, { useState } from 'react'
import axios from 'axios'
import './signup.css'
import { Link } from 'react-router-dom'

const Signup = () => {
  const API_URL = 'http://localhost:5000/api/v1/signup'

  const Empty_Form_Field = {
    // fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    // confirm_password: '',
  }

  const [textField, setTextField] = useState(Empty_Form_Field)

  const [successFeedback, setSuccessFeedback] = useState(false)
  const [errorFeedback, setErrorFeedback] = useState(false)

  const HandleFormSubmit = async (e) => {
    try {
      e.preventDefault()
      const username = textField.username
      const email = textField.email
      const phone = textField.phone
      const password = textField.password

      const response = await axios.post(API_URL, {
        username,
        email,
        phone,
        password,
      })

      if (response.status === 200) {
        setSuccessFeedback(response.data.message)

        setTimeout(() => {
          setSuccessFeedback(false)
        }, 2000)
      }

      setTextField(Empty_Form_Field)
    } catch (error) {
      const userAlreadyExists = error.response.data.message
      if (userAlreadyExists) {
        setErrorFeedback(userAlreadyExists)
      }

      setErrorFeedback('Invalid Format')

      setTimeout(() => {
        setErrorFeedback(false)
      }, 2000)
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textField, [field_name]: field_value })
  }

  return (
    <div className='signup-maindiv'>
      {/* TOP DIV */}
      <div className='signup-upperdiv'>
        <h1>SignUp</h1>
      </div>

      {/* MIDDLE DIV */}
      <div className='signup-middlediv'>
        <form onSubmit={HandleFormSubmit} method='post'>
          <label htmlFor='usernamefield'>Username : </label>
          <input
            type='text'
            placeholder='Enter name..'
            id='usernamefield'
            value={textField.username}
            onChange={HandleOnChange}
            name='username'
            autoComplete='off'
            required
          />
          <label htmlFor='emailfield'>Email : </label>
          <input
            type='email'
            placeholder='e.g. user@gmail.com'
            id='emailfield'
            value={textField.email}
            onChange={HandleOnChange}
            name='email'
            autoComplete='off'
            required
          />
          <label htmlFor='phonefield'>Phone No. : </label>
          <input
            type='text'
            placeholder='e.g. 98...'
            id='phonefield'
            value={textField.phone}
            onChange={HandleOnChange}
            name='phone'
            autoComplete='off'
            required
            pattern='9\d{9}'
            minLength='10'
            maxLength='10'
          />
          <label htmlFor='passwordfield'>Password : </label>
          <input
            type='password'
            placeholder='Enter Password'
            id='passwordfield'
            value={textField.password}
            onChange={HandleOnChange}
            name='password'
            autoComplete='off'
            required
          />
          <br />

          {errorFeedback ? <p id='p-fail'>{errorFeedback}</p> : ''}

          {successFeedback ? (
            <p id='p-success'>User Created Successfully</p>
          ) : (
            ''
          )}
          <button>Signup</button>
        </form>
      </div>

      {/* LOWER DIV */}
      <div className='signup-lowerdiv'>
        <p>Already have an Account ? </p>
        <Link to='/login'>
          <button>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default Signup

{
  /* <label htmlFor='confirmpasswordfield'>Re-enter Password : </label>
          <input
            type='text'
            placeholder='Confirm Password'
            id='confirmpasswordfield'
            value={textField.confirm_password}
            onChange={HandleOnChange}
            name='confirm_password'
            autoComplete='off'
          /> */
}

{
  /* <label htmlFor='fullnamefield'>Full Name : </label>
          <input
            type='text'
            placeholder='Enter Fullname'
            id='fullnamefield'
            value={textField.fullname}
            onChange={HandleOnChange}
            name='fullname'
            autoComplete='off'
          /> */
}
