const JWT_KEY = 'HUMMINGBIRD_JWT_TOKEN';

const fakeUser = {
    username: 'jack',
    password: '123456'
};

export const LoginState = Object.freeze({
    SUCCESS: 'SUCCESS',
    USER_NOT_EXISTS: 'USER_NOT_EXISTS',
    PASSWORD_INCORRECT: 'PASSWORD_INCORRECT'
});

export class Auth {
    async login ({ username, password }) {
        if (username === fakeUser.username && password === fakeUser.password) {
            window.sessionStorage.setItem(JWT_KEY, username + '@' + password);
            return LoginState.SUCCESS;
        } else if (username !== fakeUser.username) {
            throw new Error(LoginState.USER_NOT_EXISTS);
        } else if (password !== fakeUser.password) {
            throw new Error(LoginState.PASSWORD_INCORRECT);
        }
    }

    logout () {
        window.sessionStorage.removeItem(JWT_KEY);
    }

    get jwt () {
        return this._jwt;
    }

    get hasLogin () {
        return window.sessionStorage.getItem(JWT_KEY) !== null;
    }
};
