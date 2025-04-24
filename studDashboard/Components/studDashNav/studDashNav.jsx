import React from "react";
import Style from './studDashNav.module.css';
import Logo from '../../../src/assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const StudDashNav = () => {
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
                <img src={Logo} id="logo" />
                <span>SCMS</span>
            </div>
            <div id={Style.navigationLinks}>
                <Link to="/studDashboard/">Home</Link>
                <Link to="/studDashboard/Lodge-Complaint">Lodge Complaint</Link>
                <Link to="/studDashboard/Complaint-History">Complaint History</Link>
                <Link to="/studDashboard/Student-Profile-Page">Profile</Link>
                <Link to="/studDashboard/SCMS-Feedback-Form">Feedback</Link>
            </div>

            <button id={Style.logOutBtn} onClick={handleLogout}>Log Out</button>
        </div>

    )
}

export default StudDashNav;