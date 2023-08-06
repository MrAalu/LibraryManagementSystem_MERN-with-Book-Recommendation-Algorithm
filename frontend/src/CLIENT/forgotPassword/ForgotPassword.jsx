import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { backend_server } from '../../main'
import './forgot.css'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'

const ForgotPassword = () => {
  const ForgotPassword_API = `${backend_server}/api/v1/forgotpassword`

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [isEmailPhoneValid, setIsEmailPhoneValid] = useState(false)
  const [userId, setUserId] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const validateEmailPhone = await axios.post(ForgotPassword_API, {
        email,
        phone,
      })

      toast.success(' Credentials validation Success')
      setIsEmailPhoneValid(true)
      setUserId(validateEmailPhone.data.userId)

      setEmail('')
      setPhone('')
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message)
    }
  }

  const handleGoBack = () => {
    navigate(-1) // Navigate back one page
  }

  // Updating Password
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handlePasswordFormSubmit = async (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      // Validate alphanumeric password with a must Special character
      const alphanumericRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/

      const isPasswordValid = alphanumericRegex.test(password)
      if (!isPasswordValid) {
        return toast(
          'Password must be alphanumeric and contain at least one special character',
          {
            icon: 'ℹ️',
          }
        )
      }

      try {
        const response = await axios.patch(ForgotPassword_API, {
          userId,
          newPassword: password,
        })

        toast.success(response.data.message)

        setPassword('')
        setConfirmPassword('')
        setPasswordMatch(true)

        navigate('/login', { replace: true })
      } catch (error) {
        console.log(error.response)
        toast.error(error.response.data.message)
      }
    } else {
      setPasswordMatch(false)
      setTimeout(() => {
        setPasswordMatch(true)
      }, 3000)
    }
  }

  return (
    <div className='container'>
      <h1 className='h2 text-center my-3'>Recover Account </h1>

      <div className='d-flex flex-column align-items-center '>
        <form onSubmit={handleSubmit} className='w-50'>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name='email'
              autoComplete='off'
            />
          </div>

          <div className='form-group'>
            <label>Phone:</label>
            <input
              type='text'
              className='form-control'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              name='phone'
              pattern='9\d{9}'
              minLength='10'
              maxLength='10'
              autoComplete='off'
            />
          </div>

          <div className='text-center recover-password-div'>
            <button type='submit' className='btn btn-success my-2 btn-block '>
              Recover Password
            </button>
          </div>
        </form>

        {/* Password FORM */}
        {isEmailPhoneValid ? (
          <form onSubmit={handlePasswordFormSubmit}>
            <h1 className='h2 text-center my-3'>Update Password</h1>
            <div className='form-group'>
              <label>New Password:</label>
              <input
                type='password'
                minLength={5}
                className='form-control'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='off'
              />
            </div>
            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                minLength={5}
                type='password'
                className='form-control'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete='off'
              />
            </div>
            {!passwordMatch && (
              <div className='alert alert-danger' role='alert'>
                Password doesn't match
              </div>
            )}
            <div className='text-center'>
              <button type='submit' className='btn btn-primary my-3'>
                Submit
              </button>
            </div>
          </form>
        ) : (
          ''
        )}

        {/* Go Back button */}
        <button className='btn btn-secondary mt-3' onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword
