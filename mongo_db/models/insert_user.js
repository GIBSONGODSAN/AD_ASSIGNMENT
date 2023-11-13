const connection = require("../config/dbconfig");

function insertStudentDetails(regNo, name, dob, userType, callback) {
    connection.query(
        "INSERT INTO student_details (reg_no, name, dob, user_type) VALUES (?, ?, ?, ?)",
        [regNo, name, dob, userType],
        (err, studentResults) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }

            const studentId = studentResults.insertId; // Get the ID of the newly inserted row

            // Insert the regNo into the attendance table
            connection.query(
                "INSERT INTO attendance (reg_no) VALUES (?)",
                [regNo],
                (err, attendanceResults) => {
                    if (err) {
                        return callback(err);
                    }

                    const attendanceId = attendanceResults.insertId; // Get the ID of the newly inserted row

                    callback(null, { studentId, attendanceId }); // Pass the inserted IDs to the callback
                }
            );
        }
    );
}

module.exports = { insertStudentDetails };
