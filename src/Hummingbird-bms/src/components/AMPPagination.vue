<template>
  <nav class="amp-pagination">
    <ul class="pagination">
      <li class="page-item previous-button" :class="{ disabled: isPreviousButtonDisabled }">
        <a class="page-link" href="#" @click="$emit('goto', currentPage - 1)">
          &laquo;
        </a>
      </li>
      <li v-for="page of pageNumbers" :key="page"
        class="page-item"
        :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click="$emit('goto', page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: isNextButtonDisabled }">
        <a class="page-link next-button" href="#" @click="$emit('goto', currentPage + 1)">
          &raquo;
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// Emit selected page:

export default {
    name: 'AMPPagination',

    props: {
        size: {
            type: Number,
            default: 5
        },
        start: {
            type: Number,
            default: 0
        },
        isPreviousButtonDisabled: {
            type: Boolean,
            default: true
        },
        isNextButtonDisabled: {
            type: Boolean,
            default: true
        },
        currentPage: {
            type: Number,
            default: null
        }
    },

    computed: {
        pageNumbers () {
            var result = [];
            for (var i = 0; i < this.size; i++) {
                result.push(this.start + i);
            }
            return result;
        }
    }
}
</script>

<style>

</style>
