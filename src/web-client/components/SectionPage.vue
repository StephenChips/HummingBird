<template>
<div class="section-page">
    <section class="content">
        <h1 v-if="currentTag">文章系列：“{{ currentTag.name }}”</h1>
        <h1 v-else>{{ currentSection.name }}区</h1>
        <router-view></router-view>
    </section>
    <TagList
        :sectionID="$route.params.sectionID"
        :tagID="$route.params.tagID"
    ></TagList>
</div>
</template>

<script>
import TagList from './TagList.vue';
import { mapState } from 'vuex';
import store from '../src/store';

export default {
    name: 'SectionPage',

    data () {
        return {
            currentTag: null,
            currentSection: {
                name: '生活区'
            }
        }
    },

    components: { TagList }
}
</script>

<style scoped>

.section-page {
    display: flex;
    width: 980px;
    margin: 0 auto;
}

.section-page > .content {
    width: 60%;
}

.section-page > .taglist {
    width: 40%;
}

</style>
