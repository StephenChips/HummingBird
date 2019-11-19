const express = require('express');
const generate = require('../generate');

var sectionRoutes = express.Router();

sectionRoutes.post('/', function (req, res) {
    res.send();
});

sectionRoutes.delete('/:sectionID', function (req, res) {
    res.send();
});

sectionRoutes.patch('/:sectionID', function (req, res) {
    res.send();
});

sectionRoutes.get('/:sectionID', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.oneSection());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

sectionRoutes.get('/', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.multipleSections());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

module.exports = {
    routes: sectionRoutes,
    mountPath: '/sections'
};