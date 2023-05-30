import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './aboutbanner.css'

const AboutUsBanner = () => {
  return (
    <div className='about-div-with-background border mt-5'>
      <Container>
        <Row className='about-quote-container mt-5 me-1'>
          <h1>"He has the most, who is most content with the least."</h1>
          <p>― Lord Buddha</p>
        </Row>
      </Container>
    </div>
  )
}

export default AboutUsBanner
