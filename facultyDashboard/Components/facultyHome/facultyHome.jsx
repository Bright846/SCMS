import React, { useState, useEffect } from "react";
import Style from "./facultyHome.module.css";

const complaintSummary = {
    pending: 5,
    inProgress: 3,
    resolved: 12,
    overdue: 1,
};

const priorityComplaints = [
    { id: 123, title: "Lab Equipment Issue", status: "Overdue", details: "Microscope not working in Lab 5." },
    { id: 130, title: "Student Behavior", status: "High Priority", details: "Disruptive behavior in class 3B." },
];

const recentComplaints = [
    { id: 135, title: "Network Issue", status: "Pending", details: "WiFi intermittent in building A." },
    { id: 140, title: "Classroom Cleanliness", status: "In Progress", details: "Trash not emptied in room 201." },
];

const notifications = [
    "New complaint assigned: #145",
    "Complaint #123 deadline approaching",
];

const facultyHome = () => {
    const [expandedPriority, setExpandedPriority] = useState(null);
    const [expandedRecent, setExpandedRecent] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation on mount
        setFadeIn(true);
    }, []);

    const togglePriority = (id) => {
        setExpandedPriority(expandedPriority === id ? null : id);
    };

    const toggleRecent = (id) => {
        setExpandedRecent(expandedRecent === id ? null : id);
    };

    return (
        <div className={`${Style.container} ${fadeIn ? Style.fadeIn : ""}`}>
            <header className={Style.header}>
                <h1>Faculty Dashboard</h1>
                <div className={Style.profile}>
                    <span>Welcome, Dr. Smith</span>
                </div>
            </header>

            <section className={Style.summaryCards}>
                <Card title="Pending" count={complaintSummary.pending} color="#f0ad4e" />
                <Card title="In Progress" count={complaintSummary.inProgress} color="#5bc0de" />
                <Card title="Resolved" count={complaintSummary.resolved} color="#5cb85c" />
                <Card title="Overdue" count={complaintSummary.overdue} color="#d9534f" />
            </section>

            <section className={Style.prioritySection}>
                <h2>Priority Complaints</h2>
                {priorityComplaints.length === 0 ? (
                    <p>No priority complaints</p>
                ) : (
                    <ul className={Style.complaintList}>
                        {priorityComplaints.map(({ id, title, status, details }) => (
                            <li
                                key={id}
                                className={Style.priorityItem}
                                onClick={() => togglePriority(id)}
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter') togglePriority(id); }}
                                aria-expanded={expandedPriority === id}
                                role="button"
                            >
                                <div className={Style.complaintSummary}>
                                    <strong>#{id}</strong> - {title}
                                    <span className={`${Style.status} ${Style[status.replace(/\s+/g, '')]}`}>{status}</span>
                                    <span className={Style.expandIcon}>{expandedPriority === id ? "▲" : "▼"}</span>
                                </div>
                                <div className={`${Style.complaintDetails} ${expandedPriority === id ? Style.expanded : ""}`}>
                                    {details}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={Style.recentSection}>
                <h2>Recent Complaints</h2>
                {recentComplaints.length === 0 ? (
                    <p>No recent complaints</p>
                ) : (
                    <ul className={Style.complaintList}>
                        {recentComplaints.map(({ id, title, status, details }) => (
                            <li
                                key={id}
                                className={Style.recentItem}
                                onClick={() => toggleRecent(id)}
                                tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter') toggleRecent(id); }}
                                aria-expanded={expandedRecent === id}
                                role="button"
                            >
                                <div className={Style.complaintSummary}>
                                    <strong>#{id}</strong> - {title}
                                    <span className={`${Style.status} ${Style[status.replace(/\s+/g, '')]}`}>{status}</span>
                                    <span className={Style.expandIcon}>{expandedRecent === id ? "▲" : "▼"}</span>
                                </div>
                                <div className={`${Style.complaintDetails} ${expandedRecent === id ? Style.expanded : ""}`}>
                                    {details}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={Style.notifications}>
                <h2>Notifications & Alerts</h2>
                {notifications.length === 0 ? (
                    <p>No new notifications</p>
                ) : (
                    <ul>
                        {notifications.map((note, idx) => (
                            <li key={idx} className={Style.notificationItem}>{note}</li>
                        ))}
                    </ul>
                )}
            </section>

            <section className={Style.quickActions}>
                <h2>Quick Actions</h2>
                <div className={Style.actions}>
                    <button onClick={() => alert("Navigate to Submit Complaint")}>Submit Complaint</button>
                    <button onClick={() => alert("Navigate to View All Complaints")}>View All Complaints</button>
                    <button onClick={() => alert("Generate Report")}>Generate Report</button>
                </div>
            </section>
        </div>
    );
};

const Card = ({ title, count, color }) => (
    <div className={Style.card} style={{ borderColor: color }}>
        <h3>{title}</h3>
        <p style={{ color }}>{count}</p>
    </div>
);

export default facultyHome;
