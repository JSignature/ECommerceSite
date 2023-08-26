import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import React from 'react'

import './index.css'
import Products from './components/Products.jsx'
import Cart from './components/Cart.jsx'
import CheckOut from './components/CheckOut.jsx'
import LogIn from './components/LogIn.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
