const JWT_KEY = 'HUMMINGBIRD_JWT_TOKEN';

export class JWTAuth {
    constructor () {
        this._jwt = window.localStorage.getItem(JWT_KEY);
    }

    async requestJWT () {
        return null;
    }

    clearJWT () {
        this._jwt = null;
    }


    store () {

    }

    _recover () {

    }

    get jwt () {
        return this._jwt;
    }

    get hasAuthorized () {
        this._jwt !== null;
    }
};
