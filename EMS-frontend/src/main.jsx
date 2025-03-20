import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import EmployeeContextProvider from './context/EmployeeContext.jsx'
import DarkModeProvider from './context/DarkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <DarkModeProvider>
    <AdminContextProvider>
    <EmployeeContextProvider>
    <App />
    </EmployeeContextProvider>
   </AdminContextProvider>
    </DarkModeProvider>
    </BrowserRouter>
  </StrictMode>,
)
