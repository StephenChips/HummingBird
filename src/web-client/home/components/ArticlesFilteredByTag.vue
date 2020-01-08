<template>
<div class="article-list-filtered-by-tag">
    <h2 v-if="currentTag">标签：{{ currentTag.name }}</h2>
    <ArticleList
        :editable="editable"
        :articleList="articleList"
        @select-article="selectArticle"
    ></ArticleList>
</div>
</template>

<script>
import ArticleList from './ArticleList.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import request from '../src/request';

export default {
    name: 'ArticlesFilteredByTag',

    props: [ 'sectionID', 'tagID' ],

    created () {
        this.$store.dispatch('sectionPage/loadArticles');
    },

    methods: {
        selectArticle ({ article, selected }) {
            this.$store.commit('section/selectArticle', { article, selected });
        }
    },

    computed: {
        ...mapState('sectionPage', { 
            articleList: state => state.articleList,
            editable: state => state.editable,
            currentTag: state => state.currentTag
        })
    },

    components: { ArticleList }
}
</script>

<style scoped>
</style>
