<template>
<VueJsPaginate
    @input="$emit('input', $event)"
    :value="value"
    :page-count="pageCount"
    prev-text="上一页"
    next-text="下一页"
    container-class="paginate-container"
    page-class="paginate-page"
    prev-class="paginate-prev"
    next-class="paginate-next"
    break-view-class="paginate-break-view"
    active-class="paginate-active"
    disabled-class="paginate-disabled"
    page-link-class="paginate-page-link"
    prev-link-class="paginate-prev-link"
    next-link-class="paginate-next-link"
    break-view-link-class="pagiante-break-view-link"
></VueJsPaginate>
</template>

<script>
import VueJsPaginate from 'vuejs-paginate'
export default {
    name: 'Paginate',

    props: {
        value: Number,
        pageCount: Number
    },

    components: { VueJsPaginate }

}
</script>

<style>
.paginate-container {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
}

.paginate-page,
.paginate-prev,
.paginate-next,
.paginate-break-view {
    font-size: 1rem;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.5rem;
}

.paginate-page-link,
.paginate-prev-link,
.paginate-next-link,
.paginate-break-view-link {
    padding: 5px;
}


.paginate-active {
    font-weight: bold;
}

.paginate-disabled {
    color: #999999;
}

.paginate-disabled > a {
    outline: none;
    cursor: default;
}

</style>
