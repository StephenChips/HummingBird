import Home from '../components/Home.vue';
import SectionPage from '../components/SectionPage.vue';
import YearlyArticleList from '../components/YearlyArticleList.vue';
import TagArticleList from '../components/TagArticleList.vue';
import SearchPage from '../components/SearchPage.vue';

export default [
    {
        path: '/',
        component: Home
    },
    {
        path: '/search',
        component: SearchPage
    },
    {
        path: '/:section',
        component: SectionPage,
        children: [
            {
                path: '',
                component: YearlyArticleList
            },
            {
                path: ':tag',
                component: TagArticleList,
            }
        ]
    }
];
