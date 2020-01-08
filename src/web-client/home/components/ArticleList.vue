<template>
<ul class="plain list-content">
    <li class="article-list-item" v-for="article of articleList" v-bind:key="article.url">
        <input v-if="editable" @input="$emit('select-article', { article, selected: $event.target.selected })"/>
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

<style>
.article-list-item {
    display: flex;
}

.article-list-item > * {
    margin-left: 0.5rem;
}

</style>