<template>
  <lazy-background :src="image" placeholder="https://placeholder.pics/svg/1300x800" :blur="30">
    <div slot="content" class="header">
      <div class="header-overlay"></div>
      <div class="header-content">
        <p class="news-tag">{{ tag}}</p>
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
        <p>{{textSurvey}}</p>
        <!-- <router-link :to="`/${$router.history.current.params.lang}/specialists/questionnaire`">
        <button>To the survey</button>
        </router-link>-->
      </div>
    </div>
  </lazy-background>
</template>

<script>
import header from "@content/nl/specialists/header.yaml";
import headerEn from "@content/en/specialists/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      textSurvey: "",
      linkSurvey: "",
      image: "",
      tag: "",
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
      let data = this.lang === "en" ? headerEn : header;
      this.title = data.title;
      this.description = data.description;
      this.textSurvey = data.textSurvey;
      this.linkSurvey = data.linkSurvey;
      this.image = data.image;
      this.tag = data.tag;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
@import "@styles/components/header.scss";

.header {
  font-family: $font__IBM;
  font-weight: 700;
  p.news-tag {
    background-color: #1d226f;
    padding: 5px 33px;
    color: white;
    width: max-content;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 auto 20px;
  }
  .header-content {
    h1 {
      font-weight: 700;
    }
    h3 {
      font-family: $font__Lato;
      font-weight: 400;
      font-size: 25px;
    }
  }
}
</style>