import React, { useState } from "react";
import style from './main.module.css';
import heroImage from '../../assets/hero.webp';
const main = () => {
    return (
        <>
            <div style={{ backgroundColor: "white" }}>
                <img src={heroImage} alt="Hero Image" id={style.heroImg} />

                <div className={style.quote}>
                    <p>Empowering voices, resolving issues - </p>
                    <p id={style.quoteDesc}> because every concern deserves to be heard and addressed</p>
                </div>

                <p className={`${style.quote} ${style.liveQuote}`}>Your complaints matter — track and resolve them in real-time!</p>
                <div className={style.stats}>
                    <div className={style.statItem}>
                        <span className={`${style.statNumber} ${style.animatedNum}`} id="complaints-today">92</span>
                        <span className={style.statLabel}>Complaints Today</span>
                    </div>
                    <div className={style.statItem}>
                        <span className={`${style.statNumber} ${style.animatedNum}`} id="resolved-complaints" >109</span>
                        <span className={style.statLabel}>Resolved Complaints</span>
                    </div>
                    <div className={style.statItem}>
                        <span className={`${style.statNumber} ${style.animatedNum}`} id="avg-resolution-time">06</span>
                        <span className={style.statLabel}>Avg Resolution Time (days)</span>
                    </div>
                </div>
                <div className={style.compBtn}>
                    <button>Submit Complaint</button>
                    <button>View Complaint</button>
                </div>
            </div >
        </>
    )
}

export default main;