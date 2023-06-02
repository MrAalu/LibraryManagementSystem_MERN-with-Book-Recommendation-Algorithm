import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import './signup.css'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Signup = () => {
  const API_URL = 'http://localhost:5000/api/v1/signup'

  const refUsername = useRef(null)

  const Empty_Form_Field = {
    // fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    // confirm_password: '',
  }

  const [textField, setTextField] = useState(Empty_Form_Field)

  const HandleFormSubmit = async (e) => {
    try {
      e.preventDefault()

      // Validate email format
      const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/
      const isValid = emailRegex.test(textField.email)
      // console.log(isValid)
      if (!isValid) {
        toast.error('Invalid Email Format')
      }

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
        toast.success('User Created Successfully')
      }

      setTextField(Empty_Form_Field)
    } catch (error) {
      console.log(error.response)
      const userAlreadyExists = error.response.data.message
      toast.error(userAlreadyExists)

      // setErrorFeedback('Invalid Format')
    }
  }

  const HandleOnChange = (event) => {
    const field_name = event.target.name
    const field_value = event.target.value

    setTextField({ ...textField, [field_name]: field_value })
  }
  useEffect(() => {
    refUsername.current.focus()
  }, [])

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
            ref={refUsername}
            maxLength='20'
            minLength='5'
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
            minLength='5'
          />
          <br />

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
      <Toaster />
    </div>
  )
}

export default Signup
