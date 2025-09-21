import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application entry point
 * 
 * Initializes the React application with:
 * - StrictMode for additional development checks
 * - Global CSS styles (Tailwind CSS)
 * - Main App component
 * 
 * The app is mounted to the 'root' element in the HTML document.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
