<template>
<div v-if="hasStoreInited">
    <Navigation />
    <router-view class="main-content" />
</div>
</template>

<script>
import Navigation from './Navigation.vue';
export default {
    watch: {
        $route (to, from) {
            var toPathFragments = to.path.split('/');
            var fromPathFragments = from.path.split('/');

            if (toPathFragments[1] === fromPathFragments[1]) {
                this.transitionName = '';
            } else {
                this.transitionName = 'fade';
            }
        }
    },

    computed: {
        hasStoreInited () {
            return this.$store.state.pages.hasStoreInited;
        }
    },
    components: { Navigation }
}
</script>

<style scoped>
.main-content {
    margin-top: 150px;
}
</style>
