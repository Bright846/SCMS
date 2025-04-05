import React from "react";
import Style from './studDashNav.module.css';
import Logo from '../../../src/assets/logo.png';
import { Link } from "react-router-dom";

const StudDashNav = () => {

    return (

        <div className={Style.navigationBar}>
            <div className={Style.logoContainer}>
                <img src={Logo} id="logo" />
                <span>SCMS</span>
            </div>
            <div id={Style.navigationLinks}>
                <Link to="/studDashboard/">Home</Link>
                <Link to="/studDashboard/Lodge-Complaint">Complaints</Link>
                <Link to="/studDashboard/Complaint-History">Report</Link>
                <Link to="/studDashboard/Student-Profile-Page">Profile</Link>
                <Link to="/studDashboard/SCMS-Feedback-Form">Feedback</Link>
            </div>

            <button id={Style.logOutBtn}>Log Out</button>
        </div>

    )
}

export default StudDashNav;