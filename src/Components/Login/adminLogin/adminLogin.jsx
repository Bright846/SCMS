import React, { useState } from "react";
import Style from "../studentLogin/studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";

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

    const showAdminLogin = () => {
        setShowForgotPassword(false);
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = 'translateX(0)';
            clearErrors();
            if (containerRef.current) {
                containerRef.current.style.height = "341px";
            }
        }
    };

    const clearErrors = () => {
        setLoginError('');
    };

    const validateLogin = () => {
        if (!loginEmail || !loginPassword) {
            setLoginError('Please fill in all fields.');
            return false;
        }

        // Add more validation rules as needed
        alert("Login successful!");
        resetLoginFiels();
        window.location.href = "../../../../adminDashboard";
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
