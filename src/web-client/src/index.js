import "regenerator-runtime/runtime";

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';

import App from '@Components/App.vue';
import { Auth } from "./auth";

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store,

    created () {
        this.initStore();
    },

    methods: {
        initStore () {
            var auth = new Auth();
            if (auth.hasLogin) {
                this.$store.commit('app/login');
            }
        }
    }
});
