import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from './profilePage.module.css';

const BACKEND_URL = "https://backend-e0p9.onrender.com";

const ProfilePage = () => {
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");

    useEffect(() => {
        // Fetch profile data on component mount
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/profile`, {
                withCredentials: true,
            });
            if (response.data.status === "success") {
                const user = response.data.user;
                setStudentName(user.studentName || "");
                setStudentEmail(user.studentEmail || "");
                setStudentId(user.studentId || "");
                setEditName(user.studentName || ""); // Initialize edit form
                setEditEmail(user.studentEmail || "");
            } else {
                console.error("Failed to fetch profile:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Handle unauthorized (e.g., redirect to login)
            if (error.response?.status === 401) {
                window.location.href = "/login";
            }
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditName(studentName); // Reset to original values
        setEditEmail(studentEmail);
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(
                `${BACKEND_URL}/api/profile/update`, // Ensure your backend PUT path is correct
                {
                    studentName: editName,
                    studentEmail: editEmail,
                },
                {
                    withCredentials: true,
                }
            );

            if (response.data.status === "success") {
                // Update local state with new values
                setStudentName(editName);
                setStudentEmail(editEmail);
                setIsEditing(false);
            } else {
                console.error("Failed to update profile:", response.data.message);
                alert("Failed to update profile.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile.");
        }
    };
    return (
        <div className={Style.container}>
            <h1>Personal Information</h1>

            {isEditing ? (
                <div className={Style.personalInfo}>
                    <div className={Style.infoItem}>
                        <strong>Name:</strong>
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                    </div>
                    <div className={Style.infoItem}>
                        <strong>Email:</strong>
                        <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                    </div>
                    <div className={Style.infoItem}>
                        <strong>Student ID:</strong>
                        <span id={Style.studentId}>{studentId}</span>
                    </div>
                </div>
            ) : (
                <div className={Style.personalInfo}>
                    <div className={Style.infoItem}>
                        <strong>Name:</strong>
                        <span id={Style.studentName}>{studentName}</span>
                    </div>
                    <div className={Style.infoItem}>
                        <strong>Email:</strong>
                        <span id={Style.studentEmail}>{studentEmail}</span>
                    </div>
                    <div className={Style.infoItem}>
                        <strong>Student ID:</strong>
                        <span id={Style.studentId}>{studentId}</span>
                    </div>
                </div>
            )}

            <div className={Style.buttonContainer}>
                {isEditing ? (
                    <>
                        <button className={Style.button} onClick={handleSaveClick}>
                            Save
                        </button>
                        <button className={Style.button} onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className={Style.button} onClick={handleEditClick}>
                        Edit Profile
                    </button>
                )}
            </div>

            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default ProfilePage;
