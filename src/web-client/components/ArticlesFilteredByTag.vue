<template>
<div class="article-list-filtered-by-tag">
    <div class="edit-panel" v-if="hasLogin">
        <button class="primary" @click="createArticle">新建文章</button>
        <button class="secondary" @click="deleteArticles">删除文章</button>
    </div>

    <ArticleList
        :editable="hasLogin"
        :articleList="articleList"
        @select-article="selectArticle"
    ></ArticleList>

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
import Paginate from './Paginate.vue';
import { mapState } from 'vuex';
import request from '../src/request';

function addPropSelected (article, set) {
    return {
        selected: set.includes(article.url),
        ...article
    };
}

export default {
    name: 'ArticlesFilteredByTag',

    props: [ 'sectionID', 'tagID' ],

    data () {
        return {
            currentPage: 1
        };
    },

    created () {
        this.$store.commit('sectionPage/clearArticleSelection');
        this.$store.dispatch('sectionPage/loadTotalPageCount');
        this.$store.dispatch('sectionPage/loadArticles');
    },

    methods: {
        createArticle () {
            console.log('createArticle');
        },

        selectArticle ({ article, selected }) {
            this.$store.commit('sectionPage/selectArticle', { articleURL: article.url, selected });
        },

        deleteArticles () {
            return this.$store.dispatch('sectionPage/removeAllSelectedArticle');
        }
    },

    watch: {
        currentPage (newPage, oldPage) {
            this.$store.dispatch('sectionPage/loadArticles', { page: newPage });
        }
    },

    computed: {
        // FIXME failed to use Object-like collection
        ...mapState('sectionPage', {
            totalPageCount: state => state.totalPageCount,
            currentTag: state => state.currentTag,
            selectedArticles: state => state.selectedArticles,
            articleList: ({ articleList, selectedArticles }) => articleList.map(article => addPropSelected(article, selectedArticles))
        }),

        ...mapState('app', {
            hasLogin: state => state.hasLogin
        })
    },

    components: {
        ArticleList,
        Paginate,
        'el-pagination': Pagination
    }
}
</script>

<style scoped>
.paginate-wrapper {
    display: block;
    text-align: center;
}

.paginate-inner-wrapper {
    width: auto;
    display: inline-block;
    text-align: left;
}

.paginate {
    margin-top: 2rem;
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
