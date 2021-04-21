const express = require('express');
const mysql = require('mysql');

const router = express.Router();

var connection = mysql.createConnection({
    // Config for the mysql DataBase
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monk'
});

router.use(express.json()).post('/create', (req, res) => {
    connection.connect();

    workflow_name = req.body.name;
    workflow_status_count = req.body.status_count;
    workflow_statuses = JSON.stringify(req.body.statuses);
    console.log(workflow_statuses);
    const sql = `INSERT INTO workflow (name, status_count, statuses) VALUES ('${workflow_name}', '${workflow_status_count}', '${workflow_statuses}')`;

    connection.query(sql, (err) => {
        if (err) throw err
        console.log(`workflow ${workflow_name} is added successfully`);
    });

    connection.end();
    res.send(`workflow ${workflow_name} is added successfully`);
});

router.get('/get/:id', (req, res) => {
    res.send('workflow id');
});

module.exports = router;