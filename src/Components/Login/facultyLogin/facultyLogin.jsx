import React, { useState } from "react";
import Style from "../studentLogin/studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";

const facultyLogin = () => {
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [facultyId, setFacultyId] = useState('');


    const formContainerRef = React.useRef(null);
    const containerRef = React.useRef(null);

    const toggleVisibility = (formType) => {
        if (formType === 'login') {
            setLoginPasswordVisible(!loginPasswordVisible);
        } else if (formType === 'register') {
            setRegisterPasswordVisible(!registerPasswordVisible);
        }
    };

    const showLogin = () => {
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
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('facultyPassword').value.trim();

        if (!email || !password) {
            setLoginError('Please fill in all fields.');
            return false;
        }

        // Add more validation rules as needed
        alert("Login successful!");
    };

    const validateRegister = () => {
        const username = document.getElementById('facultyName').value.trim();
        const facultyId = document.getElementById('facultyId').value.trim();
        const email = document.getElementById('facultyEmail').value.trim();
        const password = document.getElementById('facultyRegisterPassword').value.trim();

        if (!username || !facultyId || !email || !password) {
            setRegisterError('Please fill in all fields.');
            return false;
        }

        // Add more validation rules as needed
        alert("Registration successful!");
    };

    function limitInput(input) {
        const values = input.split(',');
        if (values.length > 7) {
            alert('You can only enter up to 7 values!');
            input.value = values.slice(0, 7).join(',');
        }
    }

    return (<div className={Style.container} ref={containerRef}>
        <div className={Style.toggleBtns}>
            <button onClick={showLogin} className={Style.loginRegisterBtn}>Login</button>
            <button onClick={showRegister} className={Style.loginRegisterBtn}>Register</button>
        </div>

        <div className={Style.formContainer} ref={formContainerRef}>
            {/* Login Form */}
            <div className={`${Style.form} ${Style.loginForm}`}>
                <h2>Login</h2>
                <div className={Style.inputGroup}>
                    <input type="email" id="loginEmail" placeholder="Email" required />
                </div>
                <div className={Style.inputGroup}>
                    <input
                        type={loginPasswordVisible ? 'text' : 'password'}
                        id="facultyPassword"
                        placeholder="Password"
                        required
                    />
                    <button
                        onClick={() => toggleVisibility('login')}
                        className={Style.visibilityBtn}
                    >
                        <img
                            src={loginPasswordVisible ? Show : Hide}
                            alt="Toggle Password"
                            className={Style.visibilityIcon}
                        />
                    </button>
                </div>
                <button type="button" onClick={validateLogin} className={Style.submitBtn}>
                    Login
                </button>

                <a href="" className={Style.forgetPwd}>Forget Password</a>
                <div className={Style.errorMessage}>{loginError}</div>
            </div>

            {/* Register Form */}
            <div className={`${Style.form} ${Style.registerForm}`}>
                <h2>Register</h2>
                <div className={Style.inputGroup}>
                    <input type="text" id="facultyName" placeholder="Faculty Name" required />
                </div>
                <div className={Style.inputGroup}>
                    <input type="text" id="facultyId" maxLength="7" value={facultyId}
                        onChange={(e) => setFacultyId(limitInput(e.target.value))} placeholder="Faculty ID" required />

                </div>
                <div className={Style.inputGroup}>
                    <input type="email" id="facultyEmail" placeholder="Email" required />
                </div>
                <div className={Style.inputGroup}>
                    <input
                        type={registerPasswordVisible ? 'text' : 'password'}
                        id="facultyRegisterPassword"
                        placeholder="Password"
                        required
                    />
                    <button
                        onClick={() => toggleVisibility('register')}
                        className={Style.visibilityBtn}
                    >
                        <img
                            src={registerPasswordVisible ? Show : Hide}
                            alt="Toggle Password"
                            className={Style.visibilityIcon}
                        />
                    </button>
                </div>
                <button type="button" onClick={validateRegister} className={Style.submitBtn}>
                    Register
                </button>
                <div className={Style.errorMessage}>{registerError}</div>
            </div>
        </div>
    </div>
    );
};

export default facultyLogin;
