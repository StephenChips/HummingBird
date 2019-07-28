<template>
<div>
    <bms-header></bms-header>
    <div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import BmsHeader from '@components/BmsHeader.vue';

export default {
    name: 'App',
    components: { BmsHeader }
}
</script>
<style>
.counter {
    width: 300px;
    
}
</style>
