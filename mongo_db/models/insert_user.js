/** @format */

const connection = require("../config/dbconfig");

function insertStudentDetails(regNo, name, dob, userType, callback) {
    connection.query(
        "INSERT INTO student_details (reg_no, name, dob, user_type) VALUES (?, ?, ?, ?)",
        [regNo, name, dob, userType],
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }

            const insertedId = results.insertId; // Get the ID of the newly inserted row

            callback(null, insertedId); // Pass the inserted ID to the callback
        }
    );
}

module.exports = { insertStudentDetails };