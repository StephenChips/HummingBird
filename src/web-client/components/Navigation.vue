<template>
<div class="navigation" :class="navClass">
    <WebsiteTitle />
    <ul class="plain section-list">
        <li v-for="section of sections" :key="section.url" class="f-small section-link">
            <a href="#" :class="{ plain: true, current: section.id == currentSection.id }" @click.prevent="gotoSection(section)">{{ section.name }}</a>
        </li>
    </ul>
</div>
</template>

<script>
import request from '../src/request';
import { mapState } from 'vuex';
import WebsiteTitle from './WebsiteTitle.vue';
import { throttle } from 'lodash';


const HeaderSize = Object.freeze({
    LARGE: 0,
    SMALL: 1
});

export default {
    name: 'Navigation',

    created () {
        this.initWindowEvents();
        request.getSections('/', '/tech', '/life').then(sections => {
            this.sections = sections;
        });
    },

    data () {
        return {
            headerSize: HeaderSize.LARGE,
            sections: []
        };
    },

    methods: {
        gotoSection (section) {
            if (this.currentSection !== section) {
                this.$router.push(section.url);
            }
        },

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
            return {
                'no-shadow': this.headerSize === HeaderSize.LARGE
            };
        },
        ...mapState({
            currentSection: state => state.app.currentSection
        })
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
