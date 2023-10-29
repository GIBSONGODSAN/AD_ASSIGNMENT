const express = require("express");
const app = express();
const { dateofbirth } = require("./models/dob"); // Import your functions
const { registerNumber } = require("./models/reg_no");
const bodyParser = require("body-parser"); //Middleware

var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));

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
    dateofbirth((data) => {
        if (data === false) {
            return res.status(500).json({ error: "Error retrieving date of birth" });
        }
        res.json({ dob: data });
    });
});

// Define a route to retrieve registration numbers
app.get("/reg_no", (req, res) => {
    registerNumber((data) => {
        if (data === false) {
            return res.status(500).json({ error: "Error retrieving registration numbers" });
        }
        res.json({ reg_no: data });
    });
});

// Start the server
const port = process.env.PORT || 3000;
http.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
