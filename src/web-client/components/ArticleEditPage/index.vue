<template>
<div class="article-page" v-if="isPageLoaded">
    <nav>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tech' }">技术区</el-breadcrumb-item>
            <el-breadcrumb-item>此文章</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" @click="$router.push('/login')">保存</el-button>
        <el-button v-if="article.hasPublished" type="text" @click="withdraw">撤回</el-button>
        <el-button v-else type="text" @click="publish">保存并发布</el-button>
        <el-button type="text" style="color: #909399;" @click="$router.go(-1)">返回</el-button>
    </nav>
    <div class="container">
        <header>
            <el-input type="textarea" class="title-input" autosize :value="article.title" @input="handleTitleInput"></el-input>
        </header>
        <main class="article">
            <textarea id="editor"></textarea>
        </main>
        <div class="copyright">
            <div class="f-small">蜂鸟博客，版权所有 2020</div>
        </div>
    </div>
</div>
</template>

<script>
import request from '../../src/request';
import { mapState } from 'vuex';
import EasyMDE from 'easymde';
import { Divider, Button, Breadcrumb, BreadcrumbItem, Input } from 'element-ui';

const EditMode = Object.freeze({
   NEW: 'NEW',
   UPDATE: 'UPDATE'
});

export default {
    name: 'Article',

    created () {
        if (this.$route.params.hasOwnProperty('articleID')) {
            this.mode = EditMode.UPDATE;
            this.loadArticle(this.$route.params.articleID);
        } else {
            this.mode = EditMode.NEW;
            this.initArticleData();
        }
    },

    beforeRouteUpdate () {
        this.loadArticle(this.$route.params.articleID);
    },

    data () {
        return {
            isPageLoaded: false,
            mode: null,
            article: null
        };
    },

    methods: {
        async loadArticle (articleID) {
            this.isPageLoaded = false;
            this.article = await request.getArticleById(articleID);
            this.isPageLoaded = true;
        },

        initArticleData () {
            this.article = {
                articleID: null,
                content: '',
                title: ''
            };
        },

        gotoEditPage () {
            console.log(this.article)
            this.$router.push({
                path: `/articles/${this.article.articleID}/edit`
            })
        },

        publish () {

        },

        withdraw () {

        },

        handleTitleInput (value) {
            this.article.title = value.replace( /\r|\n/g, '')
        },

        disableNewLine () {
            this.article.title = this.article.title.replace(/\r|\n/g, '');
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

    watch: {
        isPageLoaded (isLoaded, hasBeenLoaded) {
            if (isLoaded && !hasBeenLoaded) {
                this.$nextTick(() => {
                    this.$editor = new EasyMDE({
                        element: this.$el.querySelector('#editor'),
                        spellChecker: false
                    });

                    this.$editor.value(this.article.content);
                });
            }
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
        'el-input': Input,
        'el-button': Button,
    }
}
</script>

<style scoped>

.article-page {
    position: relative;
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
    font-size: 1rem;
    font-weight: normal;
    margin: 2rem 0 4rem;
    border-left : 5px solid #409EFF;
    padding: 0;
    padding-left: 2rem;
}

header .title-input {
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    font-size: 3rem;
    margin: 0;
    margin-top: 1rem;
    border: none;
    border-bottom: 1px solid #c7c8ca;
}
/**
 *  Hacking <el-input> component
 *  Since it's a hacking, in case some rules are unexpectedly
 *  overwrited by others, `!important` is added to each rule.
 */

header .title-input.el-textarea >>> .el-textarea__inner {
    border: none !important;
    outline: none !important;
    padding: 0 !important;
    line-height: 1.5 !important;
    color: black !important;
    resize: none !important;
}

main {
    margin: 0;
    margin-top: 50px;
    line-height: 1.8;
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
