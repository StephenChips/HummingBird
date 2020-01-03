<template>
<div class="tag-article-list">
    <h2>标签：{{ tag }}</h2>
    <ul class="plain list-content">
        <li v-for="article of data" :key="article.url">
            <span>{{ article.publishDate | formatDate }}</span>
            <span>»</span>
            <a :href="article.url">{{ article.title }}</a>
        </li>
    </ul>
</div>
</template>

<script>


export default {
    name: 'TagArticleList',

    mounted () {
        this.section = this.$route.params.section;
        this.tag = this.$route.params.tag;
        this.data = this.loadArticleList(this.$route.params.section, this.$route.params.tag);
    },

    data () {
        return {
            section: '',
            tag: '',
            data: null
        };
    },

    methods: {
        loadArticleList (section, tag) {
            return [
                {
                    publishDate: new Date(),
                    title: 'hello world',
                    url: '/article/hello+world'
                },
                {
                    publishDate: new Date(),
                    title: 'hello world',
                    url: '/article/hello+world+2'
                },
                {
                    publishDate: new Date(),
                    title: 'hello world',
                    url: '/article/hello+world+3'
                },
            ];
        }
    },

    watch: {
        $route (from, to) {
            this.section = this.$route.params.section;
            this.tag = this.$route.params.tag;
            this.data = this.loadArticleList(this.$route.params.section, this.$route.params.tag);
        }
    },

    filters: {
        formatDate (date) {
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            return `${yyyy}/${mm}/${dd}`;
        }
    }
}
</script>

<style scoped>
</style>
