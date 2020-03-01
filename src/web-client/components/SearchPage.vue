<template>
<div class="search-page">
    <h1 class="search-page-title">
        <span>搜索：</span>
        <input type="text" v-model="searchText" @keydown.enter="reflashAndSearch"/>
    </h1>
    <div class="search-page-content">
        <h2 class="search-result" v-if="searchFailed">搜索失败，请重试</h2>
        <div class="search-result" v-else>
            <div class="search-item-count">一共{{ searchResult.length }}个搜索结果</div>
            <ul class="article-list plain" v-if="searchResult && searchResult.length > 0">
                <li class="article" v-for="article of searchResult" v-bind:key="article.url">
                    <div class="article-info">
                        <div class="publish-date">{{ article.publishDate | formatDate }}</div>
                        <div v-if="article.tag">»</div>
                        <div class="section">{{ article.section }}</div>
                        <div v-if="article.tag">»</div>
                        <div v-if="article.tag" class="tag">{{ article.tag }}</div>
                    </div>
                    <div class="article-title">
                        <router-link :to="getArticleUrl(article.articleId)">{{ article.title }}</router-link>
                    </div>
                </li>
            </ul>
            <div v-else>啥都没得搜到</div>
        </div>
        <form class="search-options" @submit.prevent="search">
            <h4 class="search-options-title">搜索选项</h4>
            <fieldset>
                <label>
                    <input type="radio" name="search-type" id="search-article-by-title"
                        :checked="searchOption === SearchOption.BY_TITLE"
                        :value="SearchOption.BY_TITLE"
                        v-model="searchOption"
                    >
                    <span>通过文章标题搜索</span>
                </label>
                <label>
                    <input type="radio" name="search-type" id="search-article-by-tag"
                        :checked="searchOption === SearchOption.BY_TAG"
                        :value="SearchOption.BY_TAG"
                        v-model="searchOption"
                    >
                    <span>通过文章标签搜索</span>
                </label>
            </fieldset>
        </form>
    </div>
</div>
</template>

<!--
精准搜索文章

提供两个搜索选项
1. 按照名称精准搜索
2. 按照标签精准搜索‘

1. 左侧显示搜索结果
  1. 显示文章标题、分类、标签和发布时间

显示为一个文章列表

默认搜索
-->

<script>
import request from '../src/request';

const SearchOption = Object.freeze({
    BY_TITLE: 'byTitle',
    BY_TAG: 'byTag'
});

export default {
    name: 'SearchPage',

    created () {
        this.SearchOption = SearchOption;
        this.searchText = decodeURIComponent(this.$route.query['s']);
    },

    mounted () {
        if (this.searchText !== '') {
            this.search();
        }
    },

    data () {
        return {
            searchOption: SearchOption.BY_TITLE,
            searchResult: [],
            searchText: '',
            searchFailed: false
        }
    },

    methods: {
        reflashAndSearch (event) {
            this.$router.push(`/search?s=${encodeURIComponent(event.target.value)}`);
        },

        async search (text, option) {
            this.searchFailed = false;

            try {
                if (option  == SearchOption.BY_TITLE) {
                    this.searchResult = await request.searchArticlesByTitle(this.searchText)
                } else if (option == SearchOption.BY_TAG) {
                    this.searchResult = await request.searchArticlesByTag(this.searchText);
                }
                console.log(this.searchResult)
            } catch (e) {
                this.searchFailed = true;
            }
        },

        getArticleUrl (articleId) {
            return `/articles/${articleId}`;
        }
    },

    watch: {
        searchOption (newOption, oldOption) {
            this.search(this.searchText, newOption);
        },

        searchText (newText, oldText) {
            this.search(newText, this.currentOption);
        },

        $route (to, from) {
            if (typeof to.query['s'] !== 'string' || to.query['s'] === '') {
                this.searchText = '';
            } else {
                this.searchText = decodeURIComponent(to.query['s']);
            }
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
.search-page {
    width: 980px;
    margin: 0 auto;
}

/** --- */

.search-page-title {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 0.67em;
}

.search-page-title > *:first-child {
    flex: 0 auto;
}

.search-page-title > *:nth-child(2) {
    flex: 1;
}

.search-page-title > input {
    font-size: inherit;
}

/* --- */

.search-page-content {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
}

.search-page-content > .search-result {
    flex: 1 70%;
}

.search-page-content > .search-options {
    flex: 1 30%;
    margin-left: 2em;
}

/* --- */

.search-result > * {
    display: block;
}

/* --- */

.search-item-count {
    margin-bottom: 1rem;
}

.search-item-count {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1rem;
}


.article-list > .article {
    margin-bottom: 2em;
}

.article > .article-info {
    font-size: 14px;
    display: flex;
    color: #454545;
}

.article > .article-info > * {
    margin-right: 0.5em;
}

.article > .article-info > *:last-child {
    margin-right: 0;
}

.article > .article-title {
    font-size: 20px;
}

.search-options .search-options-title {
    font-size: calc(1rem + 2px);
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.search-options fieldset {
    box-sizing: border-box;
    display: block;
    border: none;
    padding: 0;
    margin: 0;
    border: 1px #D4D4D4 solid;
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
}

.search-options label {
    display: block;
}

.search-options label {
    display: flex;
    margin-bottom: 0.5rem;
}

.search-options label:last-child {
    margin-bottom: 0;
}

.search-options label input[type="radio"] {
    margin-right: 1rem;
}

</style>
