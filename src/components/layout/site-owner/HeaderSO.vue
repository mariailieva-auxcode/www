<template>
  <div class="header" :style="{'background-image': `url(${image})`}">
    <div class="header-overlay"></div>
    <div class="header-content">
      <p class="news-tag">{{ tag}}</p>
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
      <p>{{textSurvey}}</p>
      <a :href="linkSurvey" target="_blank">
        <button class="button-choice">
          <p>{{button}}</p>
        </button>
      </a>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../../content/site-owner/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      textSurvey: "",
      linkSurvey: "",
      image: "",
      button: "",
      tag: ""
    };
  },
  mounted() {
    this.title = header.title;
    this.description = header.description;
    this.textSurvey = header.textSurvey;
    this.linkSurvey = header.linkSurvey;
    this.image = header.image;
    this.button = header.button;
    this.tag = header.tag;
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/components/header.scss";

.header p.news-tag {
    background-color: #55b364;
    font-family: 'IBM Plex Sans Bold', sans-serif;
    padding: 5px 33px;
    color: white;
    width: max-content;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    margin: 0 auto 14px;
}
</style>