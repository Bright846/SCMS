import React, { useEffect, useState } from "react";
import Style from './homePage.module.css';

const HomePage = () => {
    // Sample data for demonstration
    const [studentName] = useState("Adarsh Tiwari");
    const [totalComplaints] = useState(10);
    const [complaintsUnderReview] = useState(3);
    const [resolvedComplaints] = useState(7);
    const [averageResolutionTime] = useState("4 days");

    // Sample notifications
    const [notifications] = useState([
        "Your complaint #123 has been resolved.",
        "New response received for your complaint #124.",
        "Please provide feedback on your recent experience.",
    ]);

    // Animation delay for notifications
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
