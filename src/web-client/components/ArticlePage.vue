<template>
<div class="article-page">
    <nav>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tech' }">技术区</el-breadcrumb-item>
            <el-breadcrumb-item>此文章</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button v-if="hasLogin" type="text" @click="$store.dispatch('app/logout')">登出</el-button>
        <el-button  v-else  type="text" @click="$router.push('/login')">登录</el-button>
    </nav>
    <header>
        <div class="article-info">
            <div>发布日期：{{ publishDate | formatDate }}</div>
        </div>
        <h1>{{ title }}</h1>
    </header>
    <div v-if="hasLogin">
        <el-button icon="el-icon-edit" type="primary">编辑</el-button>
        <el-button icon="el-icon-delete" type="danger">删除</el-button>
    </div>
    <main class="article">
        <article class="article" v-html="content"></article>
    </main>
    <div class="relative-articles">
        <h1>更多阅读</h1>
        <ul class="relative-articles__list">
            <li v-for="article of relativeArticles" :key="article.articleID">
                <router-link :to="article.path">
                    {{ article.title }}
                </router-link>
            </li>
        </ul>
    </div>
    <div class="copyright">
        <div class="f-small">蜂鸟博客，版权所有 2020</div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import { Divider, Button, Breadcrumb, BreadcrumbItem, Card } from 'element-ui';

async function updateData (to, from, next) {
    console.log(this.$store)
    var { articleID } = to.params;
    // `this` points to the vue instance
    var article = await this.loadArticle(articleID);
    this.title = article.title;
    this.publishDate = article.publishDate;
    this.content = article.content;
    this.relativeArticles = article.relativeArticles;
    this.$store.dispatch('app/loadCurrentSectionInfo', { sectionID: article.sectionID });
}

export default {
    name: 'Article',

    beforeRouteEnter (to, from, next) {
        next(vm => {
            updateData.call(vm, to, from, next);
        });
    },
    beforeRouteUpdate (to, from, next) {
        updateData.call(this, to, from, next);
    },
    data () {
        return {
            title: '',
            publishDate: 0,
            content: '',
            relativeArticles: []
        };
    },

    methods: {
        async loadArticle (articleID) {
            return {
                title: '厂商宣传的HDR到底有多少水分？查了一周资料我们找到了答案',
                publishDate: Date.now(),
                content: `
                    <p>
                    不知从何时起，HDR的名字开始出现在各大厂商的宣传语之中，从电视到投影仪，甚至近两年来的手机，
                    都喜欢给自己的产品套上一个“支持HDR”的名号进行包装。作为一个2015年才真正诞生的标准化名词，HDR普及的迅速程度远超大家的想象，
                    那么就让我们来了解一下，在厂商们纷乱的广告语之中，到底什么才是真正的HDR？
                    </p>

                    <h1>我们为什么需要HDR？</h1>

                    <p>
                    对于大多数消费者，第一次接触到HDR这个名词恐怕是在手机拍照。其实HDR技术用于拍照的历史可以追溯到胶片时代，
                     几十年前，摄影师就会拍摄数张不同曝光程度的底片，并在暗房使用一种叫做减淡和加深（dodging and burning）的手法，
                    将数张底片合成为一张具有高动态范围的照片。随着数码摄影的出现，HDR（High-Dynamic Range 高动态范围图像）将暗房里的技术带入了相机成像传感器，
                    通过同一个场景进行多种不同的曝光，最后进行多张合成，最终增强照片动态的范围，增加照片的层次感。
                    </p>

                    <p>
                    真实世界的亮度范围是十分广阔的，而人眼能感知到的亮度范围也能十万尼特左右。举个例子，用分光色度计测量向着阳光盛开的花朵，
                    其黄色区域亮度最高可达14700尼特，边缘的红色是2300尼特，中央的花蕊和绿叶只有200尼特以下，但这张照片在窄色域、亮度普遍不超过100尼特，
                    对比度也只有1000：1的SDR显示效果下色彩会暗淡很多，而随着技术的发展，HDR技术色域广、普遍亮度在1000尼特，对比度甚至能达到上万，
                    虽然还是远达不到现实标准，但比三十年前的SDR还是前进了一大步。
                    </p>

                    <h1>HDR的繁多标准</h1>

                    <p>
                    目前在业界，HDR标准还没有一个最终定义：主流的有美国消费者技术协会主推的HDR10，杜比推出的Dolby Vision，三星的HDR10+，BBC和NHK联合制定的HLG格式，
                    UHD Premium等，如果你想了解各大厂商在都分别属于哪种“HDR阵营”，请参考The HDR Ecosystem Tracker (mid-2019)。HDR标准大致可以分为两派，
                    一种是只有硬件使用建议的HDR标准，一种是有明确硬件规定的HDR标准，前者的代表是HDR10、Dolby Vision和HDR10+、后者则是UHD Premium和DisPlayHDR。
                    </p>
                `,
                sectionID: 1,
                tagID: 0,
                relativeArticles: [
                    {
                        articleID: 1,
                        path: '/articles/1',
                        title: '你好，小子 (1)'
                    },
                    {
                        articleID: 2,
                        path: '/articles/2',
                        title: '你好，小子 (2)'
                    },
                    {
                        articleID: 3,
                        path: 'articles/3',
                        title: '你好，小子（3）'
                    }
                ]
            };
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
    },

    computed: {
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
    width: 950px;
    margin: 0 auto;
    color: #303133;
}

nav {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 3rem;
    margin-top: 1rem;
    font-size: 14px;
}

nav .breadcrumb {
    margin: 0;
    margin-right: auto;
}

header {
    font-size: 1rem;
    font-weight: normal;
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
