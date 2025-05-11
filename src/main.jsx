import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ComplaintProvider } from './ComplaintContext' // Adjust path as needed

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ComplaintProvider>
        <App />
      </ComplaintProvider>
    </BrowserRouter>
  </StrictMode>
)
