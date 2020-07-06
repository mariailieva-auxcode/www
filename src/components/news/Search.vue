<template>
  <div class="row row-fluid align-items-baseline">
    <!-- <div class="col-3">
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
    </div>-->
    <div class="col-12 d-flex categories">
      <p
        class="btn"
        :class="showAll ? 'categories__active' : 'categories__unactive'"
        @click="toggleAllNews()"
      >All</p>
      <div class="form-check options" v-for="(val, key, index) in categories" :key="index">
        <p
          class="btn"
          :class="categories[key] && !showAll ? 'categories__active' : 'categories__unactive'"
          @click="filter(key)"
        >{{key}}</p>
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

<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
.categories {
  .options {
    margin-right: 10px;
  }

  p {
    font-size: 14px;
  }

  &__active {
    font-weight: bold;
  }

  &__unactive {
    font-weight: normal;
  }
}
</style>
