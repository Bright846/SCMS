import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FacultyNav from './Components/facultyNav/facultyNav';
import FacultyHome from './Components/facultyHome/facultyHome';

const facultyDashApp = () => {
    return (
        <>
            <FacultyNav />
            <Routes>
                <Route path="/facultyDashboard" element={<FacultyHome />} />
            </Routes>
        </>
    )

}

export default facultyDashApp;