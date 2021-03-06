<!-- This component can list articles grouped by year. -->

<template>
<div class="article-list-group-by-year">
    <div class="edit-panel" v-if="hasLogin">
        <button class="primary" @click="$router.push('/articles/new')">新建文章</button>
        <button class="secondary" @click="deleteArticles">删除文章</button>
    </div>

    <div class="article-list-of-year" v-for="articlesOfYear of groupedArticles" :key="articlesOfYear.year">
        <h2 class="title heading">{{ articlesOfYear.year | formatYear }}</h2>
        <ArticleList
            :editable="hasLogin"
            :articleList="articlesOfYear.data"
            @select-article="selectArticle"
        ></ArticleList>
    </div>

    <div class="paginate-wrapper">
        <div class="paginate-inner-wrapper">
            <el-pagination
                layout="prev, pager, next"
                :page-count="totalPageCount"
                :current-page.sync="currentPage"
                hide-on-single-page
                background
            ></el-pagination>
        </div>
    </div>
</div>
</template>

<script>
import { Pagination } from 'element-ui';
import ArticleList from './ArticleList.vue';
import { mapState } from 'vuex';

function groupArticlesByYear (articleList) {
    if (articleList.length === 0) {
        return result;
    }

    var result = [];
    var yearOffset = getPublishYearOfArticle(articleList[0]);

    for (var article of articleList) {
        var publishYear = getPublishYearOfArticle(article);
        var entry = accessOrCreateEntry(result, publishYear);
        entry.data.push(article);
    }

    return result;

    function getPublishYearOfArticle (article) {
        return new Date(article.publishDate).getFullYear();
    }

    function accessOrCreateEntry (arr, year) {
        var index = Math.abs(year - yearOffset);
        if (!arr[index]) {
            arr[index] = {
                year: publishYear,
                data: []
            };
        }
        return arr[index];
    }
}

function addPropSelected (article, set) {
    return {
        selected: set.includes(article.url),
        ...article
    };
}

export default {
    name: 'ArticlesGroupedByYear',

    props: [ 'sectionID' ],

    data () {
        return {
            currentPage: 1
        };
    },

    created () {
        this.$store.commit('sectionPage/clearArticleSelection');
        this.$store.dispatch('sectionPage/loadArticles');
        this.$store.dispatch('sectionPage/loadTotalPageCount');
    },

    methods: {
        selectArticle ({ article, selected }) {
            this.$store.commit('sectionPage/selectArticle', { articleURL: article.url, selected });
        },

        deleteArticles () {
            return this.$store.dispatch('sectionPage/removeAllSelectedArticle');
        }
    },

    filters: {
        formatYear (year) {
            var currentYear = new Date().getFullYear();
            if (year == currentYear) {
                return '最新文章';
            } else {
                return String(year);
            }
        }
    },

    watch: {
        currentPage (newPage, oldPage) {
            this.$store.dispatch('sectionPage/loadArticles', { page: newPage });
        }
    },

    computed: {
        ...mapState('sectionPage', {
            totalPageCount: state => state.totalPageCount,
            selectedArticles: state => state.selectedArticles,
            groupedArticles: ({ articleList, selectedArticles }) => groupArticlesByYear(articleList.map(article => addPropSelected(article, selectedArticles)))
        }),
        ...mapState('app', {
            hasLogin: state => state.hasLogin
        })
    },

    components: {
        'el-pagination': Pagination,
        ArticleList
    }
}
</script>

<style scoped>

.article-list-of-year > .title {
    margin-bottom: 1rem;
    border-bottom: 1px #D4D4D4 solid;
}

.paginate-wrapper {
    text-align: center;
}

.paginate-inner-wrapper {
    display: inline-block;
}

.edit-panel > button {
    padding: 10px 14px;
    font-size: 15px;
    margin-right: 5px;
}

.edit-panel > button:last-child {
    margin-right: 0;
}
</style>
