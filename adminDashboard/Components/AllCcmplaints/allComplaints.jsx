import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Style from '../../../studDashboard/Components/ComplaintHistory/complaintHistory.module.css';
import { ComplaintContext } from "./ComplaintContext";

const BACKEND_URL = "http://localhost:3001";
const ComplaintHistory = () => {
    const { complaints, setComplaints } = useContext(ComplaintContext);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Fetch complaints from MongoDB
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

    const assignTask = async (complaintId) => {
        try {
            await axios.post(`/api/get-complaints/${complaintId}/assign`, {
                assignedTo: "Faculty ID here" // Replace with actual faculty ID
            });
            alert(`Complaint ${complaintId} assigned successfully`);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to assign task');
            console.error('Error assigning task:', err);
        }
    };
    const filteredComplaints = Array.isArray(complaints) ? complaints.filter(complaint =>
        filterStatus === "All" || complaint.status === filterStatus
    ) : [];

    const statusOptions = ["Pending", "Resolved", "Declined"];

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
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Details</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody id={Style.complaintList}>
                    {filteredComplaints.map(({ _id, createdAt, desc, status, complaintId, complaintDesc }) => (
                        <tr key={_id} className={Style.fadeInRow}>
                            <td>{complaintId}</td>
                            <td>{new Date(createdAt).toLocaleDateString()}</td>
                            <td>{complaintDesc ? complaintDesc.substring(0, 30) + '...' : 'No Description'}</td>
                            <td>
                                <select
                                    value={status}
                                    onChange={(e) => handleStatusChange(_id, e.target.value)}
                                    className={
                                        status === 'Resolved' ? Style.statusResolved :
                                            status === 'Pending' ? Style.statusPending :
                                                Style.statusDeclined
                                    }
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => viewDetails(complaintId)}
                                >
                                    View Details
                                </button>
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => assignTask(_id)}
                                >
                                    Assign
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
                        {/* Add any other fields you want to display */}
                        <button onClick={closeModal}>Close</button>
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
