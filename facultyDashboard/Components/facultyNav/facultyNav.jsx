import React from "react";
import Style from '../../../studDashboard/Components/studDashNav/studDashNav.module.css';
import Logo from '../../../src/assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const FacultyNav = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call backend logout route to destroy session
            const response = await fetch('http://localhost:3001/api/logout', {
                method: 'POST',
                credentials: 'include', // Important to send cookies/session
            });

            if (response.ok) {
                // Clear local/session storage
                localStorage.clear();
                sessionStorage.clear();

                // Redirect to landing page
                navigate('/', { replace: true });
            } else {
                console.error('Logout failed on server');
                // Optionally show error to user
            }
        } catch (error) {
            console.error('Logout error:', error);
            // Optionally show error to user
        }
    };

    return (
        <div className={Style.navigationBar}>
            <div className={Style.logoContainer}>
                <img src={Logo} id="logo" alt="SCMS Logo" />
                <span>SCMS</span>
            </div>
            <div id={Style.navigationLinks}>
                <Link to="/facultyDashboard">Home</Link>
                <Link to="/facultyDashboard/All-Tasks">Tasks</Link>
                <Link to="/facultyDashboard/Faculty-Profile-Page">Profile</Link>
                <Link to="/facultyDashboard/SCMS-Feedback-Form">Feedback</Link>
            </div>

            <button id={Style.logOutBtn} onClick={handleLogout}>Log Out</button>
        </div>
    );
}

export default FacultyNav;
