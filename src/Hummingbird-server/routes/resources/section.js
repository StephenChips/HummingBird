var mockRouter = require('./mock-router');

var MOCK = [
    {
        sectionId: 0,
        sectionName: 'Tech'
    },
    {
        sectionId: 1,
        sectionName: 'Life'
    }
];

module.exports = mockRouter('section', MOCK);