import React, { useState, useRef } from "react";
import Style from "./studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";
import ForgotPwd from "../Forgot Password/forgotPwd";

const BACKEND_URL = "http://localhost:3001";

const StudentLogin = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState("");

    const [studentName, setStudentName] = useState("");
    const [studentId, setStudentId] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const formContainerRef = useRef(null);
    const containerRef = useRef(null);

    const toggleVisibility = formType => {
        if (formType === "login") {
            setLoginPasswordVisible(!loginPasswordVisible);
        } else {
            setRegisterPasswordVisible(!registerPasswordVisible);
        }
    };

    const showLogin = () => {
        setShowForgotPassword(false);
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = "translateX(0)";
        }
        if (containerRef.current) {
            containerRef.current.style.height = "341px";
        }
        clearErrors();
    };

    const showRegister = () => {
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = "translateX(-50%)";
        }
        if (containerRef.current) {
            containerRef.current.style.height = "430px";
        }
        clearErrors();
    };

    const clearErrors = () => {
        setLoginError("");
        setRegisterError("");
    };

    const resetRegisterFields = () => {
        setStudentName("");
        setStudentId("");
        setStudentEmail("");
        setRegisterPassword("");
    };

    const validateLogin = async e => {
        e.preventDefault();
        setLoginError("");

        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/login/student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });

            const data = await response.json();
            console.log(data);


            if (response.ok) {
                setLoginEmail("");
                setLoginPassword("");
                window.location.href = "../../../../studDashboard";
            } else {
                // Check if the server returned a specific error message
                if (data && data.message) {
                    setLoginError(data.message); // Use the server's message
                } else {
                    setLoginError("Invalid email or password."); // Generic message
                }
            }
        } catch (error) {
            console.log(error);
            setLoginError("Network error, please try again");
        }
    };

    const validateRegister = async e => {
        e.preventDefault();
        setRegisterError("");

        if (!studentName || !studentId || !studentEmail || !registerPassword) {
            setRegisterError("Please fill in all fields.");
            return;
        }

        if (studentId.length !== 7) {
            setRegisterError("Student Id must be 7 digits.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/api/signup/student`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentId: studentId,
                    studentName: studentName,
                    studentEmail: studentEmail,
                    studentPassword: registerPassword,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                resetRegisterFields();
                showLogin();
            } else {
                setRegisterError(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setRegisterError("Network error, please try again");
        }
    };

    const toggleForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    };

    return (
        <div className={Style.container} ref={containerRef}>
            <div className={Style.toggleBtns}>
                <button onClick={showLogin} className={Style.loginRegisterBtn}>
                    Login
                </button>
                <button onClick={showRegister} className={Style.loginRegisterBtn}>
                    Register
                </button>
            </div>
            <div className={Style.formContainer} ref={formContainerRef}>
                {/* LOGIN FORM */}
                <form className={Style.form} onSubmit={validateLogin}>
                    <h2> Student Login </h2>
                    <div className={Style.inputGroup}>
                        <input
                            type="email"
                            value={loginEmail}
                            onChange={e => setLoginEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className={Style.inputGroup}>
                        <input
                            type={loginPasswordVisible ? "text" : "password"}
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                toggleVisibility("login");
                            }}
                            className={Style.visibilityBtn}
                            ariaLabel={
                                loginPasswordVisible ? "Hide password" : "Show password"
                            }
                        >
                            <img
                                src={loginPasswordVisible ? Show : Hide}
                                alt=""
                                className={Style.visibilityIcon}
                            />
                        </button>
                    </div>
                    {loginError && <p className={Style.error}> {loginError} </p>}
                    <button type="submit" className={Style.submitBtn}>
                        Login
                    </button>
                    <p
                        className={`${Style.forgotPwd} ${Style.forgotPwdLink}`}
                        onClick={toggleForgotPassword}
                    >
                        Forgot Password ?
                    </p>
                    {showForgotPassword && (
                        <div
                            className={Style.forgotPwdModal}
                            onClick={() => setShowForgotPassword(false)}
                        >
                            <div
                                className={Style.forgotPwdContent}
                                onClick={e => e.stopPropagation()}
                            >
                                <ForgotPwd onClose={() => setShowForgotPassword(false)} />
                            </div>
                        </div>
                    )}
                </form>
                {/* REGISTER FORM */}
                <form
                    className={`${Style.form} ${Style.registerForm}`}
                    onSubmit={validateRegister}
                >
                    <h2> Student Registration </h2>
                    <div className={Style.inputGroup}>
                        <input
                            type="text"
                            value={studentName}
                            onChange={e => setStudentName(e.target.value)}
                            placeholder="Student Name"
                            required
                        />
                    </div>
                    <div className={Style.inputGroup}>
                        <input
                            type="text"
                            value={studentId}
                            onChange={e => setStudentId(e.target.value)}
                            placeholder="Student ID"
                            maxLength={7}
                            required
                        />
                    </div>
                    <div className={Style.inputGroup}>
                        <input
                            type="email"
                            value={studentEmail}
                            onChange={e => setStudentEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className={Style.inputGroup}>
                        <input
                            type={registerPasswordVisible ? "text" : "password"}
                            value={registerPassword}
                            onChange={e => setRegisterPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <button
                            onClick={e => {
                                e.preventDefault();
                                toggleVisibility("register");
                            }}
                            className={Style.visibilityBtn}
                            ariaLabel={
                                registerPasswordVisible ? "Hide password" : "Show password"
                            }
                        >
                            <img
                                src={registerPasswordVisible ? Show : Hide}
                                alt=""
                                className={Style.visibilityIcon}
                            />
                        </button>
                    </div>
                    {registerError && <p className={Style.error}> {registerError} </p>}
                    <button type="submit" className={Style.submitBtn}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentLogin;
