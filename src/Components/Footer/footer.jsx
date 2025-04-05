import React from "react";
import style from "./footer.module.css";
import Facebook from "../../assets/facebook.png";
import Instagram from "../../assets/instagram.png";
import Whatsapp from "../../assets/whatsapp.png";
import Linkedin from "../../assets/linkedin.png";

const footer = () => {
    return (
        <>
            <div className={style.footerContainer}>
                <div className={style.contactInfo}>
                    <a href="#">Contact Us</a>
                    <a href="#">How it works</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>

                <div className={style.socialMediaLinks}>
                    <a href="#"><img src={Facebook} alt="Facebook Image" /></a>
                    <a href="#"><img src={Instagram} alt="Instagram Image" /></a>
                    <a href="#"><img src={Whatsapp} alt="Whatsapp Image" /></a>
                    <a href="#"><img src={Linkedin} alt="Linkedin Image" /></a>
                </div>

                <div className={style.address}>
                    <p>Office Address :</p>
                    <p>101 , ABC Building, XYZ Street,</p>
                    <p>ABC City, 123456</p>
                </div>

            </div>
            <p className={style.copyright}>&copy; 2024 SmartComplaint. All rights reserved. For inquiries, contact us at <a href="mailto:info@smartcomplaint.com">[info@smartcomplaint.com]</a>
            </p>
        </>
    )
}

export default footer;