const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dbConfig = require('../config/db');
const connection = mysql.createConnection(dbConfig);

// POST /dob
router.post('/', async (req, res) => {
    try {
        const { dob } = req.body;
        const query = `INSERT INTO users (dob) VALUES ('${dob}')`;
        connection.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            } else {
                res.status(201).json({ message: 'Date of birth saved successfully' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const query = `SELECT dob FROM users ORDER BY id DESC LIMIT 1`;
        connection.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Server error' });
            } else {
                const dob = result[0].dob;
                res.status(200).json({ dob });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
