const express = require('express');

const workflow = require('./routes/workflow.js');
const image = require('./routes/image.js');

const router = express.Router();

// load the workflows api routes
router.use('/workflow', workflow);
// load the images api routes
router.use('/image', image);


module.exports = router;