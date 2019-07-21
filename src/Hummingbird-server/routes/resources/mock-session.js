var loginState = false;

function setSession (state) {
    loginState = state;
}

function hasLogin () {
    return loginState;
}

module.exports = {
    setSession,
    hasLogin
};