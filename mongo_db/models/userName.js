/** @format */

const connection = require("../config/dbconfig");

// Function to fetch the name from the student_details table only when the user_type is 0
function fetchNames(callback) {
    const query = `SELECT name FROM student_details WHERE user_type = 0`;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error executing the query: ' + err.stack);
            callback(err, null); // Pass error to callback
            return;
        }
        callback(null, results); // Pass results directly to the callback
    });
}

module.exports = { fetchNames };