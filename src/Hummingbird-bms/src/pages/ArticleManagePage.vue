<!-- 
    The word 'article manage page' will be abbreviated to 'amp' below for simplicity.
-->
<template>
    <div class="main-content">
        <div class="sidebar">
            <div class="sidebar__inner">
                <AMPSectionMenu class="pb-3"/>
                <h5>Categories</h5>
                <AMPCategoryList />
            </div>
        </div>
        <router-view class="content" />
    </div>
</template>

<script>
import AMPSectionMenu from '@components/AMPSectionMenu.vue';
import AMPCategoryList from '@components/AMPCategoryList.vue';
import StickySidebar from 'sticky-sidebar';

export default {
    name: 'ArticleManagePage',

    mounted () {
        this.initializeStickySizebar();
        this.initializeStore();
    },

    methods: {
        initializeStore: function initializeStore () {

        },
        initializeStickySizebar: function initializeStickySizebar () {
            this.$stickySidebar = new StickySidebar('.sidebar', {
                topSpacing: 14,
                bottomSpacing: 0,
                containerSelector: '.main-content',
                innerWrapperSelector: '.sidebar__inner'
            });
        }
    },

    components: {
        AMPSectionMenu,
        AMPCategoryList
    }
}
</script>

<style scoped>
.sidebar {
    width: 25%;
    float: left;
    margin-left: 1rem;
    margin-top: 1rem;
}

.content {
    display: block;
    width: auto;
    margin-left: calc(25% + 30px);
}
</style>
