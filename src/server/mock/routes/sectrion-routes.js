var express = require('express');
var sectionRoutes = express.Router();

sectionRoutes.post('/', function (req, res) {

});

sectionRoutes.delete('/:sectionID', function (req, res) {
    
});

sectionRoutes.patch('/:sectionID', function (req, res) {

});

sectionRoutes.get('/:sectionID', function (req, res) {

});

sectionRoutes.get('/', function (req, res) {

});

module.exports = {
    routes: sectionRoutes,
    mountPath: '/sections'
};