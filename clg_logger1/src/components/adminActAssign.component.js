import React, { useState } from 'react';
import axios from 'axios';

const ActAssign = () => {
  const [activity, setActivity] = useState('');
  const [assignment, setAssignment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data object to be sent in the request
    const formData = {
      activity,
      assignment,
    };

    try {
      // Send a POST request to the server with JSON data
      const response = await axios.post('http://localhost:4000/insertActivityAssignment', formData, {
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
        Task Name:
        <input type="text" value={activity} onChange={(e) => setActivity(e.target.value)} />
      </label>
      <br />

      <label>
        Task Description:
        <input type="text" value={assignment} onChange={(e) => setAssignment(e.target.value)} />
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default ActAssign;
