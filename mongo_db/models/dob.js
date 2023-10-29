/** @format */ 

const connection = require("../config/dbconfig");

function dateofbirth(params, callback) {
    connection.query(
        "SELECT dob FROM log_clg",
        (err, results, fields) => {
            if (err) {
                return callback(false);
            }
        }
    );
}

module.exports = { dateofbirth };
