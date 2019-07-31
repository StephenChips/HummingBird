<template>
    <div class="amp-content px-2">
        <h3 class="mt-3">Articles</h3>
        <AMPToolbar />
        <AMPArticleList />
    </div>
</template>

<script>
import AMPToolbar from '@components/AMPToolbar.vue';
import AMPCategoryList from '@components/AMPCategoryList.vue';
import AMPArticleList from '@components/AMPArticleList.vue';

export default {
    name: 'amp-content',

    components: {
        AMPToolbar,
        AMPCategoryList,
        AMPArticleList
    }
}
</script>

<style>

</style>
