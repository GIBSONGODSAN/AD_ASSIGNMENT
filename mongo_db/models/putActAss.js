/** @format */
const connection = require("../config/dbconfig");

function insertNewActivityAssignment(activity, assignment, callback) {
    connection.beginTransaction((err) => {
        if (err) {
            console.error('Error beginning transaction:', err);
            return callback(err, null);
        }

        // Delete existing records from activity_assignment table
        connection.query('DELETE FROM activity_assignment', (deleteErr, deleteResults) => {
            if (deleteErr) {
                return connection.rollback(() => {
                    console.error('Error deleting existing records:', deleteErr);
                    callback(deleteErr, null);
                });
            }

            // Insert new activity and assignment
            connection.query(
                'INSERT INTO activity_assignment (activity_id, assignment) VALUES (?, ?)',
                [activity, assignment],
                (insertErr, insertResults) => {
                    if (insertErr) {
                        return connection.rollback(() => {
                            console.error('Error inserting new activity assignment:', insertErr);
                            callback(insertErr, null);
                        });
                    }

                    connection.commit((commitErr) => {
                        if (commitErr) {
                            return connection.rollback(() => {
                                console.error('Error committing transaction:', commitErr);
                                callback(commitErr, null);
                            });
                        }

                        const insertedData = {
                            id: insertResults.insertId,
                            activity: activity,
                            assignment: assignment,
                        };

                        callback(null, insertedData);
                    });
                }
            );
        });
    });
}

module.exports = { insertNewActivityAssignment };
