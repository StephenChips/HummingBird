import Vue from 'vue';
import Vuex from 'vuex';
import router from './'

import sectionPage from './store/sectionPage.js';
import app from './store/app.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sectionPage,
        app
    },
});
