import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './CLIENT/App'
import AdminAPP from './ADMIN/AdminAPP'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

export const backend_server = `http://localhost:5000`

export const checkToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminAPP />
  </React.StrictMode>
)
