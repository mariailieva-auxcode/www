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
          <!-- <MainNews :data="data[1]"></MainNews> -->
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

        <!-- <div v-for="(item, index) in data" :key="index" v-show="item.isShown"> -->
        <!-- <div v-for="(item, index) in getPostsByCategory(category)" :key="index" v-show="item.isShown"> -->
        <!-- <link-prevue :url="item.url">
            <template slot-scope="props">
              <div id="card" class="card">
                <img id="box-image" class="card-img-top" :src="props.img" :alt="props.title" />
                <div class="card-block">
                  <p>{{ item.description }}</p>
                  <h4 class="card-title">{{props.title}}</h4>
                  <div class="card-btn">
                    <a v-bind:href="props.url" class="card-btn">View More</a>
                  </div>
                </div>
              </div>
            </template>
          </link-prevue>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../data.yaml";
// import LinkPrevue from "link-prevue";
import Search from "./Search";
import MainNews from "./MainNews";
import SecondaryNews from "./SecondaryNews";
import TertNews from "./TertieryNews";

export default {
  name: "News",
  components: {
    // LinkPrevue,
    Search,
    MainNews,
    SecondaryNews,
    TertNews
  },
  data() {
    return {
      data: [],
      categories: {}
    };
  },
  beforeMount() {
    this.init();
    this.getAllCategories();
  },
  methods: {
    // getPostsByCategory(category) {
    //   return this.data.filter(e => e.categories.includes(category))
    // }
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
      this.categories = distinctCategories.reduce(
        (a, b) => ((a[b.toLowerCase()] = true), a),
        {}
      );
    },
    /**
     * If the active categories are used in a single news
     */
    someCategory(filtered, e) {
      return e.categories.some(x => filtered.includes(x.toLowerCase()));
    },
    /**
     * Combines the logic of the search input and the categories filter
     */
    onSearch(data) {
      let { value, categories } = data;
      this.init();
      let filtered = Object.keys(categories).filter(k => categories[k]);
      this.data = this.data.map(e => {
        if (value) {
          if (
            !e.title.match(new RegExp(value, "i")) ||
            !this.someCategory(filtered, e)
          )
            return { ...e, isShown: false };
          else return e;
        } else {
          if (!this.someCategory(filtered, e)) return { ...e, isShown: false };
          else return e;
        }
      });
    },
    /**
     * Prepares the initial data
     * Sets all categories to be shown
     */
    init() {
      this.data = info.map(e => ({ ...e, isShown: true }));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";
</style>
