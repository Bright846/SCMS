import React from "react";
import Style from './lodgeComp.module.css';

const lodgeComp = () => {
    return (
        <>
            <div className={Style.container}>
                <h2>Complaint Form</h2>
                <form method="post">
                    <div>
                        <p>Student Name :</p>
                        <input type="text" />
                    </div>
                    <div>
                        <p>Student Id :</p>
                        <input type="text" />
                    </div>

                    <div>
                        <p>Student Email :</p>
                        <input type="email" />
                    </div>
                    <div>
                        <p>Complaint Type :</p>
                        <select name="ComplaintType" id={Style.complaintType} required>
                            <option disabled selected>Select</option>
                            <option value="Faculty Related">Faculty Related</option>
                            <option value="Staff Related">Staff Related</option>
                            <option value="IT Lab Related">IT Lab Related</option>
                            <option value="Office Related">Office Related</option>
                        </select>
                    </div>

                    <div>
                        <p>Complaint Description :</p>
                        <textarea name="complaintDesc" id={Style.complaintDesc} cols="40" rows="5"
                            placeholder="Describe Your Issue..."></textarea>

                    </div>
                    <div>
                        <p>Date of Incident :</p>
                        <input type="date" name="incidentDate" id={Style.incidentDate} />

                    </div>


                    <button type="submit">Submit</button>
                </form>
                <footer>
                    &copy; 2025 Your Company Name. All rights reserved.
                </footer>
            </div>
        </>
    )
}

export default lodgeComp;