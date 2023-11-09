const express = require("express");
const app = express();

const { login } = require('./models/login'); 
const { getAttendanceData } = require('./models/attendance');
const { getActivityAssignmentData } = require('./models/activity_assignment');

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


// Start the server
const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
