import React from 'react'

import Navbar from './Navbar'
import Login from './login/Login'
import Signup from './signup/Signup'
import Home from './home/Home'

const App = () => {
  return (
    <React.Fragment>
      <Navbar />

      {/* <Login></Login>

      <Signup></Signup> */}

      <Home></Home>
    </React.Fragment>
  )
}

export default App
