import React from 'react'

import './signup.css'

const Signup = () => {
  return (
    <div className='signup-maindiv'>
      {/* TOP DIV */}
      <div className='signup-upperdiv'>
        <h1>SignUp</h1>
      </div>

      {/* MIDDLE DIV */}
      <div className='signup-middlediv'>
        <label htmlFor='fullnamefield'>Full Name : </label>
        <input
          type='text'
          placeholder='Enter Your Fullname'
          id='fullnamefield'
        />

        <label htmlFor='usernamefield'>Username : </label>
        <input type='text' placeholder='Enter Username' id='usernamefield' />

        <label htmlFor='emailfield'>Email : </label>
        <input type='email' placeholder='Enter Email' id='emailfield' />

        <label htmlFor='phonefield'>Phone No. : </label>
        <input type='number' placeholder='Enter Phone' id='phonefield' />

        <label htmlFor='passwordfield'>Password : </label>
        <input type='text' placeholder='Enter Password' id='passwordfield' />

        <label htmlFor='confirmpasswordfield'>Re-enter Password : </label>
        <input
          type='text'
          placeholder='Confirm Password'
          id='confirmpasswordfield'
        />

        <button>Signup</button>
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
