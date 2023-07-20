import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './navbar/Navbar'
import Login from './login/Login'
import Signup from './signup/Signup'
import Home from './home/Home'
import FeaturedBooks from './featuredBooks/FeaturedBooks'
import Books from './books/Books'
import Footer from './footer/Footer'
import AboutUsPage from './about/AboutUsPage'
import PagenotFound from './404-pageNotFound/PagenotFound'
import { LoginState } from '../LoginState'
import ClientProfile from './clientProfile/ClientProfile'
import ViewBook from './viewBooks/ViewBook'
import ForgotPassword from './forgotPassword/ForgotPassword'
import OtpForm from './otpForm/OtpForm'

const ClientApp = () => {
  return (
    <LoginState>
      <React.Fragment>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/menu' element={<FeaturedBooks />} />
            <Route path='/books' element={<Books />} />
            <Route path='/books/:id' element={<ViewBook />} />
            <Route path='/profile' element={<ClientProfile />} />
            <Route path='/about' element={<AboutUsPage />} />
            <Route path='/otp' element={<OtpForm />} />

            <Route path='*' element={<PagenotFound></PagenotFound>} />
          </Routes>
          <Footer />
        </Router>
      </React.Fragment>
    </LoginState>
  )
}

export default ClientApp
