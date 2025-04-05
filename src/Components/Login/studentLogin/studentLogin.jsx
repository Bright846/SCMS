import React, { useState } from "react";
import Style from "./studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";
import ForgotPwd from "../Forgot Password/forgotPwd";
import { useNavigate } from 'react-router-dom';


const StudentLogin = () => {
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const formContainerRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const navigate = useNavigate();

    const toggleVisibility = (formType) => {
        if (formType === 'login') {
            setLoginPasswordVisible(!loginPasswordVisible);
        } else {
            setRegisterPasswordVisible(!registerPasswordVisible);
        }
    };

    const showLogin = () => {
        setShowForgotPassword(false);
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = 'translateX(0)';
            clearErrors();
            if (containerRef.current) {
                containerRef.current.style.height = "341px";
            }
        }
    };

    const showRegister = () => {
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = 'translateX(-50%)';
            clearErrors();
            if (containerRef.current) {
                containerRef.current.style.height = "430px";
            }
        }
    };

    const clearErrors = () => {
        setLoginError('');
        setRegisterError('');
    };

    const validateLogin = () => {
        if (!loginEmail || !loginPassword) {
            setLoginError('Please fill in all fields.');
            return;
        }
        alert("Login successful!");
        setLoginEmail("");
        setLoginPassword("");
        window.location.href = "../../../../public/studDashboard";
    };

    const validateRegister = () => {
        if (!studentName || !studentId || !studentEmail || !registerPassword) {
            setRegisterError('Please fill in all fields.');
            return;
        }
        if (studentId.length !== 7) {
            setRegisterError('Student Id must be 7 digits.');
            return;
        }
        alert("Registration successful!");
        showLogin();
        clearErrors();
        resetFields();
    };

    const limitInput = (input) => {
        const values = input.split(',');
        if (values.length > 7) {
            alert('You can only enter up to 7 values!');
            return values.slice(0, 7).join(',');
        }
        return input;
    };

    // Function to handle sending reset link
    const handleSendResetLink = (email) => {
        // Simulate sending a reset link
        alert(`A password reset link has been sent to ${email}`);
        // After sending, close the forgot password form
        setShowForgotPassword(false);
    };

    // Function to handle showing forgot password
    const forgotPwd = (e) => {
        e.preventDefault();  // Prevent default link behavior
        setShowForgotPassword(true); // Show forgot password component
    };

    // Function to handle canceling forgot password
    const handleCancelForgotPassword = () => {
        setShowForgotPassword(false); // Hide forgot password component
    };

    // Function to reset fields after registration success
    const resetFields = () => {
        setStudentName("");
        setStudentId("");
        setStudentEmail("");
        setRegisterPassword("");
    };

    return (
        <div className={Style.container} ref={containerRef}>
            <div className={Style.toggleBtns}>
                <button onClick={showLogin} className={Style.loginRegisterBtn}>Login</button>
                <button onClick={showRegister} className={Style.loginRegisterBtn}>Register</button>
            </div>

            {/* Conditional rendering based on forgot password state */}
            {showForgotPassword ? (
                <ForgotPwd
                    onSendResetLink={handleSendResetLink}
                    onCancel={handleCancelForgotPassword}
                    showLogin={showLogin} // Pass showLogin as a prop
                />
            ) : (
                <div className={Style.formContainer} ref={formContainerRef}>
                    {/* Login Form */}
                    <div className={`${Style.form} ${Style.loginForm}`}>
                        <h2>Login</h2>
                        <div className={Style.inputGroup}>
                            <input
                                type="email"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type={loginPasswordVisible ? 'text' : 'password'}
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button onClick={() => toggleVisibility('login')} className={Style.visibilityBtn}>
                                <img src={loginPasswordVisible ? Show : Hide} alt="Toggle Password" className={Style.visibilityIcon} />
                            </button>
                        </div>
                        <button type="button" onClick={validateLogin} className={Style.submitBtn}>Login</button>
                        <a href="#" onClick={forgotPwd} className={Style.forgetPwd}>Forget Password</a>
                        {loginError && <div className={Style.errorMessage}>{loginError}</div>}
                    </div>
                    {/* Register Form */}
                    <div className={`${Style.form} ${Style.registerForm}`}>
                        <h2>Register</h2>
                        <div className={Style.inputGroup}>
                            <input
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="Student Name"
                                required
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type="text"
                                value={studentId}
                                onChange={(e) => setStudentId(limitInput(e.target.value))}
                                placeholder="Student ID"
                                maxLength={7}
                                required
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type="email"
                                value={studentEmail}
                                onChange={(e) => setStudentEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type={registerPasswordVisible ? 'text' : 'password'}
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button onClick={() => toggleVisibility('register')} className={Style.visibilityBtn}>
                                <img src={registerPasswordVisible ? Show : Hide} alt="Toggle Password" className={Style.visibilityIcon} />
                            </button>
                        </div>
                        <button type="button" onClick={validateRegister} className={Style.submitBtn}>Register</button>
                        {registerError && <div className={Style.errorMessage}>{registerError}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentLogin;
