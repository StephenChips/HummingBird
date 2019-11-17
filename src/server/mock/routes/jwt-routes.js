var express = require('express');
var jwtRoutes = express.Router();

// Routes that create a new JWT for the client.
jwtRoutes.post('/generator', function (req, res) {

});

module.exports = {
    routes: jwtRoutes,
    mountPath: '/jwt'
};
