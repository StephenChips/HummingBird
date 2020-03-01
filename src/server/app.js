var MockServer = require('./mock/mock-server');
var options = require('./options.js');

var DevelopmentServer = notImplementedYet('development server');
var ProductionServer = notImplementedYet('production server');

var PORT = 3000;

try {
    options.setup();
} catch (e) {
    console.log(e.message);
    process.exit(1);
}

var app;

if (options.runningMode == 'mock') {
    // enable mock server
    app = MockServer();
} else if (options.runningMode == 'development') {
    app = DevelopmentServer();
} else if (options.runningMode == 'production') {
    app = ProductionServer();
} else {
    process.exit(1);
}

app.listen(PORT, function () {
    console.log(`Server has been started successfully at ${PORT} port.`)
});

function notImplementedYet (thing) {
    return function () {
        console.log(`The ${thing} is not implemented yet.`);
        process.exit(1);
    }
}
