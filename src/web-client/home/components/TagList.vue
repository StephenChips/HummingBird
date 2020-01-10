<template>
<div class="taglist">
    <transition name="fade">
        <div class="current-tag" v-if="currentTag">
            <div class="header heading">当前选中的文章系列</div>
            <div class="content">
                <div>{{ currentTag.name }}</div>
                <button @click="deselectTag"><span class="material-icons">close</span></button>
            </div>
        </div>
    </transition>

    <h1 class="taglist-title" :style="taglistTitleStyle">所有文章系列</h1>

    <!-- 标签 -->
    <ul class="plain">
        <li v-for="tag of tagList" :key="tag.url"><a href="#" @click.prevent="selectTag(tag)"> {{ tag.name }} </a></li>
    </ul>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import request from '../src/request';

export default {
    name: 'TagList',

    props: [ 'sectionID', 'tagID' ],
    
    data () {
        return {
            tagList: []
        };
    },

    created () {
        request.getTags(this.sectionID).then(tagList => {
            this.tagList = tagList;
        });
    },

    methods: {
        selectTag (tag) {
            if (this.currentTag === undefined || tag.id !== this.currentTag.id) {
                this.$router.push(tag.url);
            }
        },

        deselectTag () {
            this.$router.push(this.currentSection.url);
        }
    },

    computed: {
        taglistTitleStyle () {
            return {
                marginTop: this.currentTag ? '100px' : '0'
            };
        },
        ...mapState({
            currentSection: state => state.app.currentSection,
            currentTag: state => state.sectionPage.currentTag,
        })
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
