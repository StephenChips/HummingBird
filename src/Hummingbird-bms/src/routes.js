import ArticleManagePage from '@pages/ArticleManagePage.vue';
import SettingPage from '@pages/SettingPage.vue';
import AMPContent from '@components/AMPContent.vue';

export default [{
    path: '/articles',
    component: ArticleManagePage,
    children: [{
        path: ':sectionId',
        component: AMPContent
    }, {
        path: '',
        component: AMPContent
    }]
}, {
    path: '/settings',
    component: SettingPage
}];
