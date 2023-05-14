import React, { useState } from 'react'

import './signup.css'

const Signup = () => {
  const Empty_Form_Field = {
    fullname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  }

  const [textField, setTextField] = useState(Empty_Form_Field)

  const HandleFormSubmit = (e) => {
    e.preventDefault()
    setTextField(Empty_Form_Field)
    console.log(textField)
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
        <form onSubmit={HandleFormSubmit}>
          <label htmlFor='fullnamefield'>Full Name : </label>
          <input
            type='text'
            placeholder='Enter Fullname'
            id='fullnamefield'
            value={textField.fullname}
            onChange={HandleOnChange}
            name='fullname'
            autoComplete='off'
          />

          <label htmlFor='usernamefield'>Username : </label>
          <input
            type='text'
            placeholder='Enter Username'
            id='usernamefield'
            value={textField.username}
            onChange={HandleOnChange}
            name='username'
            autoComplete='off'
          />

          <label htmlFor='emailfield'>Email : </label>
          <input
            type='email'
            placeholder='Enter Email'
            id='emailfield'
            value={textField.email}
            onChange={HandleOnChange}
            name='email'
            autoComplete='off'
          />

          <label htmlFor='phonefield'>Phone No. : </label>
          <input
            type='number'
            placeholder='Enter Phone'
            id='phonefield'
            value={textField.phone}
            onChange={HandleOnChange}
            name='phone'
            autoComplete='off'
          />

          <label htmlFor='passwordfield'>Password : </label>
          <input
            type='text'
            placeholder='Enter Password'
            id='passwordfield'
            value={textField.password}
            onChange={HandleOnChange}
            name='password'
            autoComplete='off'
          />

          <label htmlFor='confirmpasswordfield'>Re-enter Password : </label>
          <input
            type='text'
            placeholder='Confirm Password'
            id='confirmpasswordfield'
            value={textField.confirm_password}
            onChange={HandleOnChange}
            name='confirm_password'
            autoComplete='off'
          />

          <button>Signup</button>
        </form>
      </div>

      {/* LOWER DIV */}
      <div className='signup-lowerdiv'>
        <p>Already have an Account ? </p>
        <button>Login</button>
      </div>
    </div>
  )
}

export default Signup
