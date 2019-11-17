const express = require('express');
const { requireLogin } = require('./utils');
const _ = require('lodash');


function mockRouter (resourceName, mockData) {
    var router = express.Router();

    router.put('/', requireLogin, function (request, response) {
        response.status(201).end();
    });
    
    router.delete('/', requireLogin, function (request, response) {
        // delete and bulk delete by ID.
        response.status(204).end();
    });
    
    router.post('/', requireLogin, function (request, response) {
        // Single update
        response.status(200).end();
    });
    
    router.get('/', function (request, response) {
        var fields = request.query['fields'];
        var keyOfResourceId = resourceName.toLowerCase() + 'Id'
        var resourceId = request.query[keyOfResourceId];
        var result;

        if (_.isEmpty(request.query)) {
            result = mockData;
        } else if (typeof resourceId === 'string') {
            result = findAndPickResources(fields);
        } else if (Array.isArray(resourceId)) {
            result = fliterAndPickResources(fields);
        } else {
            response.status(400).end();
            return;
        }

        response.send(result);

        function eligibleResources (value) {
            return value[keyOfResourceId] == resourceId;
        }

        function findAndPickResources (fields) {
            var result = mockData.find(eligibleResources);
            if (fields) {
                result = _.pick(result, fields);
            }
            return result;
        }

        function fliterAndPickResources (fields) {
            var result = mockData.filter(eligibleResources);
            if (fields) {
                result = result.filter(resource => _.pick(resource, fields));
            }
            return result;
        }
    });

    return router;
}

module.exports = mockRouter;