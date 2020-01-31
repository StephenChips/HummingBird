import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';

import App from '@Components/App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
});
