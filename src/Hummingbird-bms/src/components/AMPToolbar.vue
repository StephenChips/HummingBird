<template>
  <form class="amp-toolbar p-3">
      <b-form-checkbox></b-form-checkbox>
      <b-button variant="info">New Article</b-button>
      <b-button variant="danger">Delete Article</b-button>
      <div class="verticle-seperator"></div>
  </form>
</template>

<script>
export default {
  name: 'amp-toolbar'
}
</script>

<style>
.amp-toolbar {
    display: flex;
    align-items: center;
}

.amp-toolbar > * {
  margin-right: 0.5em;
}
</style>
