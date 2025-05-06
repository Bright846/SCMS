import React, { useState } from "react";
import Style from "./forgotPwd.module.css";
import { useNavigate } from 'react-router-dom';

const EmailInput = ({ email, setEmail, sendOTP, otpSent }) => (
    <div className={Style.emailSection}>
        <div className={Style.inputGroup}>
            <label htmlFor="email">Registered Email Address:</label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                required
            />
        </div>
        {otpSent && <p className={Style.otpSentMessage} aria-live="polite">OTP sent successfully.</p>}
        <div className={Style.btnContainer}>
            <button type="button" onClick={sendOTP}>Send OTP</button>
        </div>
    </div>
);

const OTPVerification = ({ otp, setOtp, verifyOTP, resendOTP, countdown }) => (
    <div className={Style.otpSection}>
        <div className={Style.inputGroup}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
            />
        </div>
        <div className={Style.btnContainer}>
            <button type="button" onClick={verifyOTP}>Verify OTP</button>
            <button type="button" onClick={resendOTP} disabled={countdown > 0}>
                Resend OTP {countdown > 0 && `(${countdown}s)`}
            </button>
        </div>
    </div>
);

const NewPasswordInput = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, savePassword }) => (
    <div className={Style.passwordSection}>
        <div className={Style.inputGroup}>
            <label htmlFor="newPassword">New Password:</label>
            <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
            />
        </div>
        <div className={Style.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
            />
        </div>
        <div className={Style.btnContainer}>
            <button type="button" onClick={savePassword}>Save Password</button>
        </div>
    </div>
);

const ForgotPwd = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const BASE_URL = "http://localhost:3001";

    const sendOTP = async () => {
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/otp/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message);
                setOtpSent(true);
                startCountdown();
                setStep(2);
            } else {
                alert("Failed to send OTP. Try again.");
            }
        } catch (error) {
            alert("Error sending OTP.");
        }
    };

    const startCountdown = () => {
        setCountdown(30);
        const intervalId = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const resendOTP = () => {
        if (countdown === 0) {
            sendOTP();
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/otp/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message);
                setStep(3);
            } else {
                alert("Invalid OTP. Try again.");
            }
        } catch (error) {
            alert("Error verifying OTP.");
        }
    };

    const savePassword = async () => {
        if (!passwordRegex.test(newPassword)) {
            alert("Password must be at least 8 characters long and include a number and a special character.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/otp/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, newPassword }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }

            const data = await response.json();

            if (data.success) {
                alert(data.message);
                console.log(data);

                if (data.role === "student") {
                    navigate("/student-login");
                } else if (data.role === "faculty") {
                    navigate("/faculty-login");
                } else {
                    navigate("/");
                }
            } else {
                alert("Failed to reset password. Try again.");
            }
        } catch (error) {
            alert("Error resetting password. Please try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className={Style.container}>
            <h2>Reset Your Password</h2>
            {step === 1 && <EmailInput email={email} setEmail={setEmail} sendOTP={sendOTP} otpSent={otpSent} />}
            {step === 2 && <OTPVerification otp={otp} setOtp={setOtp} verifyOTP={verifyOTP} resendOTP={resendOTP} countdown={countdown} />}
            {step === 3 && <NewPasswordInput newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} savePassword={savePassword} />}
        </div>
    );
};

export default ForgotPwd;
