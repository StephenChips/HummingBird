var fs = require('fs');
var path = require('path');

var express = require('express');
var cookieParser = require('cookie-parser');
var httpErrors = require('http-errors');
var morgan = require('morgan'); // HTTP request logger
var ejs = require('ejs');

var ROUTES_PATH = './routes';
var STATIC_FILES_SERVER_PATH = './public'; // the path in which static files actually be stored.
var STATIC_FILE_PUBLIC_PATH = '/public'; // the path in which web client access the static files.

function startMockServer () {
    var app = express();
    enableUtilities(app);
    setupStaticRouter(app);
    setupViewEngine(app);
    setupRouters(app);
    setUpNotFoundHandler(app);
    setUpErrorHandler(app);
    return app;
}

function enableUtilities (app) {
    app.use(cookieParser());
    // Ignore body parser yet.
    // NOTE: a real body parser should be capable to parse data in both FormData and JSON format.
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
}

function setupStaticRouter(app) {
    app.use(STATIC_FILE_PUBLIC_PATH, express.static(STATIC_FILES_SERVER_PATH));
    app.get('/favicon.ico', function (req, res) {
        res.redirect(301, '/public/images/favicon.ico');
    });
}

function setupViewEngine (app) {
    app.set('views', path.resolve(process.cwd(), './views'));
    app.set('view engine', 'ejs');
}

function setupRouters (app) {
    // load all routes in ./routes directory.
    var filedir = path.join(__dirname, ROUTES_PATH);
    var filenames = fs.readdirSync(filedir);
    for (var name of filenames) {
        var filePath = path.join(filedir, name);
        var { mountPath, routes } = require(filePath);
        app.use(mountPath, routes);
    }
}

function setUpNotFoundHandler (app) {
    app.use(function (req, res) {
        throw new httpErrors.NotFound('Not Found');
    })
}

function setUpErrorHandler (app) {
    app.use(function (err, req, res, next) {
        if (err.status == 500) {
            res.status(500).send();
        } else {
            res.status(err.status).end(err.message);
        }
    });
}

module.exports = startMockServer;