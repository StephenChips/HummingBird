(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var alert = initializeAlert();
        initialzeFormSubmission();
        alert.hide();

        function initializeAlert () {
            var alert = document.getElementById('login-failed-alert');
            var closeButton = alert.getElementsByClassName('close')[0];
            var controller = {
                _timeout: null,
                hide () {
                    alert.classList.add('hide');
                    if (typeof this._timeout == 'number') {
                        clearTimeout(this._timeout);
                    }
                },
                show (text) {
                    var alertTextEl = alert.getElementsByClassName('alert-text')[0];
                    alertTextEl.textContent = text;
                    alert.classList.remove('hide');
                    this._hideAfterMilliSec(5000);
                },
                toggle () {
                    alert.classList.toggle('hide');
                },
                _hideAfterMilliSec (ms) {
                    if (typeof this._timeout == 'number') {
                        clearTimeout(this._timeout);
                    }
                    this._timeout = setTimeout(function hideAlert () {
                        alert.classList.add('hide');
                        this._timeout = null;
                    }, ms);
                }
            };

            closeButton.addEventListener('click', function () {
                controller.hide();
            })

            return controller;
        }

        function initialzeFormSubmission () {
            var loginForm = document.getElementById('login-form');
            var inputElements = loginForm.getElementsByTagName('input');

            loginForm.addEventListener('submit', handleSubmission);

            for (var el of inputElements) {
                el.addEventListener('input', function () {
                    alert.hide();
                    loginForm.classList.remove('was-validated');
                });
            }
        }

        function handleSubmission () {
            event.preventDefault();
            event.stopPropagation();

            var loginForm = document.getElementById('login-form');
            if (!loginForm.checkValidity()) {
                loginForm.classList.add('was-validated')
                return;
            }

            var userName = document.getElementById('user-name-input').value;
            var password = document.getElementById('password-input').value;
            requestJWT(userName, password)
                .then(storeJWT)
                .then(redirectToHomePage)
                .catch(function (reason) {
                    if (reason == 'user not exists') {
                        alert.show('用户不存在！');
                    } else if (reason == 'wrong password') {
                        alert.show('密码错误！');
                    } else if (reason == 'timeout') {
                        alert.show('网络超时！');
                    }
                });
        }

        function storeJWT (jwt) {
            sessionStorage.setItem('jwt', jwt);
        }

        function redirectToHomePage () {
            location.replace('/');
        }

        function requestJWT (userName, password) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/jwt');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.timeout = 30000;
                xhr.addEventListener('load', function () {
                    var response = JSON.parse(xhr.response);
                    if (xhr.status == 200) {
                        resolve(response.jwt);
                    } else {
                        reject(response.reason);
                    }
                });
                xhr.addEventListener('timeout', function () {
                    reject('timeout');
                });
                xhr.send(JSON.stringify({
                    uid: userName,
                    pwd: password
                }));
            });
        }
    });
})();
