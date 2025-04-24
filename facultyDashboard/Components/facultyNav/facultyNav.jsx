import React from "react";
import Style from '../../../studDashboard/Components/studDashNav/studDashNav.module.css';
import Logo from '../../../src/assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const facultyNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear all local/session storage (if used)
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to landing page
        navigate('/', { replace: true });
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

export default facultyNav;
