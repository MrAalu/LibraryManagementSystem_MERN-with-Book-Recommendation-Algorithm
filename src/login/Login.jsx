import React from 'react'
import './login.css'
const Login = () => {
  return (
    <div className='login-maindiv'>
      {/* TOP DIV */}
      <div className='login-upperdiv'>
        <h1>Login</h1>
      </div>

      {/* MIDDLE DIV */}
      <div className='login-middlediv'>
        <input type='text' placeholder='Enter Username' />
        <input type='text' placeholder='Enter Password' />
        <button>Login</button>
      </div>

      {/* LOWER DIV */}
      <div className='login-lowerdiv'>
        <a href=''>Forgot Password ?</a>
        <button>SignUp</button>
      </div>
    </div>
  )
}

export default Login
