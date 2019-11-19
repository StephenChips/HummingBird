var express = require('express');
var generate = require('../generate');

var jwtRoutes = express.Router();

// Routes that create a new JWT for the client.
jwtRoutes.post('/', function (req, res) {
    if (req.accepts('text/json')) {
        res.send(generate.oneJWT());
    }
});

module.exports = {
    routes: jwtRoutes,
    mountPath: '/jwt'
};
