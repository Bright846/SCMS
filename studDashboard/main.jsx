import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import StudDashApp from './studDashApp';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <StudDashApp />
        </BrowserRouter>
    </StrictMode>
)