var fs = require('fs');
var path = require('path');

var express = require('express');
var cookieParser = require('cookie-parser');
var httpErrors = require('http-errors');
var morgan = require('morgan'); // HTTP request logger

var articleRoutes = require('./routes/article-rotues');
var categoryRoutes = require('./routes/category-routes');
var jwtRoutes = require('./routes/jwt-routes');
var sectionRoutes = require('./routes/section-routes');
var userRoutes = require('./routes/user-routes');

function startMockServer () {
    var app = express();
    enableUtilities(app);
    setupRoutes(app);
    setUpErrorHandler(app);
    return app;
}

function enableUtilities (app) {
    app.use(cookieParser());
    // Ignore body parser yet.
    // NOTE: a real body parser should be capable to parse data in both FormData and JSON format.
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

function setupRoutes (app) {
    var apiRouter = express.Router();

    apiRouter.use('/articles', articleRoutes);
    apiRouter.use('/categories', categoryRoutes);
    apiRouter.use('/jwt', jwtRoutes);
    apiRouter.use('/sections', sectionRoutes);
    apiRouter.use('/users', userRoutes);

    app.use('/api', apiRouter);
}

function setUpErrorHandler (app) {
    app.use(function (req, res) {
        throw new httpErrors.NotFound('Not Found');
    })
    app.use(function (err, req, res, next) {
        if (err.status == 500) {
            res.status(500).send();
        } else {
            res.status(err.status).end(err.message);
        }
    });
}

module.exports = startMockServer;