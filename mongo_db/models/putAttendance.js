/** @format */

const connection = require("../config/dbconfig");

function updateAttendanceStatus(columnName, attendanceValues, callback) {
    // Ensure attendanceValues is an array
    if (!Array.isArray(attendanceValues)) {
        return callback(new Error('attendanceValues must be an array'), null);
    }

    console.log('attendanceValues:', attendanceValues);

    // Step 1: Update attendance status for all users
    connection.query(
        "ALTER TABLE attendance ADD COLUMN ?? INT DEFAULT 0",
        [columnName],
        (err, addColumnResults, fields) => {
            if (err) {
                return callback(err, null); // Pass the error to the callback
            }

            // Step 2: Update attendance values for each person
            const caseStatements = attendanceValues.map(
                (value, index) => `WHEN ${index + 1} THEN ${value}`
            );

            const updateQuery = `
                UPDATE attendance
                SET ?? = CASE reg_no
                    ${caseStatements.join(' ')}
                END
            `;

            connection.query(
                updateQuery,
                [columnName],
                (err, updateResults, fields) => {
                    if (err) {
                        return callback(err, null); // Pass the error to the callback
                    }

                    callback(null, { addColumnResults, updateResults });
                }
            );
        }
    );
}

module.exports = { updateAttendanceStatus };

