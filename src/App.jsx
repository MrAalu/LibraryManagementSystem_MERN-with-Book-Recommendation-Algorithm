import React from 'react'

import Navbar from './Navbar'
import Login from './login/Login'
import Signup from './signup/Signup'

const App = () => {
  return (
    <React.Fragment>
      <Navbar />

      {/* <Login></Login> */}

      <Signup></Signup>
    </React.Fragment>
  )
}

export default App
