const express = require("express");
const app = express();

const { login } = require('./models/login'); 
const { getAttendanceData } = require('./models/attendance');
const { getActivityAssignmentData } = require('./models/activity_assignment');
const { insertStudentDetails } = require('./models/insert_user'); 
const { updateAttendanceStatus } = require('./models/putAttendance'); 
const { insertNewActivityAssignment } = require('./models/putActAss'); 
const { fetchNames } = require('./models/userName');


const bodyParser = require("body-parser"); //Middleware

var cors = require("cors");

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
        // Handle JSON parsing errors
        res.status(400).json({ error: 'Invalid JSON data' });
    } else {
        next();
    }
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.options("*", cors());

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
  
const http = require("http").Server(app);

app.post('/login', (req, res) => {
    const { regNo, dob } = req.body; // Assuming the client sends the credentials as a JSON request body

    login(regNo, dob, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred during login." });
        }

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials. Please check your registration number and date of birth." });
        }
        res.status(200).json({ message: "Login successful", user });
    });
});

app.post('/attendance', (req, res) => {
    const regNo = req.body.regNo;

    getAttendanceData(regNo, (err, user) => {
        if (err) {
            console.error("Error getting attendance data:", err);
            return res.status(500).json({ error: "An error occurred while retrieving attendance data." });
        }

        if (!user) {
            return res.status(401).json({ error: "Attendance data not found for the given registration number." });
        }

        // Exclude reg_no and send the entire user object in the response
        const { reg_no, ...attendanceDetails } = user;

        res.status(200).json(attendanceDetails);
    });
});

app.get("/activity-assignment", (req, res) => {
    getActivityAssignmentData((err, data) => {
        if (err) {
            console.error("Error getting activity assignment data:", err);
            return res.status(500).json({ error: "An error occurred while retrieving activity assignment data." });
        }

        if (!data) {
            return res.status(404).json({ error: "Activity assignment data not found." });
        }

        res.status(200).json(data);
    });
});

app.post('/insertStudent', (req, res) => {
    // Extract values from the request body
    const { regNo, name, dob, userType } = req.body;

    // Call the insertStudentDetails function
    insertStudentDetails(regNo, name, dob, userType, (err, insertedId) => {
        if (err) {
            console.error("Error inserting student details:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // Successfully inserted, send a response with the inserted ID
        res.status(201).json({ message:"Login Successful", insertedId });
    });
});

app.post('/updateAttendance', (req, res) => {
    // Extract values from the request body
    const { columnName, attendanceValues } = req.body;

    // Call the updateAttendanceStatus function
    updateAttendanceStatus(columnName, attendanceValues, (err, results) => {
        if (err) {
            console.error("Error updating attendance status:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Successfully updated, send a response with the results
        res.status(200).json(results);
    });
});

app.post('/insertActivityAssignment', (req, res) => {
    // Extract values from the request body
    const { activity, assignment } = req.body;

    // Call the insertNewActivityAssignment function
    insertNewActivityAssignment(activity, assignment, (err, insertedData) => {
        if (err) {
            console.error("Error inserting new activity assignment:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Successfully inserted, send a response with the inserted data
        res.status(201).json(insertedData);
    });
});

// Function to fetch the name from the student_details table only when the user_type is 0
app.get('/userType', (req, res) => {
    fetchNames((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching names' });
        }
        res.status(200).json(results); // Sending the fetched names as JSON response
    });
});

// Start the server
const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
