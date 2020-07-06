<template>
  <div class="header">
    <div class="header-content">
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
      linkSurvey: ""
    };
  },
  mounted() {
    this.title = header.title;
    this.description = header.description;
    this.textSurvey = header.textSurvey;
    this.linkSurvey = header.linkSurvey;
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/components/header.scss";
</style>