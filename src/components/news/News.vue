<template>
  <div class="container">
    <div :class="{'news-preview': isPreview, 'news': !isPreview}">
      <div class="container-fluid">
        <Title class="title" v-if="!isPreview" :title="title" :sectionTitle="subTitle"></Title>
        <Search
          id="searchBar"
          :categories="categories"
          @change="onSearch($event)"
          v-if="!isPreview"
        ></Search>
        <div class="row row-fluid news-container">
          <div class="col-6">
            <MainNews :data="firstThreeNews[0]" :isMain="true"></MainNews>
          </div>
          <div class="col-6 secondaryNews">
            <div class="row row-fluid">
              <div class="col-6" v-show="firstThreeNews[1]">
                <MainNews :data="firstThreeNews[1]" :isMain="false"></MainNews>
              </div>
              <div class="col-6" v-show="firstThreeNews[2]">
                <MainNews :data="firstThreeNews[2]" :isMain="false"></MainNews>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-if="!isPreview">
          <hr />
          <div v-for="(category, index) in filteredCategories" :key="index" :class="`col-6`">
            <h3 class="news-tag-title">{{category}}</h3>
            <div
              v-for="(item, index) in getPostsByCategory(category)"
              :key="index"
              class="mb-5"
              :class="{'hidden': !filterCriteria.some(c => item.categories.includes(c)) || !item.isShown}"
            >
              <SecondaryNews :data="item" :isMain="false"></SecondaryNews>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../../content-nl/news.yaml";
import infoEn from "js-yaml-loader!../../../content-en/news.yaml";
import Search from "./Search";
import MainNews from "./MainNews";
import SecondaryNews from "./SecondaryNews";
import Title from "../layout/Title";

export default {
  name: "News",
  components: {
    Search,
    MainNews,
    SecondaryNews,
    Title
  },
  props: {
    isPreview: { default: false, type: Boolean },
    mode: { default: "home", type: String }
  },
  data() {
    return {
      data: [],
      categories: {},
      filteredCategories: [],
      filterCriteria: [],
      subTitle: "",
      title: "",
      firstThreeNews: []
    };
  },
  beforeMount() {
    this.init();
    this.getAllCategories();
    this.getFilteredCategories();
  },
  methods: {
    setFirstThreeNews() {
      this.firstThreeNews = [];
      this.firstThreeNews = this.data.filter(e => e.isShown);
      let length = this.firstThreeNews < 3 ? this.firstThreeNews : 2;
      this.firstThreeNews = this.firstThreeNews.slice(0, length);
    },
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
      this.setFirstThreeNews();
      this.$forceUpdate();
    },
    /**
     * Prepares the initial data
     * Sets all categories to be shown
     */
    init() {
      this.subTitle = info.subTitle;
      this.title = info.title;
      this.title = infoEn.title;

      if (this.mode === "home") {
        this.data = info.news
          .map(e => ({ ...e, isShown: true, date: new Date(e.expiry) }))
          .filter(e => e.date > new Date())
          .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      } else {
        this.data = info.news
          .map(e => ({ ...e, isShown: true, date: new Date(e.expiry) }))
          .filter(e => e.date > new Date() && e.categories.includes(this.mode))
          .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      }
      this.firstThreeNews = this.data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
.container-fluid {
  .title {
    margin-top: 30px;
  }
}

.news {
  .news-container > .col-6 {
    height: 635px;
  }

  .news-tag-title {
    text-align: left;
    font-size: 25;
    font-family: $font__IBMbold;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .news-container > .secondaryNews > .news {
    height: 320px;
  }

  .news-container > .secondaryNews > .row {
    height: 315px;
  }

  .suppliers {
    max-width: 1400px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
