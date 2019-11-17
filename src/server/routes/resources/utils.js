const mockSession = require('./mock-session')

function requireLogin (request, response, next) {
    if (mockSession.hasLogin()) {
        next();
    } else {
        next(httpErrors.Unauthorized());
    }
}

module.exports = {
    requireLogin
};
