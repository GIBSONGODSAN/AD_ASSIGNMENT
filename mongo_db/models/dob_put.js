/** @format */

const connection = require("../config/dbconfig");

function insertDateOfBirth(dateOfBirth, callback) {
    // Assuming "dateOfBirth" is a string in a suitable format, e.g., 'YYYY-MM-DD'
    connection.query(
        "INSERT INTO log_clg (dob) VALUES (?)",
        [dateOfBirth],
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }
            callback(null, results); // Pass the results to the callback
        }
    );
}

module.exports = { insertDateOfBirth };
