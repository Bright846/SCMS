import React, { useState } from "react";
import Style from './complaintHistory.module.css';

const ComplaintHistory = () => {
    const [filterStatus, setFilterStatus] = useState("All"); // State to manage the selected filter

    function viewDetails(complaintId) {
        alert("Viewing details for complaint ID " + complaintId);
        // Here you would typically navigate to a detailed view or open a modal with more information
    }

    const complaints = [
        { id: '001', date: 'March 10, 2025', subject: 'Leaking Faucet', status: 'Resolved' },
        { id: '002', date: 'March 15, 2025', subject: 'Noise Complaint', status: 'Pending' },
        { id: '003', date: 'March 20, 2025', subject: 'Pest Control Request', status: 'Declined' },
        { id: '004', date: 'March 25, 2025', subject: 'Broken Chair', status: 'Resolved' },
        { id: '005', date: 'April 01, 2025', subject: 'AC is not working', status: 'Pending' },
        { id: '006', date: 'April 01, 2025', subject: 'Classroom number 703 is not clean', status: 'Pending' }
        // Add more complaints as necessary
    ];

    // Function to handle the filter change
    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    // Filter complaints based on the selected status
    const filteredComplaints = complaints.filter(complaint => {
        if (filterStatus === "All") return true;
        return complaint.status === filterStatus;
    });

    return (
        <div className={Style.container}>
            <h1>Complaint History</h1>

            {/* Filter Dropdown */}
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

            {/* Complaints Table */}
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
                        <tr key={complaint.id}>
                            <td>{complaint.id}</td>
                            <td>{complaint.date}</td>
                            <td>{complaint.subject}</td>
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
                                    onClick={() => viewDetails(complaint.id)}
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Footer */}
            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
}

export default ComplaintHistory;
