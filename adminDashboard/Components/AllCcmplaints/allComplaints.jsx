import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Style from '../../../studDashboard/Components/ComplaintHistory/complaintHistory.module.css';
import { ComplaintContext } from "./ComplaintContext";

const BACKEND_URL = "https://backend-e0p9.onrender.com";

// Robust category priority (handles both "Facility" and "Facilities")
const categoryPriority = {
    Academic: 1,
    Administrative: 2,
    Facility: 3,
    Facilities: 3,
    Other: 4,
};

// Normalize category for sorting
function normalizeCategory(cat) {
    if (!cat) return "Other";
    const c = cat.trim().toLowerCase();
    if (c.startsWith("academ")) return "Academic";
    if (c.startsWith("admin")) return "Administrative";
    if (c.startsWith("facil")) return "Facility";
    return "Other";
}

// Helper to check if a complaint is overdue (pending > 3 days)
function isOverdue(complaint) {
    if (complaint.status !== "Pending") return false;
    const created = new Date(complaint.createdAt);
    const now = new Date();
    return now - created > 3 * 24 * 60 * 60 * 1000;
}

const ComplaintHistory = () => {
    const { complaints, setComplaints } = useContext(ComplaintContext);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Assign modal state
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [assignComplaintId, setAssignComplaintId] = useState(null);
    const [facultyName, setFacultyName] = useState('');
    const [facultyEmail, setFacultyEmail] = useState('');
    const [assignLoading, setAssignLoading] = useState(false);

    // Live overdue calculation
    useEffect(() => {
        const interval = setInterval(() => { }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    // Fetch complaints from backend
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/get-complaints`, { withCredentials: true });
                setComplaints(response.data.complaints);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch complaints');
                setLoading(false);
                console.error('Error fetching complaints:', err);
            }
        };
        fetchComplaints();
    }, [setComplaints]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.post(
                `${BACKEND_URL}/api/update-complaint`,
                { id, status: newStatus },
                { withCredentials: true }
            );
            setComplaints(prev =>
                prev.map(c => c._id === id ? { ...c, status: newStatus } : c)
            );
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update status');
            console.error('Error updating status:', err);
        }
    };

    const viewDetails = async (complaintId) => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/get-complaint/${complaintId}`,
                { withCredentials: true }
            );
            setSelectedComplaint(response.data.complaint);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching complaint details:", error);
            alert("Failed to load complaint details.");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedComplaint(null);
    };

    // Open assign modal
    const openAssignModal = (complaintId) => {
        setAssignComplaintId(complaintId);
        setFacultyName('');
        setFacultyEmail('');
        setAssignModalOpen(true);
    };

    // Handle assign form submit
    const handleAssignSubmit = async (e) => {
        e.preventDefault();
        setAssignLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/assign-complaint`,
                {
                    complaintId: assignComplaintId,
                    facultyName,
                    facultyEmail
                },
                { withCredentials: true }
            );
            alert(response.data.message + `\nEmail: ${response.data.emailStatus}`);
            setAssignModalOpen(false);
            setAssignLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to assign complaint");
        }
    };

    // Status options
    const statusOptions = ["Pending", "Assigned", "Resolved", "Declined", "Overdue"];

    // Process complaints: mark overdue, filter, and sort by category
    const processedComplaints = Array.isArray(complaints)
        ? complaints
            .map(c => ({
                ...c,
                category: normalizeCategory(c.complaintType),
                status: isOverdue(c) ? "Overdue" : c.status,
            }))
            .filter(complaint => filterStatus === "All" || complaint.status === filterStatus)
            .sort((a, b) => {
                // Priority by category
                const catA = categoryPriority[a.complaintType] || 99;
                const catB = categoryPriority[b.complaintType] || 99;
                if (catA !== catB) return catA - catB;
                // Overdue before others
                if (a.status === "Overdue" && b.status !== "Overdue") return -1;
                if (a.status !== "Overdue" && b.status === "Overdue") return 1;
                // Oldest first
                return new Date(a.createdAt) - new Date(b.createdAt);
            })
        : [];

    if (loading) return <div className={Style.loader}>Loading complaints...</div>;
    if (error) return <div className={Style.error}>{error}</div>;

    return (
        <div className={Style.container}>
            <h1>ALL COMPLAINTS</h1>
            <div className={Style.filterContainer}>
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={Style.filterDropdown}
                >
                    <option value="All">All</option>
                    {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            <table className={Style.complaintTable}>
                <thead>
                    <tr>
                        <th>Complaint ID</th>
                        <th>Date Submitted</th>
                        <th>Category</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Assigned To</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody id={Style.complaintList}>
                    {processedComplaints.map((complaint) => (
                        <tr key={complaint._id} className={Style.fadeInRow}>
                            <td>{complaint.complaintId}</td>
                            <td>{new Date(complaint.createdAt).toLocaleDateString()}</td>
                            <td>{complaint.category || "Other"}</td>
                            <td>{complaint.complaintDesc ? complaint.complaintDesc.substring(0, 30) + '...' : 'No Description'}</td>
                            <td>
                                <select
                                    value={complaint.status}
                                    onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                                    className={
                                        complaint.status === 'Resolved' ? Style.statusResolved :
                                            complaint.status === 'Overdue' ? Style.statusOverdue :
                                                complaint.status === 'Pending' ? Style.statusPending :
                                                    Style.statusDeclined
                                    }
                                    disabled={complaint.status === "Overdue"}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => viewDetails(complaint.complaintId)}
                                >
                                    View Details
                                </button>
                            </td>
                            <td>
                                {complaint.assignedTo ? (
                                    <div>
                                        <span style={{ color: 'green', fontWeight: 'bold' }}>Assigned</span>
                                        <br />
                                        <span>{complaint.assignedFacultyName}</span>
                                        <br />
                                        <span>{complaint.assignedTo}</span>
                                    </div>
                                ) : (
                                    <span style={{ color: 'gray' }}>Not Assigned</span>
                                )}
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => openAssignModal(complaint.complaintId)}
                                    disabled={!!complaint.assignedTo}
                                    style={complaint.assignedTo ? { backgroundColor: "#bbb", cursor: "not-allowed" } : {}}
                                >
                                    {complaint.assignedTo ? "Assigned" : "Assign"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for complaint details */}
            {showModal && selectedComplaint && (
                <div className={Style.modalBackdrop} onClick={closeModal}>
                    <div className={Style.modalContent} onClick={e => e.stopPropagation()}>
                        <h2>Complaint Details</h2>
                        <p><strong>ID:</strong> {selectedComplaint.complaintId}</p>
                        <p><strong>Description:</strong> {selectedComplaint.complaintDesc}</p>
                        <p><strong>Status:</strong> {selectedComplaint.status}</p>
                        <p><strong>Created At:</strong> {new Date(selectedComplaint.createdAt).toLocaleString()}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Modal for assigning complaint */}
            {assignModalOpen && (
                <div className={Style.modalBackdrop} onClick={() => setAssignModalOpen(false)}>
                    <div className={Style.modalContent} onClick={e => e.stopPropagation()}>
                        <h2>Assign Complaint</h2>
                        <form onSubmit={handleAssignSubmit}>
                            <label>
                                Faculty Name:
                                <input
                                    type="text"
                                    value={facultyName}
                                    onChange={e => setFacultyName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Faculty Email:
                                <input
                                    type="email"
                                    value={facultyEmail}
                                    onChange={e => setFacultyEmail(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" disabled={assignLoading}>
                                {assignLoading ? "Assigning..." : "Assign"}
                            </button>
                            <button type="button" onClick={() => setAssignModalOpen(false)}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <footer className={Style.footer}>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default ComplaintHistory;
