import Vue from 'vue';
import Vuex from 'vuex';

import settingPage from './store/settingPage';
import sectionPage from './store/sectionPage';
import app from './store/app';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        settingPage,
        sectionPage,
        app
    },
});
