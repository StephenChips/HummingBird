<template>
<div>
    <nav id="nav-section" ref="nav-section" :class="[navClass]">
        <WebsiteTitle :size="headerSize"/>
        <Navigation />
    </nav>
    <router-view id="main-section"></router-view>
</div>
</template>

<script>
import WebsiteTitle from './WebsiteTitle.vue';
import Navigation from './Navigation.vue';

import { throttle } from 'lodash';

const HeaderSize = {
    LARGE: 0,
    SMALL: 1
};

export default {
    name: 'app',

    data () {
        return {
            headerSize: HeaderSize.LARGE
        };
    },

    mounted () {
        this.initWindowEvents();

        // When scrollTop equals to mmainSection.marginTop, change the size of the website's title
    },

    methods: {

        initWindowEvents () {
            window.addEventListener('scroll', throttle(() => {
                const TRIGGER_OFFSET = 30;
                if (this.headerSize == HeaderSize.LARGE && window.pageYOffset > TRIGGER_OFFSET) {
                    this.headerSize = HeaderSize.SMALL;
                } else if (this.headerSize == HeaderSize.SMALL && window.pageYOffset <= TRIGGER_OFFSET) {
                    this.headerSize = HeaderSize.LARGE;
                }
            }), 200);
        }
    },

    computed: {
        navClass () {
            return [this.headerSize == HeaderSize.LARGE ? 'no-shadow' : ''];
        }
    },

    components: { WebsiteTitle, Navigation }
}
</script>
<style scoped>
#nav-section {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: white;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.25s;
}

#nav-section.no-shadow {
    box-shadow: none;
}

#main-section {
    margin-top: 150px;
}

</style>
