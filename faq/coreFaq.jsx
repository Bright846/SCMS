import React from "react";
import style from "./coreFaqStyle.module.css";
import QuesAns from "./Components/faq's/quesAns";

const faqPage = () => {
    return (
        <>
            <h1 className={style.header}>Frequently Asked Question's</h1>
            <QuesAns />
        </>
    )
}

export default faqPage;