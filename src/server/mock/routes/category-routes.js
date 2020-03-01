const express = require('express');
const generate = require('../generate');

var categoryRoutes = express.Router();

categoryRoutes.post('/', function (req, res) {
    res.send();
});

categoryRoutes.delete('/:categoryID', function (req, res) {
    res.send();
});

categoryRoutes.patch('/:categoryID', function (req, res) {
    res.send();
});

categoryRoutes.get('/:categoryID', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.onecategory());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

categoryRoutes.get('/', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.multiplecategory());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

module.exports = categoryRoutes;
