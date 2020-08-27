<template>
  <div class="container" id="articles">
    <div class="articles">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row">
        <div class="col-4 info-steps" v-for="card of articles.articles" :key="card.image">
          <img :src="card.image" />
          <p>{{card.label}}</p>
          <p>{{card.description}}</p>
          <div class="row">
            <router-link :to="`/${$router.history.current.params.lang}`">{{card.link}}</router-link>
            <img src="/assets/arrow-right-blue.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articles from "js-yaml-loader!../../../content/nl/general/articles.yaml";
import articlesEn from "js-yaml-loader!../../../content/en/general/articles.yaml";
export default {
  name: "Articles",
  data() {
    return {
      articles: {},
      title: "",
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
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? articlesEn : articles;
      this.articles = data;
      this.title = data.title;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
</style>