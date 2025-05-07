import React, { useEffect, useState } from "react";
import axios from "axios";
import Style from './homePage.module.css';

const BACKEND_URL = "https://backend-e0p9.onrender.com";

const HomePage = () => {
    const [studentName, setStudentName] = useState("");
    const [totalComplaints, setTotalComplaints] = useState(0);
    const [complaintsUnderReview, setComplaintsUnderReview] = useState(0);
    const [resolvedComplaints, setResolvedComplaints] = useState(0);
    const [averageResolutionTime, setAverageResolutionTime] = useState("-");
    const [notifications, setNotifications] = useState([]);

    // Fetch student profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/profile`,
                    { withCredentials: true }
                );
                setStudentName(response.data.user.studentName || "Student");
            } catch (error) {
                setStudentName("Student");
            }
        };
        fetchProfile();
    }, []);

    // Fetch complaints on mount
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/get-student-complaints`,
                    { withCredentials: true }
                );
                const complaints = response.data.complaints || [];

                setTotalComplaints(complaints.length);
                setComplaintsUnderReview(
                    complaints.filter(c => c.status === "Pending" || c.status === "Under Review").length
                );
                setResolvedComplaints(
                    complaints.filter(c => c.status === "Resolved").length
                );

                // Calculate average resolution time (in days)
                const resolved = complaints.filter(c => c.status === "Resolved" && c.createdAt && c.resolvedAt);
                if (resolved.length > 0) {
                    const avgMs = resolved.reduce((sum, c) => {
                        const created = new Date(c.createdAt).getTime();
                        const resolvedAt = new Date(c.resolvedAt).getTime();
                        return sum + (resolvedAt - created);
                    }, 0) / resolved.length;
                    setAverageResolutionTime(`${Math.round(avgMs / (1000 * 60 * 60 * 24))} days`);
                } else {
                    setAverageResolutionTime("-");
                }

                setNotifications(
                    complaints
                        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                        .slice(0, 3)
                        .map(c => `Your complaint #${c.complaintId || c._id} is now "${c.status}".`)
                );
            } catch (error) {
                setNotifications(["Failed to load data."]);
            }
        };

        fetchComplaints();
    }, []);

    useEffect(() => {
        const notificationItems = document.querySelectorAll(`.${Style.notificationItem}`);
        notificationItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
        });
    }, [notifications]);

    return (
        <div className={Style.container}>
            <h1 className={Style.welcomeMessage}>Welcome, {studentName}</h1>
            <div className={Style.overviewPanel}>
                <h2>Overview Panel</h2>
                <div className={Style.stats}>
                    <div className={Style.statItem}>
                        <h3>Total Complaints Submitted</h3>
                        <p>{totalComplaints}</p>
                    </div>
                    <div className={Style.statItem}>
                        <h3>Complaints Under Review</h3>
                        <p>{complaintsUnderReview}</p>
                    </div>
                    <div className={Style.statItem}>
                        <h3>Resolved Complaints</h3>
                        <p>{resolvedComplaints}</p>
                    </div>
                    <div className={Style.statItem}>
                        <h3>Average Resolution Time</h3>
                        <p>{averageResolutionTime}</p>
                    </div>
                </div>
                <div className={Style.notifications}>
                    <h2>Notifications</h2>
                    <ul>
                        {notifications.map((notification, index) => (
                            <li key={index} className={`${Style.notificationItem}`}>
                                {notification}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default HomePage;
