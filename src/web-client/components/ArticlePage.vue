<template>
<div class="article-page" v-if="hasPageLoaded">
    <nav>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tech' }">技术区</el-breadcrumb-item>
            <el-breadcrumb-item>此文章</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button v-if="hasLogin" type="text" @click="$store.dispatch('app/logout')">登出</el-button>
        <el-button v-else type="text" @click="$router.push('/login')">登录</el-button>
    </nav>
    <div class="container">
        <header>
            <div class="article-info">
                <div>发布日期：{{ article.firstPublishTime | formatDate }}</div>
            </div>
            <h1>{{ article.title }}</h1>
        </header>
        <main>
            <div>
                <el-button v-if="hasLogin" type="text" @click="gotoEditPage">编辑</el-button>
                <el-button v-if="hasLogin" style="color: #999" type="text" @click="deleteArticle">删除</el-button>
            </div>
            <article id="article" v-html="article.content"></article>
        </main>
        <div class="relative-articles" v-if="hasRelativeArticles">
            <h1>更多阅读</h1>
            <ul class="relative-articles__list">
                <li v-for="rltArticle of article.relativeArticles" :key="rltArticle.articleID">
                    <router-link :to="rltArticle.path">
                        {{ rltArticle.title }}
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="copyright">
            <div class="f-small">蜂鸟博客，版权所有 2020</div>
        </div>
    </div>
</div>
</template>

<script>
import request from '../src/request';
import { mapState } from 'vuex';
import { Divider, Button, Breadcrumb, BreadcrumbItem, Card } from 'element-ui';

export default {
    name: 'Article',

    created () {
        console.log(this.$route.params)
        this.loadArticle(this.$route.params.articleID);
    },

    beforeRouteUpdate () {
        this.loadArticle(this.$route.params.articleID);
    },

    data () {
        return {
            hasPageLoaded: false,
            article: null
        };
    },

    methods: {
        async loadArticle (articleID) {
            this.hasPageLoaded = false;
            this.article = await request.getArticleById(articleID);
            this.hasPageLoaded = true;
        },

        async deleteArticle () {
            console.log('delete article');
        },

        gotoEditPage () {
            console.log(this.article)
            this.$router.push({
                path: `/articles/${this.article.articleID}/edit`
            })
        }
    },

    filters: {
        formatDate (timestamp) {
            var date = new Date(timestamp);

            var yyyy = date.getFullYear();
            var mm = date.getMonth() + 1;
            var dd = date.getDate();

            return `${yyyy}-${mm}-${dd}`;
        }
    },

    computed: {
        hasRelativeArticles () {
            return this.article !== null
                && typeof this.article === 'object'
                && Array.isArray(this.article.relativeArticles)
                && this.article.relativeArticles.length > 0;
        },
        ...mapState('app', {
            hasLogin: state => state.hasLogin
        })
    },

    components: {
        'el-breadcrumb': Breadcrumb,
        'el-breadcrumb-item': BreadcrumbItem,
        'el-divider': Divider,
        'el-card': Card,
        'el-button': Button,
    }
}
</script>

<style scoped>
.article-page {
    color: #303133;
}

nav {
    z-index: 1000;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3rem;
    font-size: 14px;
    padding: 1em;
}

nav .breadcrumb {
    margin: 0;
    margin-right: auto;
}

.container {
    width: 950px;
    margin: 0 auto;
}

header {
    font-weight: normal;
    margin: 2rem 0 4rem;
    border-left : 5px solid #409EFF;
    padding: 0;
    padding-left: 2rem;
}

header .article-info {
    color: #909399;
}

header h1 {
    font-size: 3rem;
    margin: 0;
    margin-top: 1rem;
}

#article {
    margin: 0;
    line-height: 1.8;
    overflow: hidden; /* bfc */
}

#article >>> *:first-child {
    margin-top: 0;
}

#article >>> *:last-child {
    margin-bottom: 0;
}


.relative-articles {
    margin-top: 5rem;
    border-top: 2px solid #DCDFE6;
}

.copyright {
    color: #909399;
    margin: 6rem 0 1.5rem;
    text-align: center;
}

.material-icons {
    font-size: 1rem;
}
</style>
