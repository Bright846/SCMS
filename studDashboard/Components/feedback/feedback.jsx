import React, { useState } from "react";
import Style from './feedback.module.css';

const feedback = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        complaintId: "",
        rating: "",
        comments: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback Submitted:", formData);
        alert("Thank you for your feedback!");
        setFormData({
            name: "",
            email: "",
            complaintId: "",
            rating: "",
            comments: "",
        });
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
                            value={formData.name}
                            className={Style.inputBox}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className={Style.formLabel}>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={Style.inputBox}
                            placeholder="Enter your email"
                            required
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
                            <option value="">Select Rating</option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? "Star" : "Stars"}
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