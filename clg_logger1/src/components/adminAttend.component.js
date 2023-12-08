import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NamesDisplay = () => {
  const [columnName, setColumnName] = useState('');
  const [namesWithAttendance, setNamesWithAttendance] = useState([]);

  useEffect(() => {
    // Fetch names from the server on component mount
    axios.get('http://localhost:4000/userType')
      .then(response => {
        // Extract names from the response data and initialize attendance values
        const fetchedNames = response.data.map(item => ({ name: item.name, attendance: 0 }));
        setNamesWithAttendance(fetchedNames);
      })
      .catch(error => {
        console.error('Error fetching names:', error);
      });
  }, []); // Empty dependency array ensures it only runs once on mount

  const handleAttendanceChange = (index, value) => {
    // Update attendance value based on index
    const updatedNames = [...namesWithAttendance];
    updatedNames[index].attendance = parseInt(value); // Convert value to integer
    setNamesWithAttendance(updatedNames);
  };

  const handleColumnNameChange = (e) => {
    setColumnName(e.target.value);
  };

  const handleSubmit = () => {
    // Collect attendance values and prepare data to send to the server
    const attendanceValues = namesWithAttendance.map(item => item.attendance);
    const dataToSend = {
      columnName: columnName,
      attendanceValues: attendanceValues,
    };

    // Send data to the server in JSON format
    axios.post('http://localhost:4000/updateAttendance', dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log('Data sent successfully:', response.data);
    })
    .catch(error => {
      console.error('Error sending data:', error);
    });
  };

  return (
    <div>
      <label htmlFor="eventName">Name of the Event:</label>
      <input
        type="text"
        id="eventName"
        placeholder="Enter column name"
        value={columnName}
        onChange={handleColumnNameChange}
      />
      <h2>Names with Attendance:</h2>
      <ul>
        {namesWithAttendance.map((item, index) => (
          <li key={index}>
            {item.name}
            <input
              type="number"
              min="0"
              max="1"
              value={item.attendance}
              onChange={(e) => handleAttendanceChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NamesDisplay;
