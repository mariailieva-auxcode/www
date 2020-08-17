<template>
  <lazy-background
    :src="headerImage"
    placeholder="https://placeholder.pics/svg/1300x800"
    :blur="30"
  >
    <div slot="content" class="header">
      <div class="header-overlay"></div>
      <div class="header-content">
        <h1>{{headerTitle}}</h1>
        <h3>{{headerDescription}}</h3>
      </div>
    </div>
  </lazy-background>
</template>

<script>
import headerNews from "js-yaml-loader!../../../../content/nl/news.yaml";
import headerNewsEn from "js-yaml-loader!../../../../content/en/news.yaml";
export default {
  name: "NewsHeader",
  data() {
    return {
      headerImage: "",
      headerTitle: "",
      headerDescription: "",
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    },
  },
  methods: {
    init() {
      let data = this.lang === "en" ? headerNewsEn : headerNews;
      this.headerImage = data.headerImage;
      this.headerTitle = data.headerTitle;
      this.headerDescription = data.headerDescription;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/components/header.scss";
.news-header {
  .header-content {
    color: white;
    h1 {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 50px;
      margin-bottom: 30px;
    }
    h3 {
      font-family: $font__Lato;
      font-weight: 400;
      font-size: 25px;
    }
  }
}
</style>