import React from 'react'
import './adminotpform.css'
import { backend_server } from '../../main'
import axios from 'axios'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AdminOtpForm = () => {
  const OTP_VERIFY_API = `${backend_server}/api/v1/signup/verifyEmail`
  const RESEND_OTP_API = `${backend_server}/api/v1/signup/resendOtp`

  const navigate = useNavigate()

  const [otp_code, setOtp_code] = useState('')
  const [loading, setLoading] = useState(false)

  const showLoadingToast = () => {
    return toast.loading('Sending otp code ...', {
      position: 'top-center',
      duration: Infinity, // The toast will not automatically close
    })
  }

  const handleVerifyFormSubmit = async () => {
    try {
      const response = await axios.post(OTP_VERIFY_API, { otpCode: otp_code })

      toast.success(response.data.message)

      navigate('/admin', { replace: true })
    } catch (error) {
      console.log(error.response)
      if (error.response.data.success == false) {
        toast(error.response.data.message, {
          icon: 'ℹ️',
        })
      }
    }
  }

  const handleResendFormSubmit = async () => {
    setLoading(true)
    const loadingToastId = showLoadingToast()
    try {
      const response = await axios.post(RESEND_OTP_API, {})

      toast.dismiss(loadingToastId)

      toast(response.data.message, {
        icon: 'ℹ️',
      })

      setLoading(false)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='container text-center my-3'>
      <h1 className='h1'>Email Verification Form</h1>
      <p className='p'>
        Enter your <strong>OTP</strong> code :{' '}
      </p>

      <form className='form otp-form' onSubmit={handleFormSubmit}>
        <div className='otp-container'>
          <input
            type='text'
            autoComplete='off'
            required
            className='form-control'
            name='otpCode'
            value={otp_code}
            onChange={(e) => setOtp_code(e.target.value)}
          />
        </div>
        <div className='col m-3'>
          <button
            className='btn btn-success m-2'
            onClick={handleVerifyFormSubmit}
          >
            Submit
          </button>
          <button
            className='btn btn-secondary m-2'
            disabled={loading}
            onClick={handleResendFormSubmit}
          >
            {loading ? 'Sending Otp...' : 'Re-send Otp'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminOtpForm
