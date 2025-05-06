import React, { useState } from "react";
import Style from "../studentLogin/studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";

const BACKEND_URL = "http://localhost:3001";

const AdminLogin = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState('');
    const formContainerRef = React.useRef(null);
    const containerRef = React.useRef(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const toggleVisibility = (formType) => {
        if (formType === 'login') {
            setLoginPasswordVisible(!loginPasswordVisible);
        }
    };

    const clearErrors = () => {
        setLoginError('');
    };

    const handleCancelForgotPassword = () => {
        setShowForgotPassword(false);
    };

    const validateLogin = async () => {
        if (!loginEmail || !loginPassword) {
            setLoginError('Please fill in all fields.');
            return false;
        }

        try {
            // Send the login data to your backend API endpoint
            const response = await fetch(`${BACKEND_URL}/api/login/admin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login was successful on the backend
                resetLoginFiels();
                window.location.href = "../../../../adminDashboard";
            } else {
                // Login failed on the backend
                setLoginError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginError('An error occurred during login.');
        }
    };


    const resetLoginFiels = () => {
        setLoginEmail("");
        setLoginPassword("");
    }

    return (
        <div className={Style.container} ref={containerRef}>
            {/* Conditional rendering based on forgot password state */}
            {showForgotPassword ? (
                <AdminForgotPwd
                    onCancel={handleCancelForgotPassword}
                />
            ) : (
                <div className={Style.formContainer} ref={formContainerRef}>
                    {/* Login Form */}
                    <div className={`${Style.form} ${Style.loginForm}`}>
                        <h2>Admin Login</h2>
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
                        <a href="#" className={Style.forgetPwd}>Forget Password</a>
                        {loginError && <div className={Style.errorMessage}>{loginError}</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
