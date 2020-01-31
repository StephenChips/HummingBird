<template>
<div>
    <Navigation />
    <transition mode="out-in" name="fade">
        <router-view :key="keyOfRouterView()" class="main-content"></router-view>
    </transition>
</div>
</template>

<script>
import Navigation from './Navigation.vue';
export default {
    data () {
        return {
            transitionName: ''
        }
    },
    methods: {
        keyOfRouterView () {
            var segments = this.$route.path.split('/');
            if (segments.length >= 2) {
                return segments[1];
            } else {
                return '###';
            }
        }
    },
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
    components: { Navigation }
}
</script>

<style scoped>
.main-content {
    margin-top: 150px;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-to,
.fade-leave {
    opacity: 1;
}

</style>
