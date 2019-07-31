<template>
    <ul class="list-group bg-light rounded">
        <li v-for="category of categories" :key="category.id" class="list-group-item">
            <span>{{ category.title }}</span>
            <a class="button button-danger"><i class="fas fa-times"></i></a>
            <a class="button button-info"><i class="fas fa-edit"></i></a>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'amp-catgegory-list',

    data () {
        return {
            categories: [{
                id: 1,
                title: 'name'
            }, {
                id: 2,
                title: 'name'
            }, {
                id: 3,
                title: 'name'
            }, {
                id: 4,
                title: 'name'
            }, {
                id: 5,
                title: 'name'
            }]
        }
    }
}
</script>

<style>
.amp-category-list li span {
    font-size: 1.25rem;
}
</style>
