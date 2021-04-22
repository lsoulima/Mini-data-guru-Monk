const express = require('express');
const mysql = require('mysql');

// create a new router
const router = express.Router();

// create a connection with mysql the DB
const connection = mysql.createConnection({
    // Config for the mysql DataBase
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monk'
});


// Create a new workflow
// api path: http://host:port/workflow/create
// method: POST
// accepting a json data like this:
// {
//     "name": "workflow 1",
//     "status_count": 4,
//     "statuses": {
//       "1": "Status 1",
//       "2": "Status 2",
//       "3": "Validated",
//       "4": "Finished"
//     }
// }
router.use(express.json()).post('/create', (req, res) => {

    workflow_name = req.body.name;
    workflow_status_count = req.body.status_count;
    workflow_statuses = JSON.stringify(req.body.statuses);

    const sql = `INSERT INTO workflow (name, status_count, statuses) VALUES ('${workflow_name}', '${workflow_status_count}', '${workflow_statuses}')`;

    connection.query(sql, (err) => {
        if (err) throw err;
        console.log(`workflow ${workflow_name} is added successfully`);
        res.json({
            status: 200,
            message: `workflow ${workflow_name} is added successfully`
        });
    });
});


// Get all workflows in the DB
// api path: http://host:port/workflow/get/all
// method: GET
router.get('/get/all', (req, res) => {

    const sql = `SELECT * FROM workflow`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`workflows list is retrieved successfully`);
        res.json({
            status: 200,
            data,
            message: `workflows list is retrieved successfully`
        });
    });
});


// Get a workflow by ID
// api path: http://host:port/workflow/get/:id
// where :id = workflow id
router.get('/get/:id', (req, res) => {

    workflow_id = req.params.id;
    const sql = `SELECT * FROM workflow WHERE id='${workflow_id}'`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`workflow ${workflow_id} is retrieved successfully`);
        res.json({
            status: 200,
            data,
            message: `workflow ${workflow_id} is retrieved successfully`
        });
    });
});


// Update a workflow by ID
// api path: http://host:port/workflow/update/:id
// where :id = workflow id
// method: POST
// accepting a json data like this:
// {
//     "name": "workflow 1",
//     "status_count": 4,
//     "statuses": {
//       "1": "Status 1",
//       "2": "Status 2",
//       "3": "Validated",
//       "4": "Finished"
//     }
// }
router.use(express.json()).post('/update/:id', (req, res) => {

    workflow_id = req.params.id;
    workflow_name = req.body.name;
    workflow_status_count = req.body.status_count;
    workflow_statuses = JSON.stringify(req.body.statuses);

    const sql = `UPDATE workflow
                SET name='${workflow_name}', status_count='${workflow_status_count}', statuses='${workflow_statuses}'
                WHERE id='${workflow_id}'`;

    connection.query(sql, (err) => {
        if (err) throw err;
        console.log(`workflow ${workflow_id} is updated successfully`);
        res.json({
            status: 200,
            message: `workflow ${workflow_id} is updated successfully`
        });
    });

});


// Delete a workflow by ID
// api path: http://host:port/workflow/delete/:id
// where :id = workflow id
router.get('/delete/:id', (req, res) => {

    workflow_id = req.params.id;
    const sql = `DELETE FROM workflow WHERE id='${workflow_id}'`;

    connection.query(sql, (err) => {
        if (err) throw err;
        console.log(`workflow ${workflow_id} is deleted successfully`);
        res.json({
            status: 200,
            message: `workflow ${workflow_id} is deleted successfully`
        });
    });
});


module.exports = router;