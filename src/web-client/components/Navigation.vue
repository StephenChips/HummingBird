<template>

</template>

<script>
import request from '../src/request';
import { mapState } from 'vuex';
import WebsiteTitle from './WebsiteTitle.vue';
import throttle from 'lodash/throttle';


const HeaderSize = Object.freeze({
    LARGE: 0,
    SMALL: 1
});

export default {
    name: 'Navigation',

    data () {
        return {
            headerSize: HeaderSize.LARGE,
            navLinks: [
                {
                    url: '/home',
                    name: '主页'
                },
                {
                    url: '/life',
                    name: '生活'
                },
                {
                    url: '/tech',
                    name: '技术'
                }
            ]
        };
    },

    methods: {
        gotoSection (section) {
            if (this.currentSection !== section) {
                this.$router.push(section.url);
            }
        },

        onClickLink (url) {
            this.$router.push(url);
        }
    },

    computed: {
        navClass () {
            return {
                'no-shadow': this.headerSize === HeaderSize.LARGE
            };
        }
    },

    components: {
        WebsiteTitle
    }
}
</script>
<style scoped>
.navigation {
    font-size: 16px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.25s;
}

.navigation.no-shadow {
    box-shadow: none;
}

.navigation > * {
    display: inline-block;
}

.section-list {
    margin: 0.75em 0;
}

.navigation > .section-list > .section-link {
    display: inline-block;
    margin: 0 1em;
    font-weight: bold;
}

.navigation > .section-list > .section-link a.current {
    text-decoration: underline;
}

.navigation > .section-list > .section-link:last-child {
    margin-right: 0;
}

</style>
