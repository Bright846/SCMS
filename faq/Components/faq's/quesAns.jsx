import React from "react";
import style from "./quesAns.module.css";
import GeneralQuesData from "./generalQues.json";
import FunctionalityQuesData from "./functionality.json";
import ProcessQuesData from "./processRelated.json";
import TechnicalQuesData from "./technical.json";

const quesAns = () => {
    // Function to handle FAQ interactivity
    const handleFaqClick = (event) => {
        const question = event.target;
        const answer = question.nextElementSibling;

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null; // Close the answer
            answer.style.padding = "0px 15px";
        } else {
            document.querySelectorAll('.Answer').forEach((otherAnswer) => {
                otherAnswer.style.maxHeight = null; // Close other answers
                otherAnswer.style.padding = "0px 15px";
            });
            answer.style.maxHeight = answer.scrollHeight + "px"; // Open the clicked answer
            answer.style.padding = "10px 15px";
        }
    };

    return (
        <>
            <div className={style.faqContainer}>
                <div>
                    <h4 className={style.title}>General Question's</h4>
                    {GeneralQuesData.map((item) => (
                        <div key={item.id} className={style.faqItem}>
                            <p className={style.Question} onClick={handleFaqClick}>{item.Question}</p>
                            <p className={style.Answer}>{item.Answer}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className={style.title}>Functionality Related Question's</h4>
                    {FunctionalityQuesData.map((item) => (
                        <div key={item.id} className={style.faqItem}>
                            <p className={style.Question} onClick={handleFaqClick}>{item.Question}</p>
                            <p className={style.Answer}>{item.Answer}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className={style.title}>Process Related Question's</h4>
                    {ProcessQuesData.map((item) => (
                        <div key={item.id} className={style.faqItem}>
                            <p className={style.Question} onClick={handleFaqClick}>{item.Question}</p>
                            <p className={style.Answer}>{item.Answer}</p>
                        </div>
                    ))}
                </div>

                <div>
                    <h4 className={style.title}>Technical Question's</h4>
                    {TechnicalQuesData.map((item) => (
                        <div key={item.id} className={style.faqItem}>
                            <p className={style.Question} onClick={handleFaqClick}>{item.Question}</p>
                            <p className={style.Answer}>{item.Answer}</p>
                        </div>
                    ))}
                </div>
                <p className={style.title}>Didn't find your question. Send Us</p>
                <div className={style.InpQuesContainer}>
                    <input type="text" id={style.inpQues} placeholder="Type your question" />
                    <button type="submit" id={style.submitBtn}>Submit</button>
                </div>


            </div>
        </>
    );
};


export default quesAns;