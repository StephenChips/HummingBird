<template>
    <div class="counter">
        <div class="center-wrapper">
            <div class="count">{{ count }}</div>
            <button class="button" @click="increase">Increase!</button>
        </div>
    </div>
</template>

<script>

import { debounce } from 'lodash';

import App from '../components/'

export default {
    props: {
        'start': {
            type: Number,
            default: 0
        },
        'step': {
            type: Number,
            default: 1
        }
    },

    data () {
        return {
            count: 0
        }
    },

    mounted () {
        this.count = this.start;
    },

    methods: {
        increase: debounce(function () {
            this.count += this.step;
        }, 400, {
            leading: true,
            tailing: false
        })
    }
}
</script>

<style>
.counter .center-wrapper {
    width: 80%;
    margin: 0 auto;
    font-size: 16px;
}

.counter .count {
    font-size: 48px;
    text-align: center;
}

.counter .button {
    width: 20em;
    display: block;
    height: 4em;
    margin: 0 auto;
}

</style>
