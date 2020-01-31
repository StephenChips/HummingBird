<template>
<transition mode="out-in">
    <router-view />
</transition>
</template>
<style>
.v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.25s;
}

.v-enter-to,
.v-leave {
    opacity: 1;
}
</style>
