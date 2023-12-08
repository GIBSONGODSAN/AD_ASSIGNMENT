// In your backend code (activity_assignment.js)
/** @format */

// In your backend code (activity_assignment.js)
const connection = require("../config/dbconfig");

function getActivityAssignmentData(callback) {
    connection.query(
        "SELECT * FROM activity_assignment; ",
        (err, results) => {
            if (err) {
                console.error("Error getting first activity assignment data:", err);
                return callback(err, null);
            }

            if (results.length === 0) {
                return callback(null, null);
            }

            // Extract activity_id and assignment from the first row
            const firstRow = results[0];
            const data = { activity_id: firstRow.activity_id, assignment: firstRow.assignment };

            callback(null, data);
        }
    );
}

module.exports = { getActivityAssignmentData };
