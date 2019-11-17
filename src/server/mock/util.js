module.exports = {
    mockedRequestHandlers: {
        responseNothing(req, res) {
            res.status(200).end();
        }
    }
}