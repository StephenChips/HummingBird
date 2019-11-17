var options = {
    setDefault () {
        this.runningMode = 'production';
    },
    setFromCommandLine () {
        var args = process.argv.slice(2);
        while (args.length > 0) {
            var name = args[0];
            if (name == '-m' || name == '--mode') {
                this.runningMode = parseRunningMode(args);
            } else {
                throw new Error(`Error: unknown command line option ${optionName}.`);
            }
        }
    },
    setupAndFreeze () {
        this.setDefault();
        this.setFromCommandLine();
        Object.freeze(this);
    }
};

function isValidMode (mode) {
    return mode == 'production' || mode == 'development' || mode == 'mock';
}
  
function parseRunningMode (args) {
    var name = args.shift();
    if (args.length < 1) {
        throw new Error(`Error: option ${name} requires one argument.`);
    }
    var mode = args[0];
    if (isValidMode(mode)) {
        return args.shift();
    }
    throw new Error(`Error: '${mode}' isn't a valid mode.`);
}

module.exports = options;