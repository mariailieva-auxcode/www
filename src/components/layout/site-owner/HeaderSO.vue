<template>
  <!-- <div class="header site-owner" :style="{'background-image': `url(${image})`}"> -->
  <lazy-background :src="image" placeholder="https://placeholder.pics/svg/1300x800" :blur="30">
    <div slot="content" class="header">
      <div class="header-overlay"></div>
      <div class="header-content">
        <p class="news-tag">{{ tag}}</p>
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
        <p class="header-survey">{{textSurvey}}</p>
        <router-link :to="`/${$router.history.current.params.lang}/site-owner/questionnaire`">
          <button class="button-choice">
            <p>{{button}}</p>
          </button>
        </router-link>
      </div>
    </div>
  </lazy-background>
</template>

<script>
import header from "@content/nl/site-owner/header.yaml";
import headerEn from "@content/en/site-owner/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      textSurvey: "",
      linkSurvey: "",
      image: "",
      button: "",
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
      let data = this.lang === "en" ? headerEn : header;
      this.title = data.title;
      this.description = data.description;
      this.textSurvey = data.textSurvey;
      this.linkSurvey = data.linkSurvey;
      this.image = data.image;
      this.button = data.button;
      this.tag = data.tag;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
@import "@styles/components/header.scss";

.header {
  p.news-tag {
    background-color: #55b364;
    font-family: $font__IBM;
    font-weight: 700;
    padding: 5px 33px;
    color: white;
    width: max-content;
    border-radius: 5px;
    font-size: 14px;
    margin: 0 auto 14px;
  }
  .header-content {
    h1 {
      font-weight: 700;
      font-size: 50px;
    }
    h3 {
      font-family: $font__Lato;
      font-weight: 400;
      font-size: 25px;
    }
    p.header-survey {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 0;
      margin-top: 60px;
    }
    .button-choice {
      margin-top: 15px;
      p {
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
}
</style>