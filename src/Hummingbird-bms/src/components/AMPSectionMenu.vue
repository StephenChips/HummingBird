<template>
    <nav class="amp-sidebar">
        <ul class="amp-sidebar-section-list list-unstyled">
            <li class="amp-sidebar-header">Sections</li>
            <li v-for="section of sections" :key="section.id" :class="section.active ? 'active' : ''">
                <span>{{ section.title }}</span>
                <span v-if="section.active">&gt;</span>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'AMPSectionMenu',

    data () {
        return {
            sections: [{
                id: 1,
                title: 'sec 1',
                active: true,
            }, {
                id: 2,
                title: 'sec 2',
                active: false,
            }, {
                id: 3,
                title: 'sec 3',
                active: false
            }]
        }
    }
}
</script>

<style scoped>
.amp-sidebar {
    color: white;
}

.amp-sidebar-header {
    background:#1ecee9;
    padding: 0.5em;
    padding-left: 30px;
    font-size: 1.25rem;
    font-weight: bolder;
    border-top-left-radius: 0.25em;
    border-top-right-radius: 0.25em;
}

.amp-sidebar-section-list {
    width: 100%;
    font-size: 1rem;
    margin: 0;
    cursor: pointer;
    box-sizing: content-box;
}

.amp-sidebar-section-list li {
    background: #17a2b8;
    padding: 0.5em;
    padding-left: 30px;
}

.amp-sidebar-section-list li:last-child {
    border-bottom-left-radius: 0.25em;
    border-bottom-right-radius: 0.25em;
    border-bottom: solid 2px #0e5f6b;
}

.amp-sidebar-section-list a {
    color: white;
}

.amp-sidebar-section-list li.active,
.amp-sidebar-section-list li:active {
    background: #1db2c9;
}
</style>