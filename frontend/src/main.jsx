import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AppContext from './appContext.jsx';                                           /* 7 */


ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContext>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </AppContext>
)
