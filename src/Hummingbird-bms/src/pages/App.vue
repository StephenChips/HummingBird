<template>
<div>
    <BMSHeader />
    <div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import BMSHeader from '@components/BMSHeader.vue';

export default {
    name: 'App',
    components: { BMSHeader }
}
</script>
<style scoped>
body {
    background: #fdfdfd;
}
</style>
