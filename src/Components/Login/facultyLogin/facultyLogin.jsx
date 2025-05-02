import React, { useState, useRef } from "react";
import Style from "../studentLogin/studentLogin.module.css";
import Hide from "../../../assets/hide.png";
import Show from "../../../assets/show.png";

const BACKEND_URL = "http://localhost:3001/api";

const FacultyLogin = () => {
    const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
    const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [facultyName, setFacultyName] = useState("");
    const [facultyId, setFacultyId] = useState("");
    const [facultyEmail, setFacultyEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const formContainerRef = useRef(null);
    const containerRef = useRef(null);

    const toggleVisibility = (formType) => {
        if (formType === "login") {
            setLoginPasswordVisible(!loginPasswordVisible);
        } else if (formType === "register") {
            setRegisterPasswordVisible(!registerPasswordVisible);
        }
    };

    const showLogin = () => {
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = "translateX(0)";
            clearErrors();
            if (containerRef.current) {
                containerRef.current.style.height = "341px";
            }
        }
    };

    const showRegister = () => {
        if (formContainerRef.current) {
            formContainerRef.current.style.transform = "translateX(-50%)";
            clearErrors();
            if (containerRef.current) {
                containerRef.current.style.height = "430px";
            }
        }
    };

    const clearErrors = () => {
        setLoginError("");
        setRegisterError("");
    };

    const validateLogin = async (e) => {
        e.preventDefault();

        if (!loginEmail || !loginPassword) {
            setLoginError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/login/faculty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword,
                })
            });

            const data = await response.json();
            console.log("Login Response:", data);

            if (response.ok) {
                setLoginError("Login Successful!");
                window.location.href = "../../../../facultyDashboard";
            } else {
                setLoginError(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            setLoginError("Network error, please try again");
        }
    };

    const validateRegister = async (e) => {
        e.preventDefault();

        if (!facultyName || !facultyId || !facultyEmail || !registerPassword) {
            setRegisterError("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/signup/faculty`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    facultyId: facultyId,
                    facultyName: facultyName,
                    facultyEmail: facultyEmail,
                    facultyPassword: registerPassword,
                }),
            });

            const data = await response.json();
            console.log("Register Response:", data);

            if (response.ok) {
                setRegisterError("Registration successful!");
                showLogin();
            } else {
                setRegisterError(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Register Error:", error);
            setRegisterError("Network error, please try again");
        }
    };

    function limitInput(input) {
        const values = input.value.split(",");
        if (values.length > 7) {
            alert("You can only enter up to 7 values!");
            input.value = values.slice(0, 7).join(",");
        }
    }

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
                {/* Login Form */}
                <div className={`${Style.form} ${Style.loginForm}`}>
                    <h2> Faculty Login </h2>
                    <form onSubmit={validateLogin}>
                        <div className={Style.inputGroup}>
                            <input
                                type="email"
                                id="loginEmail"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type={loginPasswordVisible ? "text" : "password"}
                                id="facultyPassword"
                                placeholder="Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility("login")}
                                className={Style.visibilityBtn}
                            >
                                <img
                                    src={loginPasswordVisible ? Show : Hide}
                                    alt="Toggle Password"
                                    className={Style.visibilityIcon}
                                />
                            </button>
                        </div>
                        <button type="submit" className={Style.submitBtn}>
                            Login
                        </button>
                        <a href="#" className={Style.forgetPwd}>
                            Forget Password
                        </a>
                        <div className={Style.errorMessage}> {loginError} </div>{" "}
                    </form>
                </div>
                {/* Register Form */}
                <div className={`${Style.form} ${Style.registerForm}`}>
                    <h2> Register </h2>{" "}
                    <form onSubmit={validateRegister}>
                        <div className={Style.inputGroup}>
                            <input
                                type="text"
                                id="facultyName"
                                placeholder="Faculty Name"
                                required
                                value={facultyName}
                                onChange={(e) => setFacultyName(e.target.value)}
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type="text"
                                id="facultyId"
                                maxLength="7"
                                placeholder="Faculty ID"
                                required
                                value={facultyId}
                                onInput={(e) => limitInput(e.target)}
                                onChange={(e) => setFacultyId(e.target.value)}
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type="email"
                                id="facultyEmail"
                                placeholder="Email"
                                required
                                value={facultyEmail}
                                onChange={(e) => setFacultyEmail(e.target.value)}
                            />
                        </div>
                        <div className={Style.inputGroup}>
                            <input
                                type={registerPasswordVisible ? "text" : "password"}
                                id="facultyRegisterPassword"
                                placeholder="Password"
                                required
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => toggleVisibility("register")}
                                className={Style.visibilityBtn}
                            >
                                <img
                                    src={registerPasswordVisible ? Show : Hide}
                                    alt="Toggle Password"
                                    className={Style.visibilityIcon}
                                />
                            </button>
                        </div>
                        <button type="submit" className={Style.submitBtn}>
                            Register
                        </button>
                        <div className={Style.errorMessage}> {registerError} </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FacultyLogin;
