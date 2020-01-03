<template>
<div class="home">
    <h1>最新文章</h1>

    <div class="article-section">
        <section class="article-list tech">
            <h2 class="title">技术文章</h2>
            <ul v-if="techArticles && techArticles.length > 0">
                <li v-for="article of techArticles" :key="article.url">
                    <em>{{ article.publishDate }}&nbsp;»&nbsp;</em>
                    <a :href="article.url">{{ article.title }}</a>
                </li>
            </ul>
            <div v-else>暂无文章</div>
            <div class="background-text heading">Tech</div>
        </section>

        <section class="article-list life">
            <h2 class="title">生活文章</h2>
            <ul v-if="lifeArticles && lifeArticles.length > 0">
                <li v-for="article of lifeArticles" :key="article.url">
                    <em>{{ article.publishDate }}&nbsp;»&nbsp;</em>
                    <a :href="article.url">{{ article.title }}</a>
                </li>
            </ul>
            <div v-else>暂无文章</div>
            <div class="background-text heading">Life</div>
        </section>
    </div>
</div>
</template>

<script>
export default {
    name: 'Home',

    mounted () {
        this.techArticles = this.loadArticle('tech');
        this.techArticles = this.loadArticle('life');
    },

    methods: {
        loadArticle (section) {
            return []
        }
    },

    data () {
        return {
            techArticles: undefined,
            lifeArticles: undefined
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

    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Safari */
    -khtml-user-select: none;    /* Konqueror HTML */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;           /* Non-prefixed version, currently supported by Chrome and Opera */
}

.article-list ul li {
    margin-bottom: 0.5em;
}
</style>
