import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Style from './complaintHistory.module.css';
import { ComplaintContext } from "../../../adminDashboard/Components/AllCcmplaints/ComplaintContext";

const BACKEND_URL = "http://localhost:3001";

const ComplaintHistory = () => {
    const [filterStatus, setFilterStatus] = useState("All");
    const { complaints, setComplaints } = useContext(ComplaintContext);
    const [studentId, setStudentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch student profile to get studentId
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/profile`, { withCredentials: true });
                setStudentId(response.data.user.studentId);
            } catch (err) {
                setError("Failed to fetch profile.");
                setLoading(false); // Ensure loading is stopped on error
            }
        };
        fetchProfile();
    }, []);

    // Fetch complaints from backend
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/get-complaints`, { withCredentials: true });
                setComplaints(response.data.complaints || []);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch complaints.");
                setLoading(false);
            }
        };
        if (studentId) fetchComplaints();
    }, [studentId, setComplaints]);

    const handleFilterChange = (event) => setFilterStatus(event.target.value);

    // Filter by studentId and status (type-safe)
    const filteredComplaints = complaints.filter(
        complaint =>
            String(complaint.studentId) === String(studentId) &&
            (filterStatus === "All" || complaint.status === filterStatus)
    );

    function viewDetails(complaintId) {
        alert("Viewing details for complaint ID " + complaintId);
    }

    if (loading) return <div className={Style.loader}>Loading complaints...</div>;
    if (error) return <div className={Style.error}>{error}</div>;

    return (
        <div className={Style.container}>
            <h1>Complaint History</h1>
            <div className={Style.filterContainer}>
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={handleFilterChange}
                    className={Style.filterDropdown}
                >
                    <option value="All">All</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Pending">Pending</option>
                    <option value="Declined">Declined</option>
                </select>
            </div>
            <table className={Style.complaintTable}>
                <thead>
                    <tr>
                        <th>Complaint ID</th>
                        <th>Date Submitted</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody id={Style.complaintList}>
                    {filteredComplaints.map(complaint => (
                        <tr key={complaint.complaintId || complaint._id}>
                            <td>{complaint.complaintId || complaint._id || complaint.id}</td>
                            <td>{complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : ""}</td>
                            <td>{complaint.subject || complaint.complaintType || complaint.desc || "No Subject"}</td>
                            <td className={
                                complaint.status === 'Resolved' ? Style.statusResolved :
                                    complaint.status === 'Pending' ? Style.statusPending :
                                        Style.statusDeclined
                            }>
                                {complaint.status}
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => viewDetails(complaint.complaintId || complaint._id || complaint.id)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default ComplaintHistory;
