<template>
  <div style="font-family: serif" class="news">
    <div class="container">
      <h2 id="pageTitle" class="d-flex justify-content-start mb-4">News</h2>
      <Search id="searchBar" :categories="categories" @change="onSearch($event)"></Search>
      <div class="row">
        <div class="col-6">
          <MainNews :data="data[0]" :isMain="true"></MainNews>
        </div>
        <div class="col-6">
          <SecondaryNews :data="data[1]"></SecondaryNews>
          <div class="row">
            <div class="col-6">
              <TertNews :data="data[2]" :isMain="false"></TertNews>
            </div>
            <div class="col-6">
              <TertNews :data="data[3]" :isMain="false"></TertNews>
            </div>
          </div>
        </div>
        
        <div class="row">
          <div v-for="(category, index) in filteredCategories" :key="index" :class="[`col-${12/filteredCategories.length}`, !filterCriteria.includes(category) ? 'hidden' : '']">
            <h3>{{category}}</h3>
            <div
              v-for="(item, index) in getPostsByCategory(category)"
              :key="index"
              v-show="item.isShown"
              class="mb-2"
            >
              <a :href="item.url" target="_blank">
                <button type="button" class="btn btn-info">{{item.description}}</button>
              </a>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../news.yaml";
import Search from "./Search";
import MainNews from "./MainNews";
import SecondaryNews from "./SecondaryNews";
import TertNews from "./TertieryNews";
import Footer from "./Footer"

export default {
  name: "News",
  components: {
    Search,
    MainNews,
    SecondaryNews,
    TertNews,
    Footer
  },
  data() {
    return {
      data: [],
      categories: {},
      filteredCategories: [],
      filterCriteria: [],
      // postsByCategory: []
    };
  },
  beforeMount() {
    this.init();
    this.getAllCategories();
    this.getFilteredCategories();
  },
  methods: {
    getPostsByCategory(category) {
      return this.data
        .slice(4, this.data.length)
        .filter(e => e.categories.includes(category) && e.isShown);
    },
    /**
     * Gets all categories listed in the cms file
     */
    getAllCategories() {
      let distinctCategories = [
        ...new Set(
          [].concat.apply(
            [],
            this.data.map(e => e.categories)
          )
        )
      ];
      this.filterCriteria = distinctCategories;
      this.categories = distinctCategories.reduce(
        (a, b) => ((a[b.toLowerCase()] = true), a),
        {}
      );
    },
    getFilteredCategories() {
      this.filteredCategories = [
        ...new Set(
          [].concat.apply(
            [],
            this.data.slice(4, this.data.length).map(e => e.categories)
          )
        )
      ];
    },
    /**
     * If the active categories are used in a single news
     */
    someCategory(e) {
      return e.categories.some(x => this.filterCriteria.includes(x.toLowerCase()));
    },
    /**
     * Combines the logic of the search input and the categories filter
     */
    onSearch(data) {
      let { value, categories } = data;
      this.init();
      this.filterCriteria = Object.keys(categories).filter(k => categories[k]);
      this.data = this.data.map(e => {
        if (value) {
          if (
            !e.description.match(new RegExp(value, "i")) ||
            !this.someCategory( e)
          )
            return { ...e, isShown: false };
          else return e;
        } else {
          if (!this.someCategory(e)) return { ...e, isShown: false };
          else return e;
        }
      });
      this.$forceUpdate()
    },
    /**
     * Prepares the initial data
     * Sets all categories to be shown
     */
    init() {
      this.data = info
        .map(e => ({ ...e, isShown: true, date: new Date(e.expiry) }))
        .filter(e => e.date > new Date())
        .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";
</style>
