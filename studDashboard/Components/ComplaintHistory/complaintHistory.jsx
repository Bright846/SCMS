import React from "react";
import Style from './complaintHistory.module.css';

const ComplaintHistory = () => {

    function viewDetails(complaintId) {
        alert("Viewing details for complaint ID " + complaintId);
        // Here you would typically navigate to a detailed view or open a modal with more information
    }

    const complaints = [
        { id: '001', date: 'March 10, 2025', subject: 'Leaking Faucet', status: 'Resolved' },
        { id: '002', date: 'March 15, 2025', subject: 'Noise Complaint', status: 'Pending' },
        { id: '003', date: 'March 20, 2025', subject: 'Pest Control Request', status: 'Declined' },
        // Add more complaints as necessary
    ];

    return (
        <div className={Style.container}>
            <h1>Complaint History</h1>

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
                    {complaints.map(complaint => (
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

            <footer>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
}

export default ComplaintHistory;
