const express = require('express');
const cors = require('cors');

const routes = require('./routes.js');

const app = express();

// Enable All CORS Requests
app.use(cors());

//load app routes
app.use('/', routes);

// server listen on port 3001
const server = app.listen(3001, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log(`server listen on ${host}:${port}`);
});
