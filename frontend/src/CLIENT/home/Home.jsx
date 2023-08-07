import React from 'react'
import './home.css'

import BannerHome from '../bannerHome/BannerHome'
import FeaturedBooks from '../featuredBooks/FeaturedBooks'
import RecentlyAddedBooks from '../recentlyAddedBooks/RecentlyAddedBooks'
import { Row } from 'react-bootstrap'
import RecommendedBooks from '../recommendedBooks/RecommendedBooks'

const Home = () => {
  return (
    <div className='home-main-div'>
      <BannerHome></BannerHome>
      <div className='container'>
        <Row className='my-3'>
          <RecommendedBooks></RecommendedBooks>
        </Row>
        <Row>
          <RecentlyAddedBooks></RecentlyAddedBooks>
        </Row>
        <Row>
          <FeaturedBooks></FeaturedBooks>
        </Row>
      </div>
    </div>
  )
}

export default Home
