import React, { useState } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [regNo, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [userType, setUserType] = useState('0'); // Assuming default value is '0'

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data object to be sent in the request
    const formData = {
      regNo,
      name,
      dob,
      userType,
    };

    try {
      // Send a POST request to the server with JSON data
      const response = await axios.post('http://localhost:4000/insertStudent', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle the response as needed
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Registration Number:
        <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
      </label>
      <br />

      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />

      <label>
        Date of Birth:
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      </label>
      <br />

      <label>
        User Type:
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="0">User Type 0</option>
          <option value="1">User Type 1</option>
        </select>
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminHome;
