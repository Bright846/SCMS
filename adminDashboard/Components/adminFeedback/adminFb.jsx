import React, { useState } from "react";
import Style from "./adminFb.module.css";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001";
const adminFb = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        navigation: '3',
        performance: '3',
        features: '3',
        support: '3',
        responsiveness: '3',
        security: '3',
        reliability: '3',
        documentation: '3',
        integration: '3',
        overall: '3',
        like_most: '',
        challenges: '',
        improvements: '',
        useful: '',
        other_comments: '',
        contact_permission: 'no'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        try {
            // Transform data to match backend schema
            const payload = {
                name: formData.name,
                email: formData.email,
                department: formData.department,
                ratings: {
                    navigation: parseInt(formData.navigation),
                    performance: parseInt(formData.performance),
                    features: parseInt(formData.features),
                    support: parseInt(formData.support),
                    responsiveness: parseInt(formData.responsiveness),
                    security: parseInt(formData.security),
                    reliability: parseInt(formData.reliability),
                    documentation: parseInt(formData.documentation),
                    integration: parseInt(formData.integration),
                    overall: parseInt(formData.overall)
                },
                qualitativeFeedback: {
                    likes: formData.like_most,
                    challenges: formData.challenges,
                    improvements: formData.improvements,
                    suggestions: formData.useful,
                    comments: formData.other_comments
                },
                contactPermission: formData.contact_permission === 'yes'
            };

            // Send to backend
            const response = await axios.post(`${BACKEND_URL}/api/add-feedback`, payload);

            if (response.status === 201) {
                setSubmitSuccess(true);
                // Reset form after successful submission
                setFormData({
                    name: '',
                    email: '',
                    department: '',
                    navigation: '3',
                    performance: '3',
                    features: '3',
                    support: '3',
                    responsiveness: '3',
                    security: '3',
                    reliability: '3',
                    documentation: '3',
                    integration: '3',
                    overall: '3',
                    like_most: '',
                    challenges: '',
                    improvements: '',
                    useful: '',
                    other_comments: '',
                    contact_permission: 'no'
                });
                alert('Thank you for your feedback!');
            }
        } catch (error) {
            setSubmitError(error.response?.data?.message || 'Submission failed. Please try again.');
            console.error('Error submitting feedback:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    return (
        <>
            <div className={Style.feedbackForm}>
                <h2>Admin Feedback Form for SCMS Service Portal</h2>
                {submitSuccess && (
                    <div className={Style.successMessage}>
                        Thank you for your feedback! Your submission has been received.
                    </div>
                )}

                {submitError && (
                    <div className={Style.errorMessage}>
                        {submitError}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className={Style.formGroup}>
                        <label>Name (Optional):</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>Email (Optional):</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className={Style.formGroup}>
                        <label>Department/Role (Optional):</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department = "Admin"}
                            onChange={handleChange}
                            readOnly
                        />
                    </div>

                    <h3>Rate the following aspects (1 = Very Unsatisfied, 5 = Very Satisfied):</h3>

                    {[
                        { id: 'navigation', label: 'Ease of navigation' },
                        { id: 'performance', label: 'Portal speed and performance' },
                        { id: 'features', label: 'Availability of required features' },
                        { id: 'support', label: 'Quality of support from IT/Service team' },
                        { id: 'responsiveness', label: 'Responsiveness to issues or requests' },
                        { id: 'security', label: 'Security and data privacy' },
                        { id: 'reliability', label: 'Reliability (uptime, minimal errors)' },
                        { id: 'documentation', label: 'Clarity of documentation and help resources' },
                        { id: 'integration', label: 'Integration with other systems' },
                        { id: 'overall', label: 'Overall satisfaction with the portal' }
                    ].map(item => (
                        <div key={item.id} className={Style.formGroup}>
                            <label>{item.label}:</label>
                            <select
                                name={item.id}
                                value={formData[item.id]}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                    ))}

                    <h3>Open-Ended Questions:</h3>

                    {[
                        { id: 'like_most', label: 'What do you like most about the SCMS Service Portal?' },
                        { id: 'challenges', label: 'What challenges or issues have you encountered while using the portal?' },
                        { id: 'improvements', label: 'Are there any features or improvements you would like to see added?' },
                        { id: 'useful', label: 'How can we make the portal more useful for your daily tasks?' },
                        { id: 'other_comments', label: 'Please share any other comments or suggestions:' }
                    ].map(item => (
                        <div key={item.id} className={Style.formGroup}>
                            <label>{item.label}</label>
                            <textarea
                                name={item.id}
                                value={formData[item.id]}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>
                    ))}

                    <div className={Style.formGroup}>
                        <label>Would you be open to being contacted for further discussion on your feedback?</label>
                        <div className={Style.radioGroup}>
                            <label>
                                <input
                                    type="radio"
                                    name="contact_permission"
                                    value="yes"
                                    checked={formData.contact_permission === 'yes'}
                                    onChange={handleChange}
                                />
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="contact_permission"
                                    value="no"
                                    checked={formData.contact_permission === 'no'}
                                    onChange={handleChange}
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={Style.submitBtn}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                </form>
            </div>

        </>
    );
};

export default adminFb;