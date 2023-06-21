import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import './adminpanel.css'
import { Link } from 'react-router-dom'
import { adminpanelData } from './adminpanelData'

const AdminPanel = () => {
  return (
    <div className='container mt-5 adminpanel-container'>
      <Row>
        {adminpanelData.map((panel_items) => {
          const { id, title, url } = panel_items
          return (
            <div className='col-xs-12 col-md-4 card-admin-main' key={id}>
              <Card className='card-admin my-3 mx-3'>
                <Link to={url}>
                  <Card.Body>
                    <span className='card-admin-icon'>
                      {panel_items.panel_icon}
                    </span>
                    <Card.Title className='card-admin-title'>
                      <h3 className='h3 p-3'>{title}</h3>
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          )
        })}
      </Row>
    </div>
  )
}

export default AdminPanel

// manage books (CRUD books)
// Users (user details + issued books + issue new Books)
// Issued Books (issued books + username)
// book request (user's request for issueing books)
// not returned books
