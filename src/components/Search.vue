<template>
  <div class="row align-items-baseline">
    <div class="col-3">
      <form @submit.prevent="submit">
        <div class="form-group">
          <input
            id="searchField"
            type="text"
            class="form-control"
            placeholder="Search..."
            v-model="search"
            @input="submit"
          />
        </div>
      </form>
    </div>
    <div class="col-9 d-flex">
      <div class="form-check category" v-for="(val, key, index) in categories" :key="index">
        <button class="btn" :class="categories[key] ? 'btn-primary' : 'btn-secondary'" @click="filter(key)">
          {{key}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    categories: Object
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {
    filter(index) {
      this.categories[index] = !this.categories[index];
      this.submit();
    },
    submit() {
      this.$emit("change", { value: this.search, categories: this.categories });
    }
  }
};
</script>

<style lang="css" scoped>
@import '../assets/styles/main.scss';
.category {
  margin-right: 10px;
}
</style>
