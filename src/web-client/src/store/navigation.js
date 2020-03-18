export default {
    namespaced: true,

    state: {
        activedLink: null,
        navLinks: []
    },

    mutations: {
        SET_ACTIVED_LINKS (state, { activedLink }) {
            state.activedLink = activedLink;
        },

        SET_NAV_LINKS (state, { navLinks }) {
            state.navLinks = navLinks;
        }
    }
}
