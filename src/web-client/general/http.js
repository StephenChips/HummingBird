
export function getJSON (url, json) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.timeout = 3000;
        xhr.overrideMimeType('application/json');

        xhr.addEventListener('load', function () {
            var json = JSON.parse(xhr.responseText);

            if (xhr.status == 200) {
                resolve(json);
            } else {
                reject(json);
            }

        });

        xhr.addEventListener('timeout', function () {
            reject({ reason: 'timeout' });
        });


        xhr.open('GET', url, true);

        xhr.send(JSON.stringify(json));
    });
}
