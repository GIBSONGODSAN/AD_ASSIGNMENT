/** @format */

const connection = require("../config/dbconfig");

function getAttendanceData(regNo, callback) {
    connection.query(
        "SELECT * FROM attendance WHERE reg_no = ?",
        [regNo],
        (err, results, fields) => {
            if (err) {
                return callback(err, null); // Pass the error to the callback
            }
            if (results.length === 0) {
                // No matching user found
                return callback(null, null);
            }
            const user = results[0]; // Assuming there's only one user with the provided reg_no and dob
            callback(null, user); // Return all matching rows
        }
    );
}

module.exports = { getAttendanceData } ;