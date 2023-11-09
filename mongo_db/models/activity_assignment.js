// In your backend code (activity_assignment.js)
/** @format */

const connection = require("../config/dbconfig");

function getActivityAssignmentData(callback) {
    connection.query(
        "SELECT * FROM activity_assignment",
        (err, results) => {
            if (err) {
                console.error("Error getting activity assignment data:", err);
                return callback(err, null);
            }

            if (results.length === 0) {
                return callback(null, []);
            }

            // Extract activity_id and assignment from all rows
            const data = results.map((row) => {
                return { activity_id: row.activity_id, assignment: row.assignment };
            });

            callback(null, data);
        }
    );
}

module.exports = { getActivityAssignmentData };
