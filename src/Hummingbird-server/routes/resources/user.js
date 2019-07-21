var express = require('express');
var { requireLogin } = require('./utils');

var router = express.Router();

var MOCK = {
    id: 'john',
    password: '123456'
};

router.post('/password', requireLogin, function (request, response) {
    response.end();
});

router.get('/password', requireLogin, function (request, response) {
    response.send({ password: MOCK.password });
})

router.get('/id', function (request, response) {
    response.send({ id: MOCK.id });
});

module.exports = router;