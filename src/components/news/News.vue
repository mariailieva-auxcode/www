<template>
  <div class="container newss">
    <div :class="{'news-preview': isPreview, 'news': !isPreview}">
      <div class="container-fluid">
        <div class="row">
          <Title class="title col-xl-6" v-if="!isPreview" :title="title" :sectionTitle="subTitle"></Title>
          <div class="row col-xl-6 articles" v-if="!isPreview">
            <div class="row col-xl-12 header-paragraph">
              <p>Specified articles for:</p>
            </div>
            <div class="row col-xl-12 header-buttons">
              <button class="button1" @click="filterByGroup('site owner')">Site owner</button>
              <button class="button2" @click="filterByGroup('specialist')">Specialist</button>
              <button class="button3" @click="filterByGroup('project developer')">project developer</button>
            </div>
          </div>
        </div>
        <Search
          class="categories"
          id="searchBar"
          :categories="categories"
          @change="onSearch($event)"
          v-if="!isPreview"
        ></Search>
        <div class="row row-fluid news-container">
          <div class="col-sm-12 col-lg-6 col-xl-6 col-12 news">
            <MainNews :data="firstThreeNews[0]" :isMain="true"></MainNews>
          </div>
          <div class="col-sm-12 col-xl-6 col-lg-6 col-12 secondaryNews">
            <div class="row row-fluid">
              <div class="col-xl-6 col-sm-6 col-lg-6 col-12" v-show="firstThreeNews[1]">
                <MainNews :data="firstThreeNews[1]" :isMain="false"></MainNews>
              </div>
              <div class="col-xl-6 col-sm-6 col-lg-6 col-12" v-show="firstThreeNews[2]">
                <MainNews :data="firstThreeNews[2]" :isMain="false"></MainNews>
              </div>
            </div>
          </div>
        </div>
        <div class="row mobile-resolution" v-if="!isPreview">
          <hr />
          <div
            v-for="(category, index) in filteredCategories"
            :key="index"
            :class="`col-xl-6 col-12`"
          >
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
import info from "js-yaml-loader!../../../content/nl/news.yaml";
import infoEn from "js-yaml-loader!../../../content/en/news.yaml";
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
    Title,
  },
  props: {
    isPreview: { default: false, type: Boolean },
    mode: { default: "home", type: String },
  },
  data() {
    return {
      data: [],
      categories: {},
      group: "",
      filteredCategories: [],
      filterCriteria: [],
      firstThreeNews: [],
      filteredGroup: "",
      lang: "",
      subTitle: "",
      title: "",
    };
  },
  beforeMount() {
    this.init();
    this.getAllCategories();
    this.getFilteredCategories();
  },
  watch: {
    $route() {
      this.init();
      this.getAllCategories();
      this.getFilteredCategories();
    },
  },
  methods: {
    setFirstThreeNews() {
      this.firstThreeNews = [];
      this.firstThreeNews = this.data.filter((e) => e.isShown);
      let length =
        this.firstThreeNews.length <= 3 ? this.firstThreeNews.length : 3;
      this.firstThreeNews = this.firstThreeNews.slice(0, length);
    },
    getPostsByCategory(category) {
      return this.data
        .slice(4, this.data.length)
        .filter((e) => e.categories.includes(category));
    },
    filterByGroup(group) {
      if (this.filteredGroup == group) {
        this.data.forEach((x) => (x.isShown = true));
        this.filteredGroup = "";
      } else {
        this.data.forEach(
          (newItem) => (newItem.isShown = newItem.group?.includes(group))
        );
        this.filteredGroup = group;
      }
      this.setFirstThreeNews();
    },
    /**
     * Gets all categories listed in the cms file
     */
    getAllCategories() {
      let distinctCategories = [
        ...new Set(
          [].concat.apply(
            [],
            this.data.map((e) => e.categories)
          )
        ),
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
            this.data.slice(4, this.data.length).map((e) => e.categories)
          )
        ),
      ];
    },
    /**
     * If the active categories are used in a single news
     */
    someCategory(e) {
      return e.categories.some((x) =>
        this.filterCriteria.includes(x.toLowerCase())
      );
    },
    /**
     * Combines the logic of the search input and the categories filter
     */
    onSearch(data) {
      let { value, categories } = data;
      this.init();
      this.filterCriteria = Object.keys(categories).filter(
        (k) => categories[k]
      );
      this.data = this.data.map((e) => {
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
      this.lang = this.$router.history.current.params.lang;
      this.data = this.lang === "en" ? infoEn : info;
      this.subTitle = this.data.subTitle;
      this.title = this.data.title;

      if (this.mode === "home") {
        this.data = this.data.news
          .map((e) => ({ ...e, isShown: true, date: new Date(e.expiry) }))
          .filter((e) => e.date > new Date())
          .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      } else {
        this.data = this.data.news
          .map((e) => ({ ...e, isShown: true, date: new Date(e.expiry) }))
          .filter(
            (e) => e.date > new Date() && e.categories.includes(this.mode)
          )
          .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
      }
      this.firstThreeNews = this.data;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
div.container {
  padding-right: 0;
  padding-left: 0;
}
.container-fluid {
  .row {
    .articles {
      font-family: $font__Source_Sans;
      font-size: 15px;
      display: grid;
      justify-content: flex-end;
      p {
        margin-left: 20px;
        color: #9597ac;
      }
      .button1 {
        background-color: #55b364;
      }
      .button2 {
        background-color: #1d226f;
      }
      .button3 {
        background-color: #2783ff;
      }
      button {
        outline: none;
        padding: 3px 12px;
        margin-left: 20px;
        color: #f7f7fa;
        border-radius: 5px;
        border: none;
      }
    }
  }
  .title {
    margin-top: 30px;
  }
}

.news {
  .news-tag-title {
    text-align: left;
    font-size: 25;
    font-family: $font__IBM;
    font-weight: 700;
    margin-bottom: 30px;
  }

  .news-container > .secondaryNews > .news {
    height: 320px;
  }

  .news-container > .secondaryNews > .row {
    height: 315px;
    @media screen and (max-width: 576px) {
      height: auto;
    }
  }

  .suppliers {
    max-width: 1400px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
