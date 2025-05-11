import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ComplaintProvider } from "../adminDashboard/Components/AllCcmplaints/ComplaintContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ComplaintProvider>
        <App />
      </ComplaintProvider>
    </BrowserRouter>
  </StrictMode>
)
