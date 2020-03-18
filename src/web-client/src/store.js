import Vue from 'vue';
import Vuex from 'vuex';

import settingPage from './store/settingPage';
import sectionPage from './store/sectionPage';
import navigation from './store/navigation';
import app from './store/app';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        navActivedLink: null,
    },

    mutations: {
        SET_NAV_ACTIVE
    },

    modules: {
        settingPage,
        sectionPage,
        app,
        navigation
    },
});
