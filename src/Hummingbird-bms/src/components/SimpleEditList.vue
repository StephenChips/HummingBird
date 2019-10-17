<template>
    <div class="card">
      <div class="card-header edit-list-header">
        <h5 class="edit-list-header-title">{{ title }}</h5>
        <button class="btn btn-info btn-sm edit-list-header-button" @click="$emit('create-item')">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <ul class="list-group list-group-flush">
          <li v-for="item of items" :key="item.id"
            :class="['list-group-item', 'edit-list-item', { active: currentActiveItem === item  }]"
            @mouseover="currentFocusingItem = item"
            @mouseout="currentFocusingItem = null"
            @click.stop="onClickListItem(item)">
              <div class="item-title">{{ item.title }}</div>
              <div class="item-toolbar" v-show="currentFocusingItem === item">
                  <a @click.stop="$emit('delete-item', item)">
                    <i class="fas fa-times"></i>
                  </a>
                  <a @click.stop="$emit('update-item', item)">
                    <i class="fas fa-edit"></i>
                  </a>
              </div>
          </li>
      </ul>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            default: () => []
        }
    },

    data () {
        return {
            currentActiveItem: null,
            currentFocusingItem: null,
        };
    },

    methods: {
        onClickListItem (item) {
            if (item === this.currentActiveItem) {
                this.currentActiveItem = null;
                this.$emit('deselect-item', item);
            } else {
                this.currentActiveItem = item;
                this.$emit('select-item', item);
            }
        } 
    }
}
</script>

<style scoped>
.edit-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.edit-list-header .edit-list-header-title {
    flex: auto;
}

.edit-list-header button {
    flex: none;
}

.edit-list-item {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
}

.edit-list-item > .item-title {
    flex: auto;
    margin: 0;
    text-decoration: none;
    color: black;
    user-select: none;
}

.edit-list-item > .item-title:hover {
    text-decoration: underline;
    color: #6c757d;
}

.edit-list-item > .item-toolbar {
    display: flex;
    flex: 0 0 2.3em;
    justify-content: space-between;
    align-items: center;
}

.edit-list-item > .item-toolbar i {
    color: #6c757d;
}

.edit-list-item.active > .item-title,
.edit-list-item.active > .item-title:hover,
.edit-list-item.active > .item-toolbar i {
    color: white;
}
</style>
