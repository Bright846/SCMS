import React, { useState, useEffect } from "react";
import axios from "axios";
import Style from './lodgeComp.module.css';

const BACKEND_URL = "https://backend-e0p9.onrender.com";

const LodgeComp = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        studentId: "",
        studentEmail: "",
        complaintType: "",
        complaintDesc: "",
        incidentDate: "",
        status: "Pending"
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Fetch logged-in user profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/profile`, { withCredentials: true });
                if (response.data.status === "success") {
                    const user = response.data.user;
                    setFormData(prev => ({
                        ...prev,
                        studentName: user.studentName || "",
                        studentId: user.studentId || "",
                        studentEmail: user.studentEmail || ""
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/add-complaint`, formData, {
                withCredentials: true,
            });

            if (response.status === 201) {
                setSubmitSuccess(true);
                setFormData({
                    studentName: formData.studentName,
                    studentId: formData.studentId,
                    studentEmail: formData.studentEmail,
                    complaintType: "",
                    complaintDesc: "",
                    incidentDate: "",
                    status: "Pending"
                });
            }
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Submission failed. Please try again.');
            console.error('Error submitting complaint:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={Style.container}>
            <h2>Complaint Form</h2>

            {submitSuccess && (
                <div className={Style.successMessage}>
                    Complaint submitted successfully!
                </div>
            )}

            {submitError && (
                <div className={Style.errorMessage}>
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className={Style.formGroup}>
                    <label>Student Name:</label>
                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        readOnly // prevent editing if desired
                    />
                </div>

                <div className={Style.formGroup}>
                    <label>Student ID:</label>
                    <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </div>

                <div className={Style.formGroup}>
                    <label>Student Email:</label>
                    <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </div>

                <div className={Style.formGroup}>
                    <label>Complaint Type:</label>
                    <select
                        name="complaintType"
                        value={formData.complaintType}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select</option>
                        <option value="Academic">Academic</option>
                        <option value="Administrative">Administrative</option>
                        <option value="Facilities">Facilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className={Style.formGroup}>
                    <label>Complaint Description:</label>
                    <textarea
                        name="complaintDesc"
                        value={formData.complaintDesc}
                        onChange={handleChange}
                        cols="40"
                        rows="5"
                        required
                    />
                </div>

                <div className={Style.formGroup}>
                    <label>Date of Incident:</label>
                    <input
                        type="date"
                        name="incidentDate"
                        value={formData.incidentDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={Style.submitButton}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            <footer className={Style.footer}>
                &copy; 2025 Smart Complaint Management System. All rights reserved.
            </footer>
        </div>
    );
};

export default LodgeComp;
