import React from 'react'

import Navbar from './navbar/Navbar'
import Login from './login/Login'
import Signup from './signup/Signup'
import Home from './home/Home'
import Menu from './filterHome/Menu'

const App = () => {
  return (
    <React.Fragment>
      <Navbar />

      {/* <Home></Home> */}

      <Menu></Menu>

      {/* <Login></Login> */}

      {/* <Signup></Signup> */}
    </React.Fragment>
  )
}

export default App
