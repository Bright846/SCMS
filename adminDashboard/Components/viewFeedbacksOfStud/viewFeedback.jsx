import React, { useEffect, useState } from "react";
import Style from "./viewFeedback.module.css";
import axios from "axios";

const BACKEND_URL = "http://localhost:3001";

const ViewFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/get-feedbacks`, { withCredentials: true });
            setFeedbacks(res.data.feedbacks);
        } catch (err) {
            setError("Failed to load feedbacks.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Style.container}>
            <h2 className={Style.title}>All Feedback</h2>
            {loading && <div className={Style.loading}>Loading...</div>}
            {error && <div className={Style.error}>{error}</div>}
            <div className={Style.flexWrap}>
                {feedbacks.length === 0 && !loading && <div>No feedback found.</div>}
                {feedbacks.map((fb) => (
                    <div className={Style.card} key={fb._id}>
                        <div className={Style.header}>
                            <span className={Style.name}>{fb.name}</span>
                            <span className={Style.email}>{fb.email}</span>
                        </div>
                        <div className={Style.body}>
                            <div><strong>Complaint ID:</strong> {fb.complaintId}</div>
                            <div><strong>Rating:</strong> <span className={Style.rating}>{fb.rating} / 5</span></div>
                            <div><strong>Comments:</strong> {fb.comments || <span className={Style.noComment}>No comments</span>}</div>
                        </div>
                        <div className={Style.footer}>
                            <span className={Style.date}>
                                {new Date(fb.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewFeedback;
