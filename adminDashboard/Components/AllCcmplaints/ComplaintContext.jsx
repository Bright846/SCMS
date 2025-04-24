// ComplaintContext.js
import React, { createContext, useState } from "react";

export const ComplaintContext = createContext();

export const ComplaintProvider = ({ children }) => {
    const [complaints, setComplaints] = useState([]);

    return (
        <ComplaintContext.Provider value={{ complaints, setComplaints }}>
            {children}
        </ComplaintContext.Provider>
    );
};
