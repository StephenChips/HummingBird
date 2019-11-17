var express = require('express');
var userRoutes = express.Router('/users');

userRoutes.get('/:userId', function (req, res) {
    res.send(MOCK_USER);
});

userRoutes.patch('/users', function (req, res) {

});

module.exports = {
    routes: userRoutes,
    mountPath: '/users'
};
