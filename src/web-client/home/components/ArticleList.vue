<template>
<ul class="plain list-content">
    <li class="article-list-item" v-for="article of articleList" v-bind:key="article.url">
        <input v-if="editable" type="checkbox" :checked="article.selected" @input="$emit('select-article', { article, selected: $event.target.checked })"/>
        <span>{{ article.publishDate | formatDate }}</span>
        <span>»</span>
        <a :href="article.url">{{ article.title }}</a>
    </li>
</ul>
</template>

<script>
export default {
    name: 'ArticleList',

    props: [ 'articleList', 'editable' ],

    updated () {
        console.log(this.articleList)
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
.article-list-item {
    font-size: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
}

.article-list-item:last-child {
    margin-bottom: 0;
}

.article-list-item > * {
    margin-left: 0.5rem;
}

.article-list-item > *:first-child {
    margin-left: 0;
}

</style>