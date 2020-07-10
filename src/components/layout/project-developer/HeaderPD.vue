<template>
  <div class="header" :style="{'background-image': `url(${image})`}">
    <div class="header-overlay"></div>
    <div class="header-content">
      <p class="news-tag">{{ tag}}</p>
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
      <p>{{textSurvey}}</p>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../../content/nl/project-developer/header.yaml";
import headerEn from "js-yaml-loader!../../../../content/en/project-developer/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      textSurvey: "",
      linkSurvey: "",
      image: "",
      tag: ""
    };
  },
  props: {
    lang: String
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    }
  },
  methods: {
    init() {
      let data = this.lang === "en" ? headerEn : header;
      this.title = data.title;
      this.description = data.description;
      this.textSurvey = data.textSurvey;
      this.linkSurvey = data.linkSurvey;
      this.image = data.image;
      this.tag = data.tag;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/components/header.scss";

.header p.news-tag {
  background-color: #2783ff;
  font-family: $font__IBM;
  font-weight: 700;
  padding: 5px 33px;
  color: white;
  width: max-content;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  margin: 0 auto 20px;
}
</style>