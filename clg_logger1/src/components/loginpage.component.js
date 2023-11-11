import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        <div>
            <div>
                <label htmlFor="regNo">Registration Number:</label>
                <input
                    type="text"
                    id="regNo"
                    name="regNo"
                    value={loginData.regNo}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={loginData.dob}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default LoginPage;
