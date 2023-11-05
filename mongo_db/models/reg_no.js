/** @format */

const connection = require("../config/dbconfig");

function registerNumber(callback) {
    connection.query(
        "SELECT reg_no FROM log_clg",
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }
            callback(null, results); // Pass the results to the callback
        }
    );
}

module.exports = { registerNumber };
