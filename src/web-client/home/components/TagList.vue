<template>
<div class="taglist">
    <transition name="fade">
        <div class="current-tag" v-if="currentTag">
            <div class="header heading">当前选中标签</div>
            <div class="content">
                <div>{{ currentTag.name }}</div>
                <button @click="deselectTag"><span class="material-icons">close</span></button>
            </div>
        </div>
    </transition>

    <h1 class="taglist-title">文章标签列表</h1>

    <!-- 标签 -->
    <ul class="plain">
        <li v-for="tag of tagList" :key="tag.url"><a href="#" @click.prevent="selectTag(tag)"> {{ tag.name }} </a></li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'TagList',

    data () {
        return {
            tagList: [
                { url: '/life/中文', name: '中文' },
                { url: '/life/旅游', name: '旅游' },
                { url: '/tech/前端', name: '前端' },
                { url: '/tech/后端', name: '后端' }
            ],

            currentSection: undefined,
            currentTag: undefined
        };
    },

    mounted () {
        var tagUrl = this.$route.params.tag;
        this.currentSection = this.$route.params.section;
        this.currentTag = this.tagList.find(tag => tag.url == tagUrl);
    },

    methods: {
        addMarginFortaglistTitle () {
            var taglistTitle = this.$el.querySelector('.taglist-title');
            taglistTitle.style.marginTop = '100px';
        },

        removeMarginFortaglistTitle () {
            var taglistTitle = this.$el.querySelector('.taglist-title');
            taglistTitle.style.marginTop = '';
        },

        selectTag (tag) {
            if (this.currentTag !== tag) {
                this.currentTag = tag;
                this.$router.push(tag.url);
            }
        },

        deselectTag () {
            this.currentTag = undefined;
            this.$router.push(`/${this.currentSection}`);
        }
    },

    watch: {
        $route (to, from) {
            this.currentSection = this.$route.params.section;
            this.currentTag = this.tagList.find(tag => tag.url == to.path);
        },

        currentTag (newTag, oldTag) {
            if (!oldTag && newTag) {
                this.addMarginFortaglistTitle();
            } else if (oldTag && !newTag) {
                this.removeMarginFortaglistTitle();
            }
        }
    }
}
</script>

<style scoped>
.taglist {
    position: relative;
    margin-left: 1rem;
    padding-left: 1rem;
}

.current-tag {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 0.67em;
    padding-left: 1rem;
}

.current-tag > .header {
    font-size: 14px;
    margin-bottom: 0.5em;
    font-weight: bold;
}
.current-tag > .content {
    display: flex;
    border: 1px solid #D4D4D4;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

.current-tag > .content > *:first-child {
    font-weight: bold;
    text-decoration: underline dashed currentColor;
    margin-right: auto;
}


.taglist-title {
    transition: margin-top 0.25s;
}

.material-icons {
    font-size: 1rem;
}

.fade-enter,
.fade-leave {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

</style>
