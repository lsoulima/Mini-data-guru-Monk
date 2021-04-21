const express = require('express');
const app = express();

const workflow = require('./routes/workflow.js');

app.use('/workflow', workflow);

const server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`server listen on ${host}:${port}`);
});