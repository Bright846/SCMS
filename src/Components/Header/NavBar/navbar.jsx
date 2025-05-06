import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faUserTie } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../assets/logo.png";
import StudentLogin from "../../Login/studentLogin/studentLogin";
import AdminLogin from "../../Login/adminLogin/adminLogin";

const NavBar = () => {
    // Track login state (replace with real auth logic if available)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // show COMPLAINTS option
    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null); // Reference to the complaints menu
    const toggleRef = useRef(null); // Reference to the "COMPLAINTS" link

    const visibilityHandler = (e) => {
        e.preventDefault(); // Prevents page refresh
        setIsActive((prev) => !prev); // Toggles visibility
    };

    // Click outside handler for complaints menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setIsActive(false); // Hide the menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Show LOGIN Options
    const [isOn, setIsOn] = useState(false);
    const loginMenuRef = useRef(null); // Reference to the login menu
    const loginToggleRef = useRef(null); // Reference to the "LOGIN" link

    const loginVisibilityHandler = (e) => {
        if (e) e.preventDefault(); // Prevents page refresh
        setIsOn((prev) => !prev); // Toggles visibility
    };

    // Click outside handler for login menu
    useEffect(() => {
        const handleLoginClickOutside = (event) => {
            if (
                loginMenuRef.current &&
                !loginMenuRef.current.contains(event.target) &&
                loginToggleRef.current &&
                !loginToggleRef.current.contains(event.target)
            ) {
                setIsOn(false); // Hide the menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleLoginClickOutside);

        return () => document.removeEventListener("mousedown", handleLoginClickOutside);
    }, []);

    // show STUDENT login
    const [isStudLogin, setIsStudLogin] = useState(false);
    const studLoginMenuRef = useRef(null);
    const studLoginToggleRef = useRef(null);

    const studLoginHandler = (e) => {
        e.preventDefault();
        setIsStudLogin((prev) => !prev);
    };

    useEffect(() => {
        const handleLoginClickOutside = (event) => {
            if (
                studLoginMenuRef.current &&
                !studLoginMenuRef.current.contains(event.target) &&
                studLoginToggleRef.current &&
                !studLoginToggleRef.current.contains(event.target)
            ) {
                setIsStudLogin(false);
            }
        };

        document.addEventListener("mousedown", handleLoginClickOutside);

        return () => document.removeEventListener("mousedown", handleLoginClickOutside);
    }, []);

    // show ADMIN login
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    const adminLoginMenuRef = useRef(null);
    const adminLoginToggleRef = useRef(null);

    const adminLoginHandler = (e) => {
        e.preventDefault();
        setIsAdminLogin((prev) => !prev);
    };

    useEffect(() => {
        const handleLoginClickOutside = (event) => {
            if (
                adminLoginMenuRef.current &&
                !adminLoginMenuRef.current.contains(event.target) &&
                adminLoginToggleRef.current &&
                !adminLoginToggleRef.current.contains(event.target)
            ) {
                setIsAdminLogin(false);
            }
        };

        document.addEventListener("mousedown", handleLoginClickOutside);

        return () => document.removeEventListener("mousedown", handleLoginClickOutside);
    }, []);

    // Show login prompt when trying to access complaints options without login
    const [loginPrompt, setLoginPrompt] = useState(false);

    // Handler for complaint options
    const handleComplaintOptionClick = (e, action) => {
        e.preventDefault();
        if (!isLoggedIn) {
            setLoginPrompt(true);
            setIsOn(true); // Open login options
            setIsActive(false); // Hide complaints menu
        } else {
            // If logged in, handle navigation here (e.g., useNavigate or Link)
            // For now, just close the menu
            setIsActive(false);
            // You can add navigation logic here if needed
        }
    };

    return (
        <>
            <div className={style.container}>
                <div className={style.left}>
                    <img src={logo} alt="Logo" />
                    <p>SCMS</p>
                </div>
                <div className={style.right}>
                    <Link to="/">HOME</Link>
                    <a href="" ref={toggleRef} onClick={visibilityHandler}>
                        COMPLAINTS
                    </a>
                    <Link to="/faq-page">FAQ</Link>
                    <Link to="/about-page">ABOUT</Link>
                    <Link id={style.login} ref={loginToggleRef} onClick={loginVisibilityHandler}>LOGIN</Link>
                </div>
            </div>

            {/* Dropdown Menu for LOGIN */}
            {isOn && (
                <div ref={loginMenuRef} className={style.loginOpt}>
                    {loginPrompt && (
                        <div className={style.loginPrompt}>
                            <span style={{ color: "red", fontWeight: "bold" }}>
                                Please login to access complaint options.
                            </span>
                        </div>
                    )}
                    <a href="#" ref={studLoginToggleRef} onClick={studLoginHandler} ><FontAwesomeIcon icon={faUser} />Student</a>
                    <a href="#" ref={adminLoginToggleRef} onClick={adminLoginHandler}><FontAwesomeIcon icon={faUserTie} />Admin</a>
                </div>
            )}

            {/* Dropdown Menu for COMPLAINTS */}
            {isActive && (
                <div ref={menuRef} className={style.compOpt}>
                    <a href="" onClick={(e) => handleComplaintOptionClick(e, "View Complaint")}>View Complaint</a>
                    <a href="" onClick={(e) => handleComplaintOptionClick(e, "Submit Complaint")}>Submit Complaint</a>
                    <a href="" onClick={(e) => handleComplaintOptionClick(e, "View Status")}>View Status</a>
                </div>
            )}

            {/* Modal for Student Login */}
            {isStudLogin && (
                <div className={style.modal}>
                    <div className={style.loginContent}>
                        <StudentLogin />
                        <button onClick={() => setIsStudLogin(false)} style={{ marginTop: "10px" }}>Close</button>
                    </div>
                </div>
            )}

            {isAdminLogin && (
                <div className={style.modal}>
                    <div className={style.loginContent}>
                        <AdminLogin />
                        <button onClick={() => setIsAdminLogin(false)} style={{ marginTop: "10px" }}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;
