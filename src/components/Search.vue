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
        <input
          class="categoriesCheckbox"
          type="checkbox"
          :id="'cat'+index"
          v-model="categories[key]"
          @change="submit"
        />
        <label id="categories" class="form-check-label" :for="'cat'+index">{{key}}</label>
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
