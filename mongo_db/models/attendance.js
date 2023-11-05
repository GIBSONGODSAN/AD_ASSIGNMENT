const connection = require("../config/dbconfig");

function getAttendanceData(regNo, callback) {
    const sql = `
        SELECT
            SUM(CASE WHEN attendance = 1 THEN 1 ELSE 0 END) AS daysPresent,
            (COUNT(*) - 1) AS numberOfDays
        FROM attendance
        WHERE reg_no = ?;
    `;

    connection.query(sql, [regNo], (err, results, fields) => {
        if (err) {
            return callback(err); // Pass the error to the callback
        }

        if (results.length === 0) {
            return callback(null, { daysPresent: 0, numberOfDays: 0 });
        }

        const { daysPresent, numberOfDays } = results[0];
        callback(null, { daysPresent, numberOfDays });
    });
}

module.exports = { getAttendanceData };
