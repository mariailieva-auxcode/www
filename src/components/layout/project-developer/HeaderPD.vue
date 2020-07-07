<template>
  <div class="header" :style="{'background-image': `url(${image})`}">
    <div class="header-content">
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
      <p>{{textSurvey}}</p>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../../content/project-developer/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      textSurvey: "",
      linkSurvey: "",
      image: ""
    };
  },
  mounted() {
    this.title = header.title;
    this.description = header.description;
    this.textSurvey = header.textSurvey;
    this.linkSurvey = header.linkSurvey;
    this.image = header.image;
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/components/header.scss";
</style>