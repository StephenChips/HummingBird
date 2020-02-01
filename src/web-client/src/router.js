import Vue from 'vue';
import VueRouter from "vue-router";

import Home from '../components/Home.vue';
import LoginPage from '../components/LoginPage.vue';
import SectionPage from '../components/SectionPage.vue';
import ArticlesGroupedByYear from '../components/ArticlesGroupedByYear.vue';
import ArticlesFilteredByTag from '../components/ArticlesFilteredByTag.vue';
import SearchPage from '../components/SearchPage.vue';
import NavigationView from '../components/NavigationView.vue';
import ArticlePage from '../components/ArticlePage.vue';
import SettingPage from '../components/setting/SettingPage.vue';
import AccountSetting from '../components/setting/AccountSetting.vue';

var routes = [
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/articles/:articleID',
        component: ArticlePage
    },
    {
        path: '/settings',
        component: SettingPage,
        redirect: '/settings/account',
        children: [
            {
                path: 'account',
                component: AccountSetting
            }
        ]
    },
    {
        path: '/',
        component: NavigationView,
        children: [
            {
                path: '/',
                redirect: '/home',
            },
            {
                path: '/home',
                component: Home
            },
            {
                path: '/search',
                component: SearchPage
            },
            {
                path: '/:sectionID',
                component: SectionPage,
                children: [
                    {
                        path: '',
                        component: ArticlesGroupedByYear,
                        props: true
                    },
                    {
                        path: ':tagID',
                        component: ArticlesFilteredByTag
                    }
                ]
            },
        ]
    }
];

Vue.use(VueRouter);

export default new VueRouter({ routes });
