<template>
<div class="home">
    <h1>最新文章</h1>

    <div class="article-section">
        <section class="article-list tech">
            <h2 class="title">技术文章</h2>
            <ul v-if="techArticles && techArticles.length > 0">
                <li v-for="article of techArticles" :key="article.url">
                    <em>{{ article.publishDate | formatDate }}&nbsp;»&nbsp;</em>
                    <router-link :to="getArticleId(article.articleId)">{{ article.title }}</router-link>
                </li>
            </ul>
            <div v-else>暂无文章</div>
            <div class="background-text heading">Tech</div>
        </section>

        <section class="article-list life">
            <h2 class="title">生活文章</h2>
            <ul v-if="lifeArticles && lifeArticles.length > 0">
                <li v-for="article of lifeArticles" :key="article.url">
                    <em>{{ article.publishDate | formatDate }}&nbsp;»&nbsp;</em>
                    <router-link :to="getArticleId(article.articleId)">{{ article.title }}</router-link>
                </li>
            </ul>
            <div v-else>暂无文章</div>
            <div class="background-text heading">Life</div>
        </section>
    </div>
</div>
</template>

<script>
import request from '../src/request';

export default {
    name: 'Home',

    async created () {
        this.$store.dispatch('app/loadCurrentSectionInfo', { sectionID: 'home' });
        this.lifeArticles = await request.getArticlesBySection('life', [ 0, 10 ]);
        this.techArticles = await request.getArticlesBySection('tech', [ 0, 10 ]);
    },

    data () {
        return {
            techArticles: [],
            lifeArticles: []
        }
    },

    methods: {
        getArticleId (articleId) {
            return `/articles/${articleId}`;
        }
    },

    filters: {
        formatDate (timestamp) {
            var date = new Date(timestamp);
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            return `${yyyy}/${mm}/${dd}`;
        }
    }
}
</script>

<style scoped>

.home {
    width: 1080px;
    margin: 0 auto;
}

.article-section {
    display: flex;
    justify-content: space-between;
}

.article-section > * {
    flex: 1;
    margin-right: 3rem;
}

.article-section > *:last-child {
    margin-right: 0;
}

.article-list {
    position: relative;
    border-bottom: 1px #D4D4D4 solid;
    min-height: 10rem;
}

.article-list .background-text {
    position: absolute;
    bottom: -1rem;
    right: 2rem;
    color: rgba(0, 0, 0, 0.1);
    font-size: 8rem;
    user-select: none;
}

.article-list ul li {
    margin-bottom: 0.5em;
}
</style>
