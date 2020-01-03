<!-- This component can list articles grouped by year. -->

<template>
<div class="yearly-article-list">
    <div class="article-list" v-for="articles of data" :key="articles.year">
        <h2 class="title heading">{{ articles.year | formatYear }}</h2>
        <ul class="plain list-content">
            <li v-for="article of articles.data" :key="article.url">
                <span>{{ article.publishDate | formatDate }}</span>
                <span>»</span>
                <a :href="article.url">{{ article.title }}</a>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import faker from 'faker';

export default {
    name: 'YearlyArticleList',

    mounted () {
        this.data = this.loadData(this.$route.params.section);
    },

    /**
     *  data type:
     *  [
     *      {
     *          year: Number,
     *          data: [
     *              {
     *                  publishDate: string,
     *                  title: string,
     *                  url: string
     *              }
     *          ]
     *      }
     *  ]
     */

    data () {
        return {
            data: null
        }
    },

    methods: {
        loadData () {
            return [
                {
                    year: 2020,
                    data: [
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+1'
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
                    ]
                },
                {
                    year: 2019,
                    data: [
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+4'
                        },
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+5'
                        },
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+6'
                        },
                    ]
                },
                {
                    year: 2018,
                    data: [
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+7'
                        },
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+8'
                        },
                        {
                            publishDate: new Date(),
                            title: 'hello world',
                            url: '/article/hello+world+9'
                        },
                    ]
                }
            ];
        }
    },

    filters: {
        formatDate (date) {
            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            return `${yyyy}/${mm}/${dd}`;
        },

        formatYear (year) {
            var currentYear = new Date().getFullYear();
            if (year == currentYear) {
                return '最新文章';
            } else {
                return String(year);
            }
        }
    }
}
</script>

<style scoped>

.article-list > .title {
    margin-bottom: 1rem;
    border-bottom: 1px #D4D4D4 solid;
}
</style>
