const connection = require("../config/dbconfig");

function login(regNo, dob, callback) {
    connection.query(
        "SELECT * FROM student_details WHERE register_number = ? AND dob = ?",
        [regNo, dob],
        (err, results, fields) => {
            if (err) {
                return callback(err); // Pass the error to the callback
            }
            
            if (results.length === 0) {
                // No matching user found
                return callback(null, null);
            }
            
            const user = results[0]; // Assuming there's only one user with the provided reg_no and dob
            
            callback(null, user); // Pass the user data to the callback
        }
    );
}

module.exports = { login };
