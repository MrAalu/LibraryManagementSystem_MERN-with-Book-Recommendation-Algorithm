import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Modal, Row, Col, Form } from 'react-bootstrap'
import { backend_server } from '../../main'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const ClientDetails = ({ userData }) => {
  const UpdateUser_API_URL = `${backend_server}/api/v1/users`
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

  const handleOnChangePassword = (e) => {
    setInputFieldPassword({
      ...inputFieldPassword,
      [e.target.name]: e.target.value,
    })
  }

  // Updates user Details
  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    const { username, email, phone } = inputFieldNormal

    // Validate email format
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/
    const isValid = emailRegex.test(email)
    // console.log(isValid)
    if (!isValid) {
      toast.error('Invalid Email Format')
    }

    try {
      const response = await axios.patch(UpdateUser_API_URL, {
        username,
        email,
        phone,
      })

      toast.success('Update Success')
    } catch (error) {
      console.log(error.response)
    }
  }

  // Updates password
  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    const { confirm_password, new_password, old_password } = inputFieldPassword

    if (new_password === confirm_password) {
      try {
        const response = await axios.patch(UpdateUser_API_URL, {
          old_password,
          new_password,
        })

        toast.success('Password Changed Successfully')
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error('Password Doesnt Match')
    }
  }

  useEffect(() => {
    setInputFieldNormal({ ...userData })
  }, [])

  return (
    <div className='container my-3'>
      <Toaster />
      {/* Image + Userdetails Box Section */}
      <Row className='align-items-center '>
        {/* Image Section */}
        <Col md={4} className='text-center mx-1 my-2'>
          <div className='profile-details border p-4 shadow'>
            <img
              style={{ width: '100px' }}
              className='img-fluid'
              src='/clientprofile.png'
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
            <h5>Total Books: {userData.totalAcceptedBooks}</h5>
          </div>
        </Col>
      </Row>

      {/* Edit and Change Button */}
      <Row>
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
          <Form onSubmit={(e) => handleUpdateProfile(e)}>
            <Form.Group controlId='username'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                minLength={5}
                placeholder='Enter username'
                name='username'
                onChange={handleOnChangeNormal}
                value={inputFieldNormal.username}
                required
                autoComplete='off'
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                required
                autoComplete='off'
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
                required
                placeholder='Enter phone number'
                name='phone'
                value={inputFieldNormal.phone}
                onChange={handleOnChangeNormal}
                pattern='9\d{9}'
                minLength='10'
                maxLength='10'
              />
            </Form.Group>

            <Form.Group className='text-center my-2'>
              <button type='submit' className='btn btn-success'>
                Update
              </button>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleEditModalClose}>
            Go Back
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
          <Form onSubmit={(e) => handleUpdatePassword(e)}>
            <Form.Group controlId='old password'>
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type='text'
                minLength={5}
                required
                placeholder='Enter old password'
                name='username'
                onChange={handleOnChangePassword}
                value={inputFieldPassword.old_password}
              />
            </Form.Group>

            <Form.Group controlId='new password'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                required
                minLength={5}
                type='email'
                placeholder='Enter new password'
                name='email'
                onChange={handleOnChangePassword}
                value={inputFieldPassword.new_password}
              />
            </Form.Group>

            <Form.Group controlId='confirm password'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                minLength={5}
                type='text'
                placeholder='Re-enter new Password'
                name='phone'
                onChange={handleOnChangePassword}
                value={inputFieldPassword.confirm_password}
              />
            </Form.Group>

            <Form.Group className='text-center my-2'>
              <button type='submit' className='btn btn-success'>
                Update
              </button>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handlePasswordModalClose}>
            Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ClientDetails
