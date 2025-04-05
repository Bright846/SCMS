import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AdminDashApp from './adminDashApp';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter basename='/public'>
            <AdminDashApp />
        </BrowserRouter>
    </StrictMode>
)