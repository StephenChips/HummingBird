<template>
<div>
    <h1>Counter</h1>
    <Counter :start=0 :step=2></Counter>
</div>
</template>

<script>
import Counter from '@components/Counter.vue';

export default {
    name: 'App',
    components: { Counter }
}
</script>
<style>
.counter {
    width: 300px;
    
}
</style>
