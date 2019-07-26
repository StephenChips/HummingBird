import Vue from 'vue';
import App from '@pages/App.vue';

export default new Vue ({
    render: createElement => createElement(App)
}).$mount('#app');