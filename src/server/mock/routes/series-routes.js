const express = require('express');
const generate = require('../generate');

var seriesRoutes = express.Router();

seriesRoutes.post('/', function (req, res) {
    res.send();
});

seriesRoutes.delete('/:seriesID', function (req, res) {
    res.send();
});

seriesRoutes.patch('/:seriesID', function (req, res) {
    res.send();
});

seriesRoutes.get('/:seriesID', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.oneSeries());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

seriesRoutes.get('/', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send('');
    } else if (acceptedType == 'text/json') {
        res.send(generate.multipleSeries());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

module.exports = {
    routes: seriesRoutes,
    mountPath: '/series'
};
