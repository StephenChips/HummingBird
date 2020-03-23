import Vue from 'vue';
import VueRouter from "vue-router";

import Home from '../components/Home.vue';
import LoginPage from '../components/LoginPage.vue';
import SectionPage from '../components/SectionPage.vue';
import NavigationView from '../components/NavigationView.vue';
import ArticlePage from '../components/ArticlePage.vue';
import SettingPage from '../components/setting/SettingPage.vue';
import AccountSetting from '../components/setting/AccountSetting.vue';
import ArticleEditPage from '../components/ArticleEditPage/index.vue';
import NotFoundPage from '../components/NotFoundPage/index.vue';

import { Auth } from './auth';

var routes = [
    {
        path: '/404',
        component: NotFoundPage
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/articles',
        redirect: '/404'
    },
    {
        path: '/articles/:articleID/edit',
        component: ArticleEditPage,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/articles/new',
        component: ArticleEditPage,
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/articles/:articleID',
        component: ArticlePage
    },
    {
        path: '/settings',
        component: SettingPage,
        redirect: '/settings/account',
        meta: {
            requireLogin: true
        },
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
                component: Home
            },
            {
                path: '/:sectionID',
                component: SectionPage,
            },
        ]
    }
];

Vue.use(VueRouter);

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireLogin)) {
        var auth = new Auth();
        if (auth.hasLogin) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
