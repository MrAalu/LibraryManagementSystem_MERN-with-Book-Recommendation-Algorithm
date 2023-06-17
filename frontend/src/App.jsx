import React, { useState, useEffect } from 'react'
import ClientApp from './CLIENT/ClientApp'
import AdminAPP from './ADMIN/AdminAPP'

// conditionally rendering home page based on user Role/Type
const App = () => {
  const [userType, setUserType] = useState('')

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType')
    setUserType(storedUserType)
  }, [])

  return (
    <React.Fragment>
      {userType === 'admin_user' ? <AdminAPP /> : <ClientApp />}
    </React.Fragment>
  )
}

export default App
