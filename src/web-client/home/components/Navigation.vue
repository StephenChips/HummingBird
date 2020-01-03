<template>
<div class="navigation">
    <ul class="plain section-list">
        <li v-for="section of sections" :key="section.url" class="f-small section-link">
            <a href="#" :class="{ plain: true, current: section == currentSection }" @click.prevent="gotoSection(section)">{{ section.title }}</a>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'Navigation',

    mounted () {
        this.sections = this.loadSection();
        this.currentSection = this.sections.find(section => section.url === this.$route.path);
    },

    data () {
        return {
            currentSection: undefined,
            sections: undefined
        };
    },

    methods: {
        loadSection () {
            return [
                {
                    url: '/',
                    title: '主页'
                },
                {
                    url: '/tech',
                    title: '技术区'
                },
                {
                    url: '/life',
                    title: '生活区'
                }
            ];
        },

        gotoSection (section) {
            if (this.currentSection !== section) {
                this.currentSection = section;
                this.$router.push(section.url);
            }

        }
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
