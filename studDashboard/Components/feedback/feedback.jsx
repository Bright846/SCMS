import React, { useState, useEffect } from "react";
import Style from './feedback.module.css';
import axios from "axios";
const BACKEND_URL = "https://backend-e0p9.onrender.com";

const feedback = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        complaintId: "",
        rating: "",
        comments: "",
    });
    const [studentName, setStudentName] = useState("");
    const [studentEmail, setStudentEmail] = useState("");

    useEffect(() => {
        // Fetch profile data on component mount
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/profile`, {
                withCredentials: true,
            });
            if (response.data.status === "success") {
                const user = response.data.user;
                setStudentName(user.studentName || "");
                setStudentEmail(user.studentEmail || "");
            } else {
                console.error("Failed to fetch profile:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            // Handle unauthorized (e.g., redirect to login)
            if (error.response?.status === 401) {
                window.location.href = "/";
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send
        const feedbackData = {
            name: studentName,
            email: studentEmail,
            complaintId: formData.complaintId,
            rating: Number(formData.rating),
            comments: formData.comments,
        };

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/add-feedback`,
                feedbackData,
                { withCredentials: true }
            );

            if (response.data.status === "success") {
                alert("Thank you for your feedback!");
                setFormData({
                    complaintId: "",
                    rating: "",
                    comments: "",
                });
            } else {
                alert("Failed to submit feedback: " + response.data.message);
            }
        } catch (error) {
            alert("Error submitting feedback: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <>

            <div className={Style.feedbackContainer}>
                <h2 className={Style.title}>
                    SCMS - Feedback Form
                </h2>
                <p className={Style.desc}>
                    Your feedback helps us improve our services.
                </p>
                <form onSubmit={handleSubmit} className={Style.feedbackForm}>
                    {/* Name */}
                    <div>
                        <label className={Style.formLabel} >Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={studentName}
                            className={Style.inputBox}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            readOnly
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className={Style.formLabel}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={studentEmail}
                            onChange={handleChange}
                            className={Style.inputBox}
                            placeholder="Enter your email"
                            readOnly
                        />
                    </div>

                    {/* Complaint ID */}
                    <div>
                        <label className={Style.formLabel}>Complaint Reference ID</label>
                        <input
                            type="text"
                            name="complaintId"
                            value={formData.complaintId}
                            onChange={handleChange}
                            className={Style.inputBox}
                            placeholder="Enter Complaint ID"
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div>
                        <label className={Style.formLabel}>Rating (1-5)</label>
                        <select
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className={Style.selectOpts}
                            required
                        >
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Comments */}
                    <div>
                        <label className={Style.formLabel}>Comments</label>
                        <textarea
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            className={Style.commentBox}
                            rows="4"
                            placeholder="Write your feedback..."
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={Style.submitBtn}
                    >
                        Submit Feedback
                    </button>
                </form>
            </div>
        </>
    )
}

export default feedback;