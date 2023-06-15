import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const LoginState = ({ children }) => {
  const [userLogState, setUserLogState] = useState(null)

  useEffect(() => {
    const storedUserLogState = localStorage.getItem('userLogState')
    if (storedUserLogState) {
      setUserLogState(storedUserLogState)
    }
  }, [])

  const login = (user_email) => {
    setUserLogState(user_email)
    localStorage.setItem('userLogState', user_email)
  }
  const logout = () => {
    setUserLogState(null)
    localStorage.removeItem('userLogState')
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
