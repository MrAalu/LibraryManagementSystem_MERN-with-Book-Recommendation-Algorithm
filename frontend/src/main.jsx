import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
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
    <App></App>
  </React.StrictMode>
)
