var express = require('express');
var seriesRoutes = express.Router('/series');

seriesRoutes.post('/', function (req, res) {
    
});

seriesRoutes.delete('/:seriesID', function (req, res) {
    
});

seriesRoutes.patch('/:seriesID', function (req, res) {

});

seriesRoutes.get('/:seriesID', function (req, res) {

});

seriesRoutes.get('/', function (req, res) {

});

module.exports = {
    routes: seriesRoutes,
    mountPath: '/series'
};
