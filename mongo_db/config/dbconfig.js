var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "log_clg",
});

connection.connect((err) => {
  if (err) throw err;
  else {
    console.log("Connection Successfull");
  }
});
module.exports = connection;

// CREATE TABLE student_details (
//   reg_no INT PRIMARY KEY,
//   name VARCHAR(255),
//   dob DATE
// );

// CREATE TABLE attendance (
//   reg_no INT,
//   day1 INT,
//   day2 INT,
//   FOREIGN KEY (reg_no) REFERENCES student_details(reg_no)
// );

// CREATE TABLE activity_assignment (
//   activity_id VARCHAR(255),
//   assignment VARCHAR(255)
// );

// -- Insert dummy records into student_details
// INSERT INTO student_details (reg_no, name, dob) VALUES
// (1, 'John Doe', '1990-05-15'),
// (2, 'Jane Smith', '1992-08-22'),
// (3, 'Bob Johnson', '1991-04-10'),
// (4, 'Alice Williams', '1993-11-30'),
// (5, 'Charlie Brown', '1995-02-18');

// -- Insert dummy records into attendance
// INSERT INTO attendance (reg_no, day1, day2) VALUES
// (1, 1, 0),
// (2, 1, 1),
// (3, 0, 1),
// (4, 1, 1),
// (5, 0, 0);

// -- Insert dummy records into activity_assignment
// INSERT INTO activity_assignment (activity_id, assignment) VALUES
// ('A001', 'Math Homework'),
// ('A002', 'History Project'),
// ('A003', 'Science Experiment'),
// ('A004', 'English Essay'),
// ('A005', 'Art Presentation');
