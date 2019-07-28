const { ncp } = require('ncp');
const path = require('path');

ncp.limit = 16;

function copyFiles (src, dest) {
    return new Promise(function (resolve, reject) {
        ncp(src, dest, { stopOnErr: true }, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve('done');
            }
        });
    });
}

const JS_SRC_FOLDER =  path.resolve(__dirname, './dist/javascripts');
const JS_DEST_FOLDER = path.resolve(__dirname, '../Hummingbird-server/public/javascripts');

const HTML_SRC_FOLDER = path.resolve(__dirname, './dist/index.html');
const HTML_DEST_FOLDER = path.resolve(__dirname, '../Hummingbird-server/views/spa/bms.html');

Promise.all([
    copyFiles(JS_SRC_FOLDER, JS_DEST_FOLDER),
    copyFiles(HTML_SRC_FOLDER, HTML_DEST_FOLDER)
]).then(function () {
    console.log('Finish!');
}).catch(function (err) {
    console.log(err);
});
