/** @format */

const connection = require("../config/dbconfig");

function insertRegisterNumber(registerNumber, callback) {
    // Assuming "registerNumber" is a string or a number
    connection.query(
        "INSERT INTO log_clg (reg_no) VALUES (?)",
        [registerNumber],
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }
            callback(null, results); // Pass the results to the callback
        }
    );
}

module.exports = { insertRegisterNumber };
