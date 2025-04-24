import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ComplaintProvider } from './Components/AllCcmplaints/ComplaintContext';
import AdminDashNav from './Components/adminDashNav/adminDashNav';
import AdminHome from './Components/adminHomePage/adminHome';
import AllComplaint from './Components/AllCcmplaints/allComplaints';
import ComplaintReport from './Components/complaintReport/complaintReport';

const adminDashApp = () => {
    return (
        <>
            <AdminDashNav />
            <ComplaintProvider>
                <Routes>
                    <Route path="/adminDashboard" element={<AdminHome />} />
                    <Route path="/adminDashboard/View-Complaint" element={<AllComplaint />} />
                    <Route path="/adminDashboard/Complaint-Report" element={<ComplaintReport />} />
                </Routes>
            </ComplaintProvider>
        </>
    )

}

export default adminDashApp;