<template>
  <div class="container" id="resources">
    <div class="resources">
      <div class="col-12 labels">
        <div>
          <h1 class="title">{{title}}</h1>
        </div>
        <div class="changed-buttons">
          <button class="button-labels" @click="choise = 'articles'">
            <h1 class="title-label" :class="{'articles' : choise == 'articles'}">{{label}}</h1>
            <div class="green-line" :class="{'articles' : choise == 'articles'}"></div>
          </button>
          <button class="button-labels" @click="choise = 'links'">
            <h1 class="title-label" :class="{'links' : choise == 'links'}">Useful Links</h1>
            <div class="green-line" :class="{'links' : choise == 'links'}"></div>
          </button>
          <button class="button-labels" @click="choise = 'block'">
            <h1 class="title-label" :class="{'block' : choise == 'block'}">Blog</h1>
            <div class="green-line" :class="{'block' : choise == 'block'}"></div>
          </button>
        </div>
        <div class="all-sections-button">
          <button>
            <p>See All</p>
            <img src="/assets/arrow-right-blue.svg" />
          </button>
        </div>
        <!-- <div class="only-for-mobile">
          <h5 class="col-6">Articles</h5>
          <h5 class="col-6">Links</h5>
        </div>-->
      </div>
      <div class="row articles" v-if="choise == 'articles'">
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

      <!-- <h1 class="col-12 title-label">{{linksTitle}}</h1> -->
      <div class="row links" v-if="choise == 'links'">
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
      <div class="row block" v-if="choise == 'block'">
        <p>Coming soon!</p>
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
      choise: "articles",
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
  .labels {
    .changed-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
    .all-sections-button {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border: none;
        background: unset;
        outline: none;
        p {
          margin-right: 15px;
          margin-bottom: 0;
          color: #5694e8;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
  }
  .title {
    color: #26272e;
  }
  .button-labels {
    border: none;
    background-color: unset;
    outline: none;
    margin: 50px 17px 35px;
    position: relative;
    width: 115px;
    padding: 0;
    .title-label {
      text-align: center;
      color: #9597ac;
      font-size: 20px;
      margin-top: 0;
      &.articles,
      &.links,
      &.block {
        color: #26272e;
      }
    }
    .green-line {
      position: absolute;
      height: 4px;
      border-right: 115px solid #55b364;
      margin-bottom: 60px;
      display: none;
      &.articles,
      &.links,
      &.block {
        display: block;
      }
    }
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
  > .row.block {
    border-radius: 25px;
    background-color: white;
    width: 600px;
    height: 200px;
    box-shadow: 0px 3px 10px #00000014;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>