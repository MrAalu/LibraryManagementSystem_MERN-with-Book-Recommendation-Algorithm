import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './CLIENT/App'
import AdminAPP from './ADMIN/AdminAPP'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <AdminAPP />
  </React.StrictMode>
)
