// Routes that will be mounted at the root.
var express = require('express');

var routes = express.Router();

// Login Page
routes.get('/login', function (req, res) {
    res.render('login');
});

module.exports = {
    routes,
    mountPath: '/'
};
