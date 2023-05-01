import React, { useState } from 'react'
import './login.css'
const Login = () => {
  const Empty_Field_Object = { username: '', password: '' }
  const [textfield, setTextField] = useState(Empty_Field_Object)

  const HandleSubmit = (e) => {
    e.preventDefault()
    setTextField(Empty_Field_Object)
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
        <form onSubmit={HandleSubmit}>
          <input
            type='text'
            placeholder='Enter Username'
            value={textfield.username}
            onChange={HandleOnChange}
            name='username'
          />

          <input
            type='text'
            placeholder='Enter Password'
            value={textfield.password}
            onChange={HandleOnChange}
            name='password'
          />

          <button type='submit'>Login</button>
        </form>
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
