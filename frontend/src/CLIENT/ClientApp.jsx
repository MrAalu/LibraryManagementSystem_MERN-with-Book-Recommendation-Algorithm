import React, { useState, useEffect } from 'react'
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
import AdminHome from '../ADMIN/adminHome/AdminHome'

const ClientApp = () => {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/menu' element={<FeaturedBooks />} />
          <Route path='/books' element={<Books />} />
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='*' element={<PagenotFound></PagenotFound>} />
        </Routes>
        <Footer />
      </Router>
    </React.Fragment>
  )
}

export default ClientApp
