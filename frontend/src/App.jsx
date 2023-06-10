import React, { useState } from 'react'
import ClientApp from './CLIENT/ClientApp'
import AdminAPP from './ADMIN/AdminAPP'

export const CheckLoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
}

const App = () => {
  return (
    <ClientApp></ClientApp>
    // <AdminAPP></AdminAPP>
  )
}

export default App
