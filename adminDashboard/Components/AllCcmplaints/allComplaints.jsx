import React, { useState, useContext, useEffect } from "react";
import Style from '../../../studDashboard/Components/ComplaintHistory/complaintHistory.module.css';
import { ComplaintContext } from "./ComplaintContext";

const ComplaintHistory = () => {
    // Access complaints and setter from context
    const { complaints, setComplaints } = useContext(ComplaintContext);

    // Initialize complaints once on mount if empty
    useEffect(() => {
        if (complaints.length === 0) {
            setComplaints([
                { id: 'CMP001', date: 'March 10, 2025', subject: 'Broken Chair in Classroom 101', status: 'Resolved' },
                { id: 'CMP002', date: 'March 15, 2025', subject: 'Noise Disturbance in Library', status: 'Pending' },
                { id: 'CMP003', date: 'March 20, 2025', subject: 'Pest Control Needed in Cafeteria', status: 'Declined' },
                { id: 'CMP004', date: 'March 25, 2025', subject: 'Faulty Projector in Lecture Hall', status: 'Resolved' },
                { id: 'CMP005', date: 'April 01, 2025', subject: 'Air Conditioning Issue in Computer Lab', status: 'Pending' },
                { id: 'CMP006', date: 'April 01, 2025', subject: 'Uncleanliness in Classroom 703', status: 'Pending' },
                { id: 'CMP007', date: 'April 05, 2025', subject: 'IT Lab Computer Not Working', status: 'Declined' },
                { id: 'CMP008', date: 'April 08, 2025', subject: 'Water Leak in Student Lounge', status: 'Pending' },
                { id: 'CMP009', date: 'April 10, 2025', subject: 'Faulty Elevator in Main Building', status: 'Resolved' },
                { id: 'CMP010', date: 'April 12, 2025', subject: 'Insufficient Lighting in Parking Lot', status: 'Pending' },
                // Add more complaints as needed
            ]);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    const [filterStatus, setFilterStatus] = useState("All");

    function viewDetails(complaintId) {
        alert("Viewing details for complaint ID " + complaintId);
        // Replace with modal or navigation logic if needed
    }

    function assignTask(complaintId) {
        alert("Assigning faculty for complaint ID " + complaintId);
    }

    // Handle filter change
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    // Handle status change for a complaint
    const handleStatusChange = (id, newStatus) => {
        setComplaints(prevComplaints =>
            prevComplaints.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            )
        );
        // TODO: Call backend API to persist status change if applicable
    };

    // Filter complaints based on selected status
    const filteredComplaints = complaints.filter(complaint => {
        if (filterStatus === "All") return true;
        return complaint.status === filterStatus;
    });

    // Possible statuses for dropdown
    const statusOptions = ["Pending", "Resolved", "Declined"];

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
                    {filteredComplaints.map(({ id, date, subject, status }) => (
                        <tr key={id} className={Style.fadeInRow}>
                            <td>{id}</td>
                            <td>{date}</td>
                            <td>{subject}</td>
                            <td>
                                <select
                                    aria-label={`Change status for complaint ${id}`}
                                    value={status}
                                    onChange={(e) => handleStatusChange(id, e.target.value)}
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
                                    onClick={() => viewDetails(id)}
                                    aria-label={`View details of complaint ${id}`}
                                >
                                    View Details
                                </button>
                            </td>
                            <td>
                                <button
                                    className={Style.detailsButton}
                                    onClick={() => assignTask(id)}
                                    aria-label={`Assigning faculty for complaint ${id}`}
                                >
                                    Assign
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <footer className={Style.footer}>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default ComplaintHistory;
