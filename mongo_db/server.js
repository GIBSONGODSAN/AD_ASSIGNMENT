const express = require("express");
const app = express();
const { dateofbirth } = require("./models/dob"); // Import your functions
const { registerNumber } = require("./models/reg_no");
const { insertRegisterNumber } = require('./models/reg_no_put');
const { insertDateOfBirth } = require('./models/dob_put');
const { login } = require('./models/login'); 
const { getAttendanceData } = require('./models/attendance');

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

// Define a route to retrieve date of birth
app.get("/dob", (req, res) => {
    dateofbirth((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving date of birth" });
        }
        if (data === null) {
            return res.status(404).json({ error: "No date of birth found" });
        }
        res.json({ dob: data });
    });
});


// Define a route to retrieve registration numbers
app.get("/reg_no", (req, res) => {
    registerNumber((err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving register number" });
        }
        if (data === null) {
            return res.status(404).json({ error: "No register number found" });
        }
        res.json({ reg_no: data });
    });
});

app.post('/dob_put', (req, res) => {
    // Get the date of birth from the request body
    const { dob_put } = req.body;

    if (!dob_put) {
        return res.status(400).json({ error: 'Date of birth is required' });
    }

    // Call the insertDateOfBirth function to insert the date of birth into the database
    insertDateOfBirth(dob_put, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting date of birth' });
        }
        res.json({ message: 'Date of birth inserted successfully' });
    });
});

app.post('/reg_no_put', (req, res) => {
    // Get the registration number from the request body
    const { reg_no_put } = req.body;

    if (!reg_no_put) {
        return res.status(400).json({ error: 'Registration number is required' });
    }

    // Call the insertRegisterNumber function to insert the registration number into the database
    insertRegisterNumber(reg_no_put, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error inserting registration number' });
        }
        res.json({ message: 'Registration number inserted successfully' });
    });
});

app.post('/login', (req, res) => {
    const { regNo, dob } = req.body; // Assuming the client sends the credentials as a JSON request body

    login(regNo, dob, (err, user) => {
        if (err) {
            return res.status(500).json({ error: "An error occurred during login." });
        }

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials. Please check your registration number and date of birth." });
        }

        // You have a valid user object here for further processing
        // For example, you can generate a JWT token and send it as a response
        // or redirect the user to their dashboard.

        // Here, I'm sending a success message and the user object back as a response.
        res.status(200).json({ message: "Login successful", user });
    });
});

app.get("/attendance/:name", (req, res) => {
    const name = req.params.name;

    getAttendanceData(name, (err, data) => {
        if (err) {
            console.error("Error:", err);
            res.status(500).json({ error: "An error occurred while fetching attendance data." });
        } else {
            if (data.length > 0) {
                res.json(data); // Send the retrieved attendance data as a JSON response
            } else {
                res.json({ message: "No matching data found for the provided name." });
            }
        }
    });
});


// Start the server
const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
