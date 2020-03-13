<template>
<div class="article-page" v-if="isPageLoaded">
    <nav>
        <el-breadcrumb separator="/" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/tech' }">技术区</el-breadcrumb-item>
            <el-breadcrumb-item>此文章</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="text" style="color: #909399;" @click="$router.go(-1)">返回</el-button>
    </nav>
    <div class="container">
        <header>
            <el-input type="textarea" class="title-input" autosize :value="article.title" @input="handleTitleInput"></el-input>
        </header>
        <div class="toolbar">
            <div class="toolbar__item">
                <span>分类：</span>
                <el-select
                    v-model="article.sectionID"
                    @change="handleSelectSectionChange"
                    placeholder="请选择分类"
                    filterable
                    remote
                    :remote-method="handleSectionInputChange"
                    :loading="false"
                >
                    <el-option
                    v-for="item in filteredSections"
                    :key="item.sectionID"
                    :label="item.sectionName"
                    :value="item.sectionID">
                    </el-option>
                </el-select>
                <el-button type="text" @click="handleClickCreateSectionButton">
                    <i class="material-icons">add</i>
                </el-button>
            </div>
            <div class="toolbar__item">
                <span>标签：</span>
                <el-select
                    v-model="article.tagID"
                    placeholder="请选择标签"
                    filterable
                    remote
                    :remote-method="handleTagsInputChange"
                >
                    <el-option
                    v-for="item in filteredTags"
                    :key="item.tagID"
                    :label="item.tagName"
                    :value="item.tagID">
                    </el-option>
                </el-select>
                <el-button type="text" @click="handleClickCreateTagButton">
                        <i class="material-icons">add</i>
                </el-button>
            </div>
            <div class="toolbar__item" style="margin-left: auto">
                <el-button @click="save">保存</el-button>
                <el-button v-if="article.hasPublished" @click="withdraw">撤回</el-button>
                <el-button type="primary" v-else @click="publish">发布</el-button>
            </div>
        </div>
        <main class="article">
            <textarea id="editor"></textarea>
        </main>
        <div class="copyright">
            <div class="f-small">蜂鸟博客，版权所有 2020</div>
        </div>
    </div>
    <el-dialog
        :title="dialog.title"
        :visible.sync="dialog.visible"
        width="30%">
        <div :style="{
            display: 'flex',
            alignItems: 'center'
        }">
            <el-input :placeholder="dialog.placeholder" v-model="dialog.value" />
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog.visible = false">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import request from '../../src/request';
import { mapState } from 'vuex';
import EasyMDE from 'easymde';
import {
    Divider,
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Input,
    Select,
    Option,
    Dialog,
    Message
} from 'element-ui';
import pick from 'lodash/pick';

const EditMode = Object.freeze({
   NEW: 'NEW',
   UPDATE: 'UPDATE'
});

const DialogMode = Object.freeze({
   CREATE_SECTION: 'CREATE_SECTION',
   CREATE_TAG: 'CREATE_TAG'
});

function ErrorMessage (message, type) {
    this.message = message;
    this.type = type;
}

Object.setPrototypeOf(ErrorMessage.prototype, Error.prototype);
ErrorMessage.prototype.name = 'ErrorMessage';

export default {
    name: 'Article',

    async created () {
        var article, sections;
        var section, tag;
        var articleID = this.$route.params.article;

        if (this.$route.params.hasOwnProperty('articleID')) {
            this.mode = EditMode.UPDATE;
        } else {
            this.mode = EditMode.NEW;
        }

        if (this.mode === EditMode.UPDATE) {
            this.mode = EditMode.UPDATE;
            [ article, sections ] = await Promise.all([
                request.getArticleById(articleID),
                request.getAllSections()
            ]);

        } else if (this.mode === EditMode.NEW) {
            sections = await request.getAllSections();
            article = this.createEmptyArticle();
        }

        this.sections = sections;
        this.article = article;
        this.isPageLoaded = true;

        // BEWARE: Loading procedure haven't finished here, there are still last three steps to go:

        /**
         *  1. VM notices isPageLoaded is changed, thus run its watcher.
         *  2. Inside the watcher, we set a `this.$nextTick(...)` callback.
         *  3. When the nick tick comes, we initialzie EasyMDE and set the article's content
         *     to it.
         *
         *  The reason we do step two and three instead of directly updating
         *  the editor's content, is that the DOM isn't ready yet when we are processing the second
         *  step, and hence EasyMDE cannot be installed. If we try intializing the editor's at the
         *  second step, we will end up with a null exception.
         */
    },

    beforeRouteUpdate () {
        this.loadArticle(this.$route.params.articleID);
    },

    /** Implications about data
     *
     *  1. When rendering, article should be an object. It can be either an new created article
     *     (created by method `createNewArticle`), or an existed one fetched from the server.
     *
     *  2. computed attribute `filteredSection` and `filteredTag` are stem from data `sections`
     *     and `tags`, effected by data 'tagFilter' and 'sectionFilter'
     */
    data () {
        return {
            isPageLoaded: false,
            mode: null,

            article: null,

            sections: [],
            tags: [],

            tagFilter: '',
            sectionFilter: '',

            selectedSection: '',
            selectedTag: '',

            dialog: {
                visible: false,
                title: '',
                value: '',
                mode: null,
                placeholder: ''
            }
        };
    },

    methods: {
        createEmptyArticle () {
            return {
                articleID: null,
                content: '',
                title: '',
                sectionID: null,
                tagID: null
            };
        },

        gotoEditPage () {
            this.$router.push({
                path: `/articles/${this.article.articleID}/edit`
            })
        },

        async notifyWhenTaskIsFinished (task) {
            try {
                Message({
                    message:  await task(),
                    type: 'success'
                });
            } catch ({ message, type }) {
                Message({ message, type });
            }
        },

        publish () {
            this.article.content = this.$editor.value();
            this.notifyWhenTaskIsFinished(async () => {
                var errorReason = this.validate();
                if (errorReason !== null) {
                    throw new ErrorMessage(errorReason, 'warning');
                }
                try {
                    await request.updateArticle({
                        hasPublished: true,
                        title: this.article.title,
                        content: this.article.content, //如果有content，就要提供contentType
                        contentType: 'text/markdown',
                        articleID: this.article.articleID,
                        sectionID: this.article.sectionID,
                        tagID: this.article.tagID
                    });
                } catch (e) {
                    throw new ErrorMessage('出现网络错误，请重试！', 'error');
                }

                return '文章已发布';
            });
        },

        // If you can withdraw a article, it must be published.
        // So the function won't be called when the aritcle hasn't
        // publihsed yet.
        withdraw () {
            this.article.content = this.$editor.value();
            this.notifyWhenTaskIsFinished(async () => {
                try {
                    await request.updateArticle({
                        articleID: this.article.articleID,
                        hasPublished: false
                    });
                } catch (e) {
                    // Assume a network error occured. Re-throw execption
                    throw new ErrorMessage('出现网络错误，请重试！', 'error');
                }

                return '文章已撤回！';
            });
        },

        save () {
            this.article.content = this.$editor.value();
            this.notifyWhenTaskIsFinished(async () => {
                var errorMessage = this.validate();
                if (errorMessage !== null) {
                    throw new ErrorMessage(errorMessage, 'warning');
                }
                if (this.mode === EditMode.UPDATE) {
                    await request.upateArticle({
                        title: this.article.title,
                        content: this.article.content,
                        articleID: this.article.articleID,
                        sectionID: this.article.sectionID,
                        tagID: this.article.tagID,
                        contentType: 'text/markdown'
                    });
                } else if (this.mode === EditMode.NEW) {
                    this.article.articleID = await request.createArticle({
                        title: this.article.title,
                        content: this.article.content,
                        sectionID: this.article.sectionID,
                        tagID: this.article.tagID,
                        contentType: 'text/markdown'
                    });
                }

                return '文章已保存！';
            });
        },

        validate () {
            console.log(this.article)
            if (this.article.title.trim() === '') {
                return '请填写文章标题！';
            } else if (this.article.sectionID === null) {
                return '请选择文章的板块！';
            } else if (this.article.content === '') {
                return '请填写文章内容！';
            } else {
                // No error.
                return null;
            }
        },

        handleTagsInputChange (value) {
            this.tagFilter = value;
        },

        handleSectionInputChange (value) {
            this.sectionFilter = value;
        },

        handleDialogConfirm () {
            this.notifyWhenTaskIsFinished(async () => {
                var successMsg;
                switch (this.dialog.mode) {
                    case DialogMode.CREATE_SECTION:
                        await this.createNewSection(this.dialog.value, this.dialog.name); // throws ErrorMessage
                        successMsg = `已成功新建板块${this.dialog.name}`;
                        break;
                    case DialogMode.CREATE_TAG:
                        await this.createNewTag(this.dialog.value, this.dialog.name); // throws ErrorMessage
                        successMsg = `已成功新建标签${this.dialog.name}`;
                        break;
                }

                this.dialog.value = '';
                this.dialog.name = '';
                this.dialog.visible = false;

                console.log('success')

                return successMsg;
            });

            console.log('ok')
        },

        async createNewSection (sectionID, sectionName) {

            // throws ErrorMessage
        },

        async createNewTag (tagID, tagName) {

            // throws ErrorMessage
        },

        async handleSelectSectionChange (newSectionID) {
            this.selectedTag = null;
            this.tags = await request.getTagsOfSection();
        },

        handleClickCreateSectionButton () {
            this.dialog.title = '新增分类';
            this.dialog.placeholder = '请输入分类名称';
            this.dialog.mode = DialogMode.CREATE_SECTION;
            this.dialog.value = '';
            this.dialog.visible = true;
        },

        handleClickCreateTagButton () {
            this.dialog.title = '新增标签';
            this.dialog.placeholder = '请输入标签名称';
            this.dialog.mode = DialogMode.CREATE_TAG;
            this.dialog.value = '';
            this.dialog.visible = true;
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
        filteredTags () {
            return this.tags.filter(tag => tag.tagName.startsWith(this.tagFilter));
        },
        filteredSections () {
            return this.sections.filter(section => section.sectionName.startsWith(this.sectionFilter));
        },
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
        'el-select': Select,
        'el-option': Option,
        'el-dialog': Dialog
    }
}
</script>

<style scoped>

.article-page {
    position: relative;
    color: #303133;
}

nav {
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

.toolbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 3em 0 2em;
}

.toolbar > * {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 1em;
}

.toolbar > :last-child {
    margin-right: 0;
}

main {
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
</style>
