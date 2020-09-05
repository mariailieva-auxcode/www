<template>
  <div class="container" id="resources">
    <div class="resources">
      <div class="col-12">
        <h1 class="title">{{title}}</h1>
        <h1 class="title-label">{{label}}</h1>
        <div class="only-for-mobile">
          <h5 class="col-6">Articles</h5>
          <h5 class="col-6">Links</h5>
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps"
          v-for="card of articles.articles"
          :key="card.image"
        >
          <img class="articles-image" :src="card.image" />
          <h3>{{card.label}}</h3>
          <p>{{card.description}}</p>
          <div class="row">
            <router-link :to="`/${$router.history.current.params.lang}`">{{card.link}}</router-link>
            <img src="/assets/arrow-right-blue.svg" />
          </div>
        </div>
      </div>
      <h1 class="col-12 title-label">{{linksTitle}}</h1>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-ml-6 col-xl-4 info-links"
          v-for="link of links.links"
          :key="link.label"
        >
          <div class="style-card">
            <h3>{{link.label}}</h3>
            <p>{{link.description}}</p>
            <a class="style-links">{{link.link}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articles from "js-yaml-loader!../../../content/nl/general/resources.yaml";
import articlesEn from "js-yaml-loader!../../../content/en/general/resources.yaml";
export default {
  name: "Resources",
  data() {
    return {
      articles: {},
      links: {},
      title: "",
      label: "",
      linksTitle: "",
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
      this.links = data;
      this.title = data.title;
      this.label = data["title-label"];
      this.linksTitle = data["links-title"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.resources {
  .only-for-mobile {
    display: none;
  }
  .title {
    color: #26272e;
  }
  .title-label {
    text-align: left;
    margin: 50px 0 20px;
    color: #26272e;
    font-size: 30px;
  }
  .info-steps {
    text-align: left;
    .articles-image {
      max-width: 330px;
      max-height: 224px;
      width: 100%;
    }
    h3 {
      color: #393a4d;
      margin: 20px 0;
      font-weight: 700;
    }
    .row > img {
      margin-left: 8px;
    }
  }
  .info-links {
    .style-card {
      padding: 25px;
      text-align: left;
      h3 {
        color: #393a4d;
        font-weight: 700;
      }
      p {
        font-weight: 400;
      }
    }
  }
}
</style>