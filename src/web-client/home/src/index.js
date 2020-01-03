import Vue from 'vue';
import VueRouter from "vue-router";

import routes from './routes';

import App from '@Components/App.vue';

Vue.use(VueRouter);

new Vue({
    el: '#app',
    render: h => h(App),
    router: new VueRouter({ routes })
});
