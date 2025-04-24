import React, { useContext } from "react";
import Style from "./adminHome.module.css";
import { ComplaintContext } from "../AllCcmplaints/ComplaintContext";

const AdminHome = () => {
    const { complaints } = useContext(ComplaintContext);

    // Calculate stats dynamically
    const totalComplaints = complaints.length;
    const resolvedCount = complaints.filter(c => c.status === "Resolved").length;
    const pendingCount = complaints.filter(c => c.status === "Pending").length;
    // Assuming messages come from another context or API, hardcoded here for now
    const messagesCount = 8;

    // Get recent complaints (e.g., last 3)
    const recentComplaints = complaints
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    // Helper to format relative time (simple example)
    const formatTimeAgo = (dateStr) => {
        const diffMs = Date.now() - new Date(dateStr).getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHrs < 1) return "Less than an hour ago";
        if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? "s" : ""} ago`;
        return "Yesterday";
    };

    return (
        <div className={Style.adminDashboard}>
            <h1 className={Style.dashboardTitle}>Admin Dashboard - Complaint Management</h1>

            <div className={Style.dashboardCards}>
                <div className={Style.card}>
                    <h2>Total Complaints</h2>
                    <p className={`${Style.cardValue} ${Style.blue}`}>{totalComplaints}</p>
                </div>
                <div className={Style.card}>
                    <h2>Resolved</h2>
                    <p className={`${Style.cardValue} ${Style.green}`}>{resolvedCount}</p>
                </div>
                <div className={Style.card}>
                    <h2>Pending</h2>
                    <p className={`${Style.cardValue} ${Style.yellow}`}>{pendingCount}</p>
                </div>
                <div className={Style.card}>
                    <h2>Messages</h2>
                    <p className={`${Style.cardValue} ${Style.purple}`}>{messagesCount}</p>
                </div>
            </div>

            <div className={Style.dashboardSections}>
                <div className={`${Style.section} ${Style.recentComplaints}`}>
                    <h2>Recent Complaints</h2>
                    <ul>
                        {recentComplaints.length === 0 ? (
                            <li>No recent complaints</li>
                        ) : (
                            recentComplaints.map(c => (
                                <li key={c.id}>
                                    {c.subject} <span>{formatTimeAgo(c.date)}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className={`${Style.section} ${Style.quickActions}`}>
                    <h2>Quick Actions</h2>
                    <div className={Style.actionButtons}>
                        <button className={Style.blue}>Assign Complaint</button>
                        <button className={Style.green}>Resolve Issue</button>
                        <button className={Style.yellow}>Send Message</button>
                        <button className={Style.red}>Generate Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
