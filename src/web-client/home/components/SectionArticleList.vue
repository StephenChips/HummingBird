<template>
<div class="section-article-list">
</div>
</template>

<script>
var componentConfig = {
    name: 'SectionArticleList',

    props: [ 'sectionName' ],

    data () {
        return {
            articleList: []
        }
    },

    methods: {
        reloadArticleList (listName) {
            return new Promise.resolve();
        }
    },

    watch: {
        sectionName (from, to) {
            if (from !== to) {
                reloadArticleList(to);
            }
        }
    }
};

export default componentConfig;

</script>

<style scoped>

</style>
