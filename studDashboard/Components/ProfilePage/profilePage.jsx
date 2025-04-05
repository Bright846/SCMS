import React from "react";
import Style from './profilePage.module.css';

const ProfilePage = () => {

    function editProfile() {
        alert("Edit Profile functionality will be implemented here.");
    }

    function changePassword() {
        alert("Change Password functionality will be implemented here.");
    }

    return (
        <div className={Style.container}>
            <h1>Personal Information</h1>

            <div className={Style.personalInfo}>
                <div className={Style.infoItem}>
                    <strong>Name:</strong>
                    <span id={Style.studentName}>John Doe</span>
                </div>
                <div className={Style.infoItem}>
                    <strong>Email:</strong>
                    <span id={Style.studentEmail}>john.doe@example.com</span>
                </div>
                <div className={Style.infoItem}>
                    <strong>Student ID:</strong>
                    <span id={Style.studentId}>123456789</span>
                </div>
            </div>

            <div className={Style.buttonContainer}>
                <button
                    className={Style.button}
                    onClick={editProfile} // Pass function reference
                >
                    Edit Profile
                </button>
                <button
                    className={Style.button}
                    onClick={changePassword} // Pass function reference
                >
                    Change Password
                </button>
            </div>

            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
}

export default ProfilePage;
