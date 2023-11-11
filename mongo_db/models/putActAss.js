/** @format */
const connection = require("../config/dbconfig");

function insertNewActivityAssignment(activity, assignment, callback) {
    // Insert new activity and assignment at the top of the table
    connection.query(
        "INSERT INTO activity_assignment (activity_id, assignment) VALUES (?, ?) ORDER BY id DESC LIMIT 1",
        [activity, assignment],
        (err, results) => {
            if (err) {
                console.error("Error inserting new activity assignment:", err);
                return callback(err, null);
            }

            // Return the inserted data
            const insertedData = {
                id: results.insertId,
                activity: activity,
                assignment: assignment,
            };

            callback(null, insertedData);
        }
    );
}

module.exports = { insertNewActivityAssignment };
