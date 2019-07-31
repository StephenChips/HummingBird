<template>
    <b-list-group class="amp-article-list">
        <b-list-group-item
            v-for="article of articles" :key="article.id"
            class="amp-article-list-item">

            <b-form-checkbox>
            </b-form-checkbox>

            <b-link><i class="fas fas-times"></i></b-link>

            <h5>{{ article.title }}</h5>

            <div>{{ article.publicDate }}</div>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    name: 'amp-article-list',

    data () {
        return {
            articles: [{
                id: 1,
                title: 'Foo Bar',
                publicDate: '2019/2/3'
            }, {
                id: 2,
                title: 'Foo Bar',
                publicDate: '2019/2/3'
            }, {
                id: 3,
                title: 'Foo Bar',
                publicDate: '2019/2/3'
            }, {
                id: 4,
                title: 'Foo bar',
                publicDate: '2019/2/3'
            }, {
                id: 5,
                title: 'Foo',
                publicDate: '2019/2/3'
            }]
        }
    }
}
</script>

<style>

</style>
