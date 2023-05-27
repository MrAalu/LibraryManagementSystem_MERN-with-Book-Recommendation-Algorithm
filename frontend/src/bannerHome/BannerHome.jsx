import React from 'react'
import './banner.css'
import Carousel from 'react-bootstrap/Carousel'
import bannerData from './bannerdata'

const BannerHome = () => {
  return (
    <div className='custom-container'>
      <Carousel>
        {bannerData.map((items) => {
          const { id, image, heading, paragraph } = items
          return (
            <Carousel.Item key={id}>
              <img
                className='img-fluid d-block w-100'
                id='banner-image'
                src={image}
                alt='First slide'
              />
              <Carousel.Caption>
                <h3 className='text-outline-h'>{heading}</h3>
                <p className='text-outline-p'>{paragraph}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        })}
      </Carousel>
    </div>
  )
}

export default BannerHome
