import request from '../request';
import { Auth } from '../auth';

export default {
    namespaced: true,

    state: {
        currentSection: null,
        hasLogin: false
    },

    mutations: {
        setCurrentSection (state, { section }) {
            state.currentSection = section;
        },

        login (state) {
            state.hasLogin = true;
        },

        logout (state) {
            state.hasLogin = false;
        }
    },

    actions: {
        loadCurrentSectionInfo({ commit }, { sectionID }) {
            return request.getSection(sectionID)
                .then(section => {
                    // @type
                    // { url: string, id: string, name: string }
                    commit('setCurrentSection', { section });
                });
        },

        login ({ commit }, { username, password }) {
            return new Auth().login({ username, password })
                .then(() => {
                    commit('login');
                });
        },

        logout ({ commit }) {
            new Auth().logout();
            commit('logout');
            return;
        }
    }
};
