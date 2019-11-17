const express = require('express');
const mockSession = require('./mock-session');

const router = express.Router();

router.put('/', function (request, response) {
    mockSession.setSession(true);
    response.status(201).end();
});

router.delete('/', function (request, response) {
    mockSession.setSession(false);
    response.status(204).end();
});

module.exports = router;