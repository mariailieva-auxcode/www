<template>
  <div :class="{'news-preview': isPreview, 'news': !isPreview}">
    <div class="container-fluid">
      <div class="row" v-if="!isPreview">
        <h2 id="pageTitle" class="d-flex justify-content-start mb-4">News</h2>
      </div>
      <Search id="searchBar" :categories="categories" @change="onSearch($event)" v-if="!isPreview"></Search>
      <div class="row row-fluid news-container">
        <div class="col-6">
          <MainNews :data="data[0]" :isMain="true"></MainNews>
        </div>
        <div class="col-6 secondaryNews">
          <div class="row row-fluid">
            <div class="col-6">
              <MainNews :data="data[1]" :isMain="false"></MainNews>
            </div>
            <div class="col-6">
              <MainNews :data="data[2]" :isMain="false"></MainNews>
            </div>
          </div>
        </div>
      </div>

      <div class="row" v-if="!isPreview">
        <div
          v-for="(category, index) in filteredCategories"
          :key="index"
          :class="`col-${12/filteredCategories.length}`"
        >
          <h3>{{category}}</h3>
          <div
            v-for="(item, index) in getPostsByCategory(category)"
            :key="index"
            class="mb-2"
            :class="{'hidden': !filterCriteria.includes(category) || !item.isShown}"
          >
            <a :href="item.url" target="_blank">
              <button type="button" class="btn btn-info">{{item.description}}</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../../content/news.yaml";
import Search from "./Search";
import MainNews from "./MainNews";

export default {
  name: "News",
  components: {
    Search,
    MainNews
  },
  props: {
    isPreview: { default: false, type: Boolean }
  },
  data() {
    return {
      data: [],
      categories: {},
      filteredCategories: [],
      filterCriteria: []
      // postsByCategory: []
    };
  },
  beforeMount() {
    this.init();
    this.getAllCategories();
    this.getFilteredCategories();
    console.log(this.isPreview)
  },
  methods: {
    getPostsByCategory(category) {
      return this.data
        .slice(4, this.data.length)
        .filter(e => e.categories.includes(category));
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
      return e.categories.some(x =>
        this.filterCriteria.includes(x.toLowerCase())
      );
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
            !this.someCategory(e)
          )
            return { ...e, isShown: false };
          else return e;
        } else {
          if (!this.someCategory(e)) return { ...e, isShown: false };
          else return e;
        }
      });
      this.$forceUpdate();
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
@import "../../assets/styles/main.scss";
.row {
  max-width: 80%;
}

.news {
  .news-container>.col-6 {
      height: 635px;
  }

  .news-container>.secondaryNews>.news {
      height: 320px;
  }

  .news-container>.secondaryNews>.row {
      height: 315px;
  }

  .suppliers {
      max-width: 1400px;
      margin-right: auto;
      margin-left: auto;
  }
}
</style>
