import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import style from "./navbar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGraduationCap, faUserTie } from '@fortawesome/free-solid-svg-icons';
import logo from "../../../assets/logo.png";
import StudentLogin from "../../Login/studentLogin/studentLogin";
import FacultyLogin from "../../Login/facultyLogin/facultyLogin";

const NavBar = () => {

    // show COMPLAINTS option

    const [isActive, setIsActive] = useState(false);
    const menuRef = useRef(null); // Reference to the complaints menu
    const toggleRef = useRef(null); // Reference to the "COMPLAINTS" link

    const visibilityHandler = (e) => {
        e.preventDefault(); // Prevents page refresh
        setIsActive((prev) => !prev); // Toggles visibility
        loginVisibilityHandler();
    };

    // Click outside handler
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
        e.preventDefault(); // Prevents page refresh
        setIsOn((prev) => !prev); // Toggles visibility
    };

    // Click outside handler
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
    const studLoginMenuRef = useRef(null); // Reference to the login menu
    const studLoginToggleRef = useRef(null); // Reference to the "LOGIN" link

    const studLoginHandler = (e) => {
        e.preventDefault(); // Prevents page refresh
        setIsStudLogin((prev) => !prev); // Toggles visibility
    };

    // Click outside handler
    useEffect(() => {
        const handleLoginClickOutside = (event) => {
            if (
                studLoginMenuRef.current &&
                !studLoginMenuRef.current.contains(event.target) &&
                studLoginToggleRef.current &&
                !studLoginToggleRef.current.contains(event.target)
            ) {
                setIsStudLogin(false); // Hide the menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleLoginClickOutside);

        return () => document.removeEventListener("mousedown", handleLoginClickOutside);
    }, []);

    // show FACULTY login

    const [isFacultyLogin, setIsFacultyLogin] = useState(false);
    const facultyLoginMenuRef = useRef(null); // Reference to the login menu
    const facultyLoginToggleRef = useRef(null); // Reference to the "LOGIN" link

    const facultyLoginHandler = (e) => {
        e.preventDefault(); // Prevents page refresh
        setIsFacultyLogin((prev) => !prev); // Toggles visibility
    };

    // Click outside handler
    useEffect(() => {
        const handleLoginClickOutside = (event) => {
            if (
                facultyLoginMenuRef.current &&
                !facultyLoginMenuRef.current.contains(event.target) &&
                facultyLoginToggleRef.current &&
                !facultyLoginToggleRef.current.contains(event.target)
            ) {
                setIsFacultyLogin(false); // Hide the menu if clicked outside
            }
        };

        document.addEventListener("mousedown", handleLoginClickOutside);

        return () => document.removeEventListener("mousedown", handleLoginClickOutside);
    }, []);
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

            {/* Dropdown Menu */}
            {isOn && (
                <div ref={loginMenuRef} className={style.loginOpt}>
                    <a href="#" ref={studLoginToggleRef} onClick={studLoginHandler} ><FontAwesomeIcon icon={faUser} />Student</a>
                    <a href="#" ref={facultyLoginToggleRef} onClick={facultyLoginHandler} ><FontAwesomeIcon icon={faGraduationCap} />Faculty</a>
                    <a href="#"><FontAwesomeIcon icon={faUserTie} />Admin</a>
                </div>
            )}
            {isActive && (
                <div ref={menuRef} className={style.compOpt}>
                    <a href="" onClick={`${visibilityHandler} ${loginVisibilityHandler}`} ref={loginToggleRef}>View Complaint</a>
                    <a href="" onClick={visibilityHandler}>Submit Complaint</a>
                    <a href="" onClick={visibilityHandler}>View Status</a>
                </div>
            )}

            {/* Modal for Student Login */}
            {isStudLogin && (
                <div className={style.modal}>
                    <div className={style.loginContent}>
                        <StudentLogin />
                        {/* Close button */}
                        <button onClick={() => setIsStudLogin(false)} style={{ marginTop: "10px" }}>Close</button>
                    </div>
                </div>
            )}

            {isFacultyLogin && (
                <div className={style.modal}>
                    <div className={style.loginContent}>
                        <FacultyLogin />
                        <button onClick={() => setIsFacultyLogin(false)} style={{ marginTop: "10px" }}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NavBar;

