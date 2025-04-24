// ComplaintReport.jsx
import React, { useContext, useRef } from "react";
import { ComplaintContext } from "../AllCcmplaints/ComplaintContext";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComplaintReport = () => {
    const { complaints } = useContext(ComplaintContext);
    const chartRef = useRef();

    // Aggregate complaint counts by status
    const reportData = complaints.reduce((acc, complaint) => {
        acc[complaint.status] = (acc[complaint.status] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(reportData),
        datasets: [{
            label: "Complaints by Status",
            data: Object.values(reportData),
            backgroundColor: [
                "rgba(255, 99, 132, 0.6)",   // Declined
                "rgba(54, 162, 235, 0.6)",   // Pending
                "rgba(75, 192, 192, 0.6)"    // Resolved
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(75, 192, 192, 1)"
            ],
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: "Complaint Status Histogram",
                font: { size: 20 }
            },
            legend: {
                display: true,
                position: "top"
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
            }
        }
    };

    const handleDownloadPdf = async () => {
        if (!chartRef.current) return;

        const canvas = await html2canvas(chartRef.current, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "px",
            format: [canvas.width + 40, canvas.height + 40]
        });

        const margin = 20;
        pdf.addImage(imgData, "PNG", margin, margin, canvas.width, canvas.height);
        pdf.save("ComplaintReport.pdf");
    };

    return (
        <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
            <h1 style={{ textAlign: "center", marginBottom: 30 }}>Complaint Status Histogram</h1>

            <div ref={chartRef} style={{ width: "100%", height: 400, marginBottom: 30 }}>
                <Bar data={chartData} options={options} />
            </div>

            <section>
                <h2>Complaint Status Report</h2>
                <ul>
                    {Object.entries(reportData).map(([status, count]) => (
                        <li key={status} style={{ fontSize: 16, marginBottom: 6 }}>
                            <strong>{status}:</strong> {count} complaint{count !== 1 ? "s" : ""}
                        </li>
                    ))}
                </ul>
            </section>

            <button
                onClick={handleDownloadPdf}
                style={{
                    display: "block",
                    margin: "30px auto 0",
                    padding: "12px 24px",
                    fontSize: 16,
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    transition: "background-color 0.3s ease"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#0056b3"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#007bff"}
                aria-label="Download complaint report as PDF"
            >
                Download Report as PDF
            </button>
        </div>
    );
};

export default ComplaintReport;
