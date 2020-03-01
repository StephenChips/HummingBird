var express = require('express');
var generate = require('../generate');

var userRoutes = express.Router();

userRoutes.get('/:userID', function (req, res) {
    if (req.accepts('text/json')) {
        res.send(generate.oneUser());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

userRoutes.patch('/:userID', function (req, res) {
    res.send();
});

module.exports = userRoutes;