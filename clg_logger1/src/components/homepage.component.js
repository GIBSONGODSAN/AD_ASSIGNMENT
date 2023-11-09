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
                // Ensure that the response.data is an array before setting state
                if (Array.isArray(response.data)) {
                    setActivityAssignmentData(response.data);
                } else {
                    console.error("Invalid data format for activity assignment");
                }
            })
            .catch((error) => {
                console.error("Error fetching activity assignment data:", error);
            });
    }, [regNo]);

    return (
        <div>
            <h2>Attendance Details:</h2>
            <pre>{JSON.stringify(attendanceDetails, null, 2)}</pre>

            <h2>Activity Assignment:</h2>
            <table>
                <thead>
                    <tr>
                        <th>Activity ID</th>
                        <th>Assignment</th>
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
