var express = require('express');
var httpErrors = require('http-errors');
var generate = require('../generate');

var articleRoutes = express.Router();

articleRoutes.post('/', function (req, res) {
    res.send();
});

articleRoutes.delete('/:articleID', function (req, res) {
    res.send();
});

articleRoutes.patch('/:article', function (req, res) {
    res.send();
});

articleRoutes.get('/about', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send(''); // TODO
    } else if (acceptedType == 'text/json') {
        var data = generate.oneArticle();
        res.send(data)
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

articleRoutes.patch('/about', function (req, res) {
    res.send();
});

articleRoutes.get('/:articleID', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send(''); // TODO
    } else if (acceptedType == 'text/json') {
        var data = generate.oneArticle();
        res.send(data)
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

articleRoutes.get('/', function (req, res) {
    var acceptedType = req.accepts(['text/json', 'text/html']);
    if (acceptedType == 'text/html') {
        res.send(''); // TODO
    } else if (acceptedType == 'text/json') {
        res.send(generate.multipleArticles());
    } else {
        throw new httpErrors.NotAcceptable();
    }
});

module.exports = {
    routes: articleRoutes,
    mountPath: '/articles'
};
