import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from "./adminHome.module.css";

const BACKEND_URL = "http://localhost:3001";

const AdminHome = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/get-complaints`, {
                    withCredentials: true, // send cookies for session auth
                });
                setComplaints(response.data.complaints);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch complaints");
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    // Calculate stats dynamically
    const totalComplaints = complaints.length;
    const resolvedCount = complaints.filter(c => c.status === "Resolved").length;
    const pendingCount = complaints.filter(c => c.status === "Pending").length;

    // Get recent complaints (e.g., last 3)
    const recentComplaints = complaints
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    // Helper to format relative time
    const formatTimeAgo = (dateStr) => {
        const diffMs = Date.now() - new Date(dateStr).getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHrs < 1) return "Less than an hour ago";
        if (diffHrs < 24) return `${diffHrs} hr${diffHrs > 1 ? "s" : ""} ago`;
        return "Yesterday";
    };

    if (loading) return <div>Loading complaints...</div>;
    if (error) return <div>Error: {error}</div>;

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
            </div>

            <div className={Style.dashboardSections}>
                <div className={`${Style.section} ${Style.recentComplaints}`}>
                    <h2>Recent Complaints</h2>
                    <ul>
                        {recentComplaints.length === 0 ? (
                            <li>No recent complaints</li>
                        ) : (
                            recentComplaints.map(c => (
                                <li key={c.complaintId}>
                                    {c.complaintType || c.complaintDesc || "No Subject"} <span>{formatTimeAgo(c.createdAt)}</span>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
            <footer className={Style.footer}>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default AdminHome;
