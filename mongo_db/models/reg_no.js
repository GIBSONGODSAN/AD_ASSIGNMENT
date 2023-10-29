/** @format */ 

const connection = require("../server");


function registerNumber(params, callback) {
    connection.query(
        "SELECT reg_no FROM log_clg",
        (err, results, fields) => {
            if (err) {
                return callback(false);
            }
        }
    );
}

module.exports = registerNumber;
