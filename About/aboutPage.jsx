import React from "react";
import style from "./aboutPage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faEye, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const aboutPage = () => {
    return (
        <>

            <div className={style.container}>
                <h1 className={style.title}>About Us</h1>
                <div className={style.aboutContent}>
                    <p>
                        Welcome to the Smart Complaint Management System (SCMS), a transformative platform designed to streamline
                        and enhance the process of lodging, tracking, and resolving complaints. Our mission is to empower
                        individuals and organizations with an efficient, transparent, and user-friendly system that ensures
                        timely resolution of issues.
                    </p>

                    <h2 className={style.subheading}>What We Do</h2>
                    <ul className={style.features}>
                        <li>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue' }} /> Simplified Complaint Submission: Users can easily lodge
                            complaints via an intuitive interface, with options to upload photos, videos, and location details.
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue' }} /> Real-Time Tracking: Track complaint status—whether pending,
                            resolved, or rejected—at any stage.
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue' }} /> Automated Workflow: Complaints are forwarded through a
                            structured hierarchy for swift resolution, ensuring accountability at every level.
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'blue' }} /> Department-Specific Management: Separate admin panels for
                            different departments enable focused attention on complaints relevant to each area.
                        </li>
                    </ul>

                    <h2 className={style.subheading}>Why Choose SCMS?</h2>
                    <div className={style.reasons}>
                        <div className={style.reason}>
                            <FontAwesomeIcon icon={faClock} style={{ color: 'blue' }} />
                            <h3>Efficiency</h3>
                            <p>Save time and effort with a streamlined online complaint system.</p>
                        </div>
                        <div className={style.reason}>
                            <FontAwesomeIcon icon={faEye} style={{ color: 'blue' }} />
                            <h3>Transparency</h3>
                            <p>Gain visibility into complaint handling processes while ensuring privacy for sensitive operations.</p>
                        </div>
                        <div className={style.reason}>
                            <FontAwesomeIcon icon={faEye} style={{ color: 'blue' }} />
                            <h3>Accountability</h3>
                            <p>Automated escalation ensures unresolved issues are addressed by higher authorities.</p>
                        </div>
                        <div className={style.reason}>
                            <FontAwesomeIcon icon={faMobileAlt} style={{ color: 'blue' }} />
                            <h3>User-Centric Design</h3>
                            <p>Designed for accessibility, even for non-tech-savvy users.</p>
                        </div>
                    </div>

                    <h2 className={style.subheading}>Our Vision</h2>
                    <p>
                        At SCMS, we aim to revolutionize complaint management by fostering trust and reliability in service
                        delivery. Whether it's addressing civic grievances or organizational concerns, our platform is built to
                        make problem-solving faster, smarter, and more effective.
                    </p>

                    <p>Join us in creating a world where every voice is heard and every issue is resolved efficiently!</p>
                </div>
            </div>
        </>
    );

}

export default aboutPage;