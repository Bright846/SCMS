import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import FacultyDashApp from './facultyDashApp';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <FacultyDashApp />
        </BrowserRouter>
    </StrictMode>
)