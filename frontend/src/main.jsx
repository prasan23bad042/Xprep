// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. Import the BrowserRouter component
import { BrowserRouter } from 'react-router-dom' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrap the <App /> component with <BrowserRouter> */}
    <BrowserRouter> 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)