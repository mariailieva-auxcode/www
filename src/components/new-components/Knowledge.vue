<template>
  <div class="container" id="knowledge">
    <div class="knowledge">
      <div class="col-12 labels">
        <div>
          <h1 class="title">{{ title }}</h1>
        </div>
        <div class="changed-buttons">
          <button class="button-labels" @click="choise = 'articles'">
            <h1 class="title-label" :class="{ articles: choise == 'articles' }">
              {{ label }}
            </h1>
            <div
              class="green-line"
              :class="{ articles: choise == 'articles' }"
            ></div>
          </button>
          <button class="button-labels" @click="choise = 'links'">
            <h1 class="title-label" :class="{ links: choise == 'links' }">
              Useful Links
            </h1>
            <div class="green-line" :class="{ links: choise == 'links' }"></div>
          </button>
          <button class="button-labels" @click="choise = 'blog'">
            <h1 class="title-label" :class="{ blog: choise == 'blog' }">
              Blog
            </h1>
            <div class="green-line" :class="{ blog: choise == 'blog' }"></div>
          </button>
        </div>
        <!-- <div class="all-sections-button">
          <button>
            <p>See All</p>
            <img src="/assets/arrow-right-blue.svg" />
          </button>
        </div> -->
      </div>
      <div class="row articles" v-if="choise == 'articles'">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps"
          v-for="(card, index) of articles.articles"
          :key="index"
        >
          <div class="style-card">
            <img class="articles-image" :src="card.image" />
            <h3>{{ card.label }}</h3>
            <p>{{ card.description }}</p>
            <div class="row">
              <router-link :to="`/${$router.history.current.params.lang}`">{{
                card.link
              }}</router-link>
              <img src="/assets/arrow-right-blue.svg" />
            </div>
          </div>
        </div>
      </div>
      <div class="row links" v-if="choise == 'links'">
        <div
          class="col-12 col-sm-12 col-ml-6 col-xl-4 info-links"
          v-for="(link, i) of links.links"
          :key="i"
        >
          <div class="style-card">
            <h3>{{ link.label }}</h3>
            <p>{{ link.description }}</p>
            <a class="style-links">{{ link.link }}</a>
          </div>
        </div>
      </div>
      <div class="row blog" v-if="choise == 'blog'">
        <div v-for="(blog, i) of blog.blog" :key="i">
          <img :src="blog.image" />
          <p>{{ blog.title }}</p>
          <p class="description">{{ blog.description }}</p>
        </div>
      </div>
      <!-- <button class="mobile-see-all-button">
        See all
        <img src="/assets/arrow-right-blue.svg" />
      </button> -->
    </div>
  </div>
</template>

<script>
import articles from "@content/nl/general/knowledge.yaml";
import articlesEn from "@content/en/general/knowledge.yaml";
export default {
  name: "Knowledge",
  data() {
    return {
      articles: {},
      links: {},
      title: "",
      label: "",
      linksTitle: "",
      choise: "articles",
      blog: {},
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
      this.blog = data;
      this.links = data;
      this.title = data.title;
      this.label = data["title-label"];
      this.linksTitle = data["links-title"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
@import "@styles/components/knowledge-center.scss";
@import "@styles/new-mobile-mode.scss";
</style>