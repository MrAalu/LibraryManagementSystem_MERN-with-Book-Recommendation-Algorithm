import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'

const ClientDetails = ({ userData }) => {
  const [showEditModal, setShowEditModal] = useState(false)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)

  const handleEditModalClose = () => {
    setShowEditModal(false)
  }

  const handleEditModalShow = () => {
    setShowEditModal(true)
  }

  const handlePasswordModalClose = () => {
    setShowChangePasswordModal(false)
  }

  const handlePasswordModalShow = () => {
    setShowChangePasswordModal(true)
  }

  const [inputFieldPassword, setInputFieldPassword] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  })

  const [inputFieldNormal, setInputFieldNormal] = useState({
    username: '',
    email: '',
    phone: '',
  })

  const handleOnChangeNormal = (e) => {
    setInputFieldNormal({
      ...inputFieldNormal,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    setInputFieldNormal({ ...userData })
  }, [])

  return (
    <div className='container my-3'>
      <Row className='align-items-center '>
        {/* Image Section */}
        <Col md={4} className='text-center mx-1 my-2'>
          <div className='profile-details border p-4 shadow'>
            <img
              style={{ width: '100px' }}
              className='img-fluid'
              src='https://www.svgrepo.com/download/43426/profile.svg'
            />
            <h5 className='mt-3'>{userData.username.toUpperCase()}</h5>
          </div>
        </Col>

        {/* Other user INFO */}
        <Col md={6}>
          <div className='profile-details border p-4 shadow mx-1 my-2'>
            <h5>Email: {userData.email}</h5>
            <hr />

            <h5>Phone: {userData.phone}</h5>
            <hr />
            <h5>Total Books: {userData.totalBooks}</h5>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Edit and Change Button */}
        <div className='profile-buttons text-center'>
          {/* Edit PROFILE btn */}
          <Button
            variant='primary'
            onClick={handleEditModalShow}
            className='mx-2 my-3'
          >
            Edit Profile
          </Button>

          {/* Change PASSWORD btn */}
          <Button
            variant='secondary'
            onClick={handlePasswordModalShow}
            className='mx-2 my-3'
          >
            Change Password
          </Button>
        </div>
      </Row>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter username'
                name='username'
                onChange={handleOnChangeNormal}
                value={inputFieldNormal.username}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                name='email'
                value={inputFieldNormal.email}
                onChange={handleOnChangeNormal}
              />
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter phone number'
                name='phone'
                value={inputFieldNormal.phone}
                onChange={handleOnChangeNormal}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditModalClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleEditModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        show={showChangePasswordModal}
        onHide={handlePasswordModalClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='username'>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter old password'
                name='username'
                onChange={handleOnChangeNormal}
                value={inputFieldPassword.old_password}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter new password'
                name='email'
                onChange={handleOnChangeNormal}
                value={inputFieldPassword.new_password}
              />
            </Form.Group>

            <Form.Group controlId='phone'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='text'
                placeholder='Re-enter new Password'
                name='phone'
                onChange={handleOnChangeNormal}
                value={inputFieldPassword.confirm_password}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handlePasswordModalClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handlePasswordModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ClientDetails

// <div className='container my-3'>
//   <Row className='border'>
//     <img
//       style={{ width: '100px' }}
//       className='img-fluid '
//       src='https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png'
//       alt=''
//     />
//     <h5>Username : {userData.username}</h5>
//     <h5>Email : {userData.email}</h5>
//     <h5>Phone : {userData.phone}</h5>
//     <h5>TotalBooks : {userData.totalBooks}</h5>
//   </Row>
// </div>
