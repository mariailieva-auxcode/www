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
      <button
        class="btn"
        :class="showAll ? 'btn-primary' : 'btn-secondary'"
        @click="toggleAllNews()"
      >All</button>
      <div class="form-check category" v-for="(val, key, index) in categories" :key="index">
        <button
          class="btn"
          :class="categories[key] && !showAll ? 'btn-primary' : 'btn-secondary'"
          @click="filter(key)"
        >{{key}}</button>
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
      search: "",
      showAll: true
    };
  },
  methods: {
    toggleAllNews(show = true) {
      Object.keys(this.categories).forEach(
        category => (this.categories[category] = show)
      );
      this.showAll = show;
      this.submit();
    },
    filter(index) {
      if (this.showAll) this.toggleAllNews(false);

      this.categories[index] = !this.categories[index];

      const hasSelectedCategory = Object.values(this.categories).some(
        category => category == true
      );

      if (!hasSelectedCategory) this.toggleAllNews();
      this.submit();
    },
    submit() {
      this.$emit("change", { value: this.search, categories: this.categories });
    }
  }
};
</script>

<style lang="css" scoped>
@import "../../assets/styles/main.scss";
.category {
  margin-right: 10px;
}
</style>
