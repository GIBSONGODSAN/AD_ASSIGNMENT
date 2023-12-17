import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const HomePage = () => {
    const location = useLocation();
    const regNo = new URLSearchParams(location.search).get("regNo");

    const [attendanceDetails, setAttendanceDetails] = useState({});
    const [activityAssignmentData, setActivityAssignmentData] = useState([]);

    useEffect(() => {
        // Fetch attendance details from the backend using regNo
        axios.post('http://localhost:4000/attendance', { regNo }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setAttendanceDetails(response.data);
            })
            .catch((error) => {
                console.error("Error fetching attendance details:", error);
            });

        // Fetch activity assignment data from the backend
        axios.get('http://localhost:4000/activity-assignment')
            .then((response) => {
                console.log("Response from activity assignment:", response.data);

                // Check if the response has the expected properties
                if (response.data.activity_id && response.data.assignment) {
                    setActivityAssignmentData([response.data]);
                } else {
                    console.error("Invalid data format for activity assignment");
                }
            })
            .catch((error) => {
                console.error("Error fetching activity assignment data:", error);
            });
    }, [regNo]);

    return (
        <div className="content-container">
            <h2>Attendance Details:</h2>
            <table className="attendance-table">
                <thead>
                    <tr>
                        <th>Event</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(attendanceDetails).map((key, index) => (
                        <tr key={index}>
                            <td>{key}</td>
                            <td>{attendanceDetails[key] === 0 ? 'Absent' : 'Present'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Activity Assignment:</h2>
            <table className="activity-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Task Description</th>
                    </tr>
                </thead>
                <tbody>
                    {activityAssignmentData.map((item, index) => (
                        <tr key={index}>
                            <td>{item.activity_id}</td>
                            <td>{item.assignment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
