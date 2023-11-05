import React, { Component } from "react";
import axios from "axios";

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reg_no_put: "",
            dob_put: ""
        };
    }

    handleRegNoChange = (event) => {
        this.setState({ reg_no_put: event.target.value });
    }

    handleDOBChange = (event) => {
        this.setState({ dob_put: event.target.value });
    }

    handleSubmitRegNo = () => {
        const formData = {
            reg_no_put: this.state.reg_no_put
        };

        axios.post('http://localhost:4000/reg_no_put', formData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            }
        })
            .then((response) => {
                console.log("Data sent to /reg_no_put:", response.data);
            })
            .catch((error) => {
                console.error("Error sending data to /reg_no_put:", error);
            });
    }

    handleSubmitDOB = () => {
        const formData = {
            dob_put: this.state.dob_put
        };

        axios.post('http://localhost:4000/dob_put', formData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            }
        })
            .then((response) => {
                console.log("Data sent to /dob_put:", response.data);
            })
            .catch((error) => {
                console.error("Error sending data to /dob_put:", error);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="reg_no_put">Registration Number:</label>
                    <input
                        type="text"
                        id="reg_no_put"
                        value={this.state.reg_no_put}
                        onChange={this.handleRegNoChange}
                    />
                    <button onClick={this.handleSubmitRegNo}>Submit Registration Number</button>
                </div>
                <div>
                    <label htmlFor="dob_put">Date of Birth:</label>
                    <input
                        type="text"
                        id="dob_put"
                        value={this.state.dob_put}
                        onChange={this.handleDOBChange}
                    />
                    <button onClick={this.handleSubmitDOB}>Submit Date of Birth</button>
                </div>
            </div>
        );
    }
}