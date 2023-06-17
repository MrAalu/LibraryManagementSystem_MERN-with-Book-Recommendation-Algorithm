import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const LoginState = ({ children }) => {
  const [userLogState, setUserLogState] = useState(null)

  const [userType, setUserType] = useState(null)

  useEffect(() => {
    const storedUserLogState = localStorage.getItem('userLogState')
    const storedUserType = localStorage.getItem('userType')

    if (storedUserLogState && storedUserType) {
      setUserLogState(storedUserLogState)
      setUserType(storedUserType)
    }
  }, [])

  const login = (user_email, user_role) => {
    // User Login State ( Storing EMAIL )
    setUserLogState(user_email)
    localStorage.setItem('userLogState', user_email)

    // Logged in user ROLE/TYPE (Storing userType)
    setUserType(user_role)
    localStorage.setItem('userType', user_role)
  }
  const logout = () => {
    setUserLogState(null)
    setUserType(null)
    localStorage.removeItem('userLogState')
    localStorage.removeItem('userType')
  }

  return (
    <AuthContext.Provider value={{ userLogState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useLoginState = () => {
  return useContext(AuthContext)
}
