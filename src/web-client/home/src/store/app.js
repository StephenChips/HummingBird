import request from '../request';

export default {
    namespaced: true,

    state: {
        currentSection: null
    },

    mutations: {
        setCurrentSection (state, { section }) {
            state.currentSection = section;
        },
    },

    actions: {
        loadCurrentSectionInfo({ commit }, { sectionID }) {
            return request.getSection(sectionID)
                .then(section => {
                    // @type
                    // { url: string, id: string, name: string }
                    commit('setCurrentSection', { section });
                });
        }
    }
};