import React, { useState } from "react";
import Style from "./forgotPwd.module.css";

const ForgotPwd = ({ showLogin }) => { // Receive showLogin as a prop
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [otpSent, setOtpSent] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [countdownInterval, setCountdownInterval] = useState(null);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const sendOTP = () => {
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }
        // Simulate sending OTP
        alert(`OTP sent to ${email}`);
        setOtpSent(true);
        startCountdown();
        setStep(2); // Move to OTP step
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
        setCountdownInterval(intervalId);
    };

    const resendOTP = () => {
        if (countdown === 0) {
            sendOTP();
        } else {
            alert(`You can resend OTP in ${countdown} seconds.`);
        }
    };

    const verifyOTP = () => {
        if (otp.length !== 6 || isNaN(otp)) {
            alert("Invalid OTP");
            return;
        }
        // Simulate OTP verification success
        alert("OTP verified successfully!");
        clearInterval(countdownInterval); // Clear countdown on success
        setStep(3); // Move to New Password step
    };

    const savePassword = () => {
        if (!passwordRegex.test(newPassword)) {
            alert("Password must be at least 8 characters with a number and special character");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Simulate successful password reset
        alert("Password reset successfully!");

        // Reset fields and show login form after a delay
        setTimeout(() => {
            resetFields();
            showLogin(); // Call the showLogin function to display the login form
        }, 200);
    };

    const resetFields = () => {
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setOtpSent(false);
        setStep(1);
    };

    return (
        <div className={Style.container}>
            <h2>Reset Your Password</h2>

            {/* Email Input Section */}
            {step === 1 && (
                <div className={Style.emailSection}>
                    <div className={Style.inputGroup}>
                        <label>Registered Email Address:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Email Address"
                            required
                        />
                    </div>
                    {otpSent && <p className={Style.otpSentMessage}>OTP sent successfully.</p>}
                    <div className={Style.btnContainer}>
                        <button onClick={sendOTP}>Send OTP</button>
                    </div>
                </div>
            )}

            {/* OTP Verification Section */}
            {step === 2 && (
                <div className={Style.otpSection}>
                    <div className={Style.inputGroup}>
                        <label>Enter OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                        />
                    </div>
                    <div className={Style.btnContainer}>
                        <button onClick={verifyOTP}>Verify OTP</button>
                        <button onClick={resendOTP} disabled={countdown > 0}>
                            Resend OTP {countdown > 0 && `(${countdown})`}
                        </button>
                    </div>
                </div>
            )}

            {/* New Password Section */}
            {step === 3 && (
                <div className={Style.passwordSection}>
                    <div className={Style.inputGroup}>
                        <label>New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className={Style.inputGroup}>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                    <div className={Style.btnContainer}>
                        <button onClick={savePassword}>Save Password</button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ForgotPwd;
