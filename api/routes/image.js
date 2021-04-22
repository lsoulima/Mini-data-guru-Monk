const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const axios = require('axios');
const path = require("path");
const fs = require("fs");

// create a new router
const router = express.Router();


// config the temp folder for uploaded files
const upload = multer({
    dest: path.join(__dirname, '../temp'),
});


// create a connection with mysql the DB
const connection = mysql.createConnection({
    // Config for the mysql DataBase
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'monk'
});

// a function for errors handling
const handleError = (err, res, errStatus = 500, errMessage = 'Oops! Something went wrong!') => {
    res.json({
        status: errStatus,
        error: err,
        message: errMessage
    });
};

// upload an image and add it to a workflow
// api path: http://host:port/image/upload/:wid
// where :wid = workflow id
router.post(
    '/upload/:wid',
    upload.single('image'),
    (req, res) => {
        const workflow_id = req.params.wid;
        const tempPath = req.file.path;
        const extension = path.extname(req.file.originalname).toLowerCase();
        // Create a uniq name for the uploaded image 
        let randomName = Date.now() + '-' + Math.round(Math.random() * 1E9);

        switch (extension) {
            case '.png':
                randomName += '.png';
                break;
            case '.jpeg':
                randomName += '.jpeg';
                break;
            case '.jpg':
                randomName += '.jpg';
                break;
            default:
                // in case of unvalid image abort and remove temp file
                fs.unlink(tempPath, (err) => {
                    if (err) return handleError(err, res);
                    return handleError(err, res, 403, 'Only png|jpg|jpeg files are allowed!');
                });
        }

        const targetPath = path.join(__dirname, `../uploads/${randomName}`);

        // add the image to the uploads folder
        fs.rename(tempPath, targetPath, (err) => {
            if (err) return handleError(err, res);

            const sql = `INSERT INTO images (name, wid, status) VALUES ('${randomName}', '${workflow_id}', '1')`;
            // add the image to the DB
            connection.query(sql, (err) => {
                if (err) throw err;
                console.log(`Image uploaded successfully!`);
                res.json({
                    status: 200,
                    message: `Image uploaded successfully!`
                });
            });
        });

    }
);

// Get all images of a workflow
// api path: http://host:port/image/get/all/:wid
// where :wid = workflow id
router.get('/get/all/:wid', (req, res) => {

    const wid = req.params.wid;

    const sql = `SELECT * FROM images WHERE wid='${wid}'`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`workflow ${wid} images list is retrieved successfully`);
        res.json({
            status: 200,
            data,
            message: `workflow ${wid} images list is retrieved successfully`
        });
    });
});


// serve an image by Name to client
// api path: http://host:port/image/:name
// where :name = image name
router.get("/:name", (req, res) => {
    const imageName = req.params.name;
    res.sendFile(path.join(__dirname, `../uploads/${imageName}`));
});


// Get an image from DB by ID
// api path: http://host:port/image/get/:id
// where :id = image id
router.get("/get/:id", (req, res) => {
    const imageID = req.params.id;

    const sql = `SELECT * FROM images WHERE id='${imageID}'`;

    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log(`image ${imageID} is retrieved successfully`);
        res.json({
            status: 200,
            data,
            message: `image ${imageID} is retrieved successfully`
        });
    });
});


// Update an image status
// api path: http://host:port/image/update/:id/:status
// where :id = image id
// where :status = image new status
router.get('/update/:id/:status', (req, res) => {

    image_id = req.params.id;
    image_status = req.params.status;

    const sql = `UPDATE images SET status='${image_status}' WHERE id='${image_id}'`;

    connection.query(sql, (err) => {
        if (err) throw err;
        console.log('image status is updated successfully');
        res.json({
            status: 200,
            message: 'image status is updated successfully'
        });
    });

});


// Delete an image by ID
// api path: http://host:port/image/delete/:id
// where :id = image id
router.get('/delete/:id', (req, res) => {

    const imageID = req.params.id;
    const sql = `DELETE FROM images WHERE id='${imageID}'`;
    // Get image info using an http request
    const imageInfo = axios.get(`http://localhost:3000/image/get/${imageID}`)
        .then((imageInfo) => {
            const imageName = imageInfo.data.data[0].name;
            // Remove image from DB
            connection.query(sql, (err) => {
                if (err) throw err;
                console.log('image is deleted from DB successfully');
                // Remove image from uploads folder
                fs.unlink(
                    path.join(__dirname, `../uploads/${imageName}`),
                    (err) => {
                        if (err) console.log(err);
                    }
                );
                res.json({
                    status: 200,
                    message: 'image is deleted successfully'
                });
            });
        })
        .catch((error) => {
            res.json({
                status: 400,
                message: error
            });
        });
});

// Delete all images of a workflow
// router.get('/delete/all/:wid', (req, res) => {

//     workflow_id = req.params.wid;
//     const sql = `DELETE FROM images WHERE wid='${workflow_id}'`;

//     connection.query(sql, (err) => {
//         if (err) throw err;
//         console.log('workflow images are deleted successfully');
//         res.json({
//             status: 200,
//             message: 'workflow images are deleted successfully'
//         });
//     });
// });


module.exports = router;