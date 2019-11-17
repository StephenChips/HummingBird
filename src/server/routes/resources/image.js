const mockRouter = require('./mock-router');

const MOCK = [
    {
        imageId: 0,
        url: '/image/super.img',
        refArticlesId: [1, 2, 3]
    },
    {
        iamgeId: 1,
        url: '/image/awesome.img',
        refArticlesId: [1, 3]
    }
];

module.exports = mockRouter('image', MOCK);