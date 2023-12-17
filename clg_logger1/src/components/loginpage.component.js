import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        regNo: "",
        dob: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };    

    const handleSubmit = () => {
        axios.post('http://localhost:4000/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((response) => {
            console.log("Data sent to /login:", response.data);
            const redirectPath = response.data.user.user_type === 0 ? '/homepage' : '/adminhome';
            navigate(`${redirectPath}?regNo=${response.data.user.reg_no}`);
        })
        .catch((error) => {
            console.error("Error sending data to /login:", error);
        });
    };

    return (
        <div className="form-container">
            <div className="form-row">
                <label htmlFor="regNo">Registration Number:</label>
                <input
                    type="text"
                    id="regNo"
                    name="regNo"
                    value={loginData.regNo}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={loginData.dob}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-row">
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="success-message" id="successMessage" style={{ display: 'none' }}>
                Login Successful!
            </div>
        </div>
    );
};

export default LoginPage;
