import React from 'react'
import './home.css'

// Importing Data
import { BooksDatabase } from '../myDatabase/Data'

import BannerHome from '../bannerHome/BannerHome'

const Home = () => {
  return (
    <div className='home-main-div'>
      <BannerHome></BannerHome>
    </div>
  )
}

export default Home
