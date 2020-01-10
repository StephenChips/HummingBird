<template>
<div class="navigation">
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

export default {
    name: 'Navigation',

    created () {
        request.getSections('/', '/tech', '/life').then(sections => {
            this.sections = sections;
        })
    },

    data () {
        return {
            sections: []
        };
    },

    methods: {
        gotoSection (section) {
            if (this.currentSection !== section) {
                this.$router.push(section.url);
            }
        }
    },

    computed: {
        ...mapState({
            currentSection: state => state.app.currentSection
        })
    }
}
</script>
<style scoped>
.navigation {
    font-size: 16px;
    text-align: center;
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
