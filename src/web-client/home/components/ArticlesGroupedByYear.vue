<!-- This component can list articles grouped by year. -->

<template>
<div class="article-list-group-by-year">
    <div class="article-list-of-year" v-for="articlesOfYear of groupedArticles" :key="articlesOfYear.year">
        <h2 class="title heading">{{ articlesOfYear.year | formatYear }}</h2>
        <ArticleList
            :editable="editable"
            :articleList="articlesOfYear.data"
            @select-article="selectArticle"
        ></ArticleList>
    </div>
</div>
</template>

<script>
import ArticleList from './ArticleList.vue';
import { mapState, mapActions } from 'vuex';

function groupArticlesByYear (articleList) {
    if (articleList.length === 0) {
        return result;
    }

    var result = [];
    var yearOffset = getPublishYearOfArticle(articleList[0]);

    for (var article of articleList) {
        var publishYear = getPublishYearOfArticle(article);
        var entry = accessOrCreateEntry(result, publishYear - yearOffset);
        entry.data.push(article);
    }

    return result;

    function getPublishYearOfArticle (article) {
        return new Date(article.publishDate).getFullYear();
    }

    function accessOrCreateEntry (arr, index) {
        if (!arr[index]) {
            arr[index] = {
                year: publishYear,
                data: []
            };
        }
        return arr[index];
    }
}

export default {
    name: 'ArticlesGroupedByYear',

    props: [ 'sectionID' ],

    created () {
        this.$store.dispatch('sectionPage/loadArticles');
    },

    methods: {
        selectArticle ({ article, selected }) {
            this.$store.commit('section/selectArticle', { article, selected });
        },
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

    computed: {
        ...mapState({
            editable: state => state.sectionPage.editable,
            groupedArticles: state => groupArticlesByYear(state.sectionPage.articleList)
        })
    },

    components: { ArticleList }
}
</script>

<style scoped>

.article-list-of-year > .title {
    margin-bottom: 1rem;
    border-bottom: 1px #D4D4D4 solid;
}
</style>
