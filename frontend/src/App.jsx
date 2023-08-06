import React, { useState, useEffect } from 'react'
import ClientApp from './CLIENT/ClientApp'
import AdminAPP from './ADMIN/AdminAPP'
import { backend_server } from './main'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

// conditionally rendering home page based on user Role/Type
const App = () => {
  const UPDATE_BOOK_FINE = `${backend_server}/api/v1/checkbookreturn`

  const [userType, setUserType] = useState('')

  const updateBookCharges = async () => {
    // hits api endpoints that runs book fine charge if not returned
    const response = await axios.get(UPDATE_BOOK_FINE)
    // console.log(response.data.message)
  }

  useEffect(() => {
    updateBookCharges()
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  return (
    <React.Fragment>
      <Toaster />
      {userType === 'admin_user' ? <AdminAPP /> : <ClientApp />}
    </React.Fragment>
  )
}

export default App
