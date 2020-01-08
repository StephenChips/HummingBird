import Vue from 'vue';
import VueRouter from "vue-router";

import Home from '../components/Home.vue';
import SectionPage from '../components/SectionPage.vue';
import ArticlesGroupedByYear from '../components/ArticlesGroupedByYear.vue';
import ArticlesFilteredByTag from '../components/ArticlesFilteredByTag.vue';
import SearchPage from '../components/SearchPage.vue';

var routes = [
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
                component:  ArticlesFilteredByTag,
                props: true
            }
        ]
    }
];

Vue.use(VueRouter);

export default new VueRouter({ routes });