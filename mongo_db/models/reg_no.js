/** @format */ 

const connection = require("../config/dbconfig");

function registerNumber(params, callback) {
    connection.query(
        "SELECT reg_no FROM log_clg",
        (err, results, fields) => {
            if (err) {
                return callback(false);
            }
            callback(results);
        }
    );
}

module.exports = { registerNumber };
