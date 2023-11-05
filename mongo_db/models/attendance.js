/** @format */

const connection = require("../config/dbconfig");

function getAttendanceData(name, callback) {
    connection.query(
        "SELECT * FROM attendance WHERE name = ?",
        [name],
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }

            callback(null, results); // Return all matching rows
        }
    );
}

module.exports = { getAttendanceData };
