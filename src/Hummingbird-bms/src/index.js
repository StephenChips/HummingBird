import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

import App from '@pages/App.vue';
import routes from './routes';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

export default new Vue({
  render: h => h(App),
  router: new VueRouter({ routes })
}).$mount('#app');