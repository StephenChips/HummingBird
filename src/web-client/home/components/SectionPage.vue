<template>
<div class="section-page">
    <section class="content">
        <h1>{{ sectionName }}</h1>
        <router-view></router-view>
    </section>
    <TagList></TagList>
</div>
</template>

<script>
import TagList from './TagList.vue';

export default {
    name: 'Home',

    mounted () {
        this.sectionName = this.loadSectionName(this.$route.params.section);
    },

    data () {
        return {
            sectionName: null
        }
    },

    methods: {
        loadSectionName (sectionId) {
            if (sectionId === 'life') {
                return '生活区';
            } else if (sectionId === 'tech') {
                return '技术区';
            }
        }
    },

    watch: {
        $route (to, from) {
            this.sectionName = this.loadSectionName(to.params.section);
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
