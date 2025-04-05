import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudDashNav from './Components/studDashNav/studDashNav';
import ProfilePage from './Components/ProfilePage/profilePage';
import LodgeComp from './Components/lodgeComp/lodgeComp';
import HomePage from './Components/homePage/homePage';
import Feedback from './Components/feedback/feedback';
import ComplaintHistory from './Components/ComplaintHistory/complaintHistory';


const studDashApp = () => {
    return (
        <>
            <StudDashNav />
            <Routes>
                <Route path="/studDashboard" element={<HomePage />} />
                <Route path="/studDashboard/Student-Profile-Page" element={<ProfilePage />} />
                <Route path="/studDashboard/Lodge-Complaint" element={<LodgeComp />} />
                <Route path="/studDashboard/SCMS-Feedback-Form" element={<Feedback />} />
                <Route path="/studDashboard/Complaint-History" element={<ComplaintHistory />} />
            </Routes>

        </>
    )
}

export default studDashApp;