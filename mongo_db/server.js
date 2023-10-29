const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'log_clg'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID ' + connection.threadId);
});

const registerNumber = require('./routes/registerNumber');
const dateofbirth = require('./routes/dateofbirth');

app.use('/registerNumber', registerNumber);
app.use('/dateofbirth', dateofbirth);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
