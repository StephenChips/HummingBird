export const SettingPages = Object.freeze({
    ACCOUNT_CHANGE_PASSWORD: 'ACCOUNT_CHANGE_PASSWORD'
});

export default {
    namespaced: true,

    state: {
        activedPage: ''
    },

    mutations: {
        setActivedPage (state, { activedPage }) {
            state.activedPage = activedPage;
        }
    }
}