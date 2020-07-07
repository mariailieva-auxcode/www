<template>
  <div class="header" :style="{'background-image': `url(${image})`}">
    <div class="header-overlay"></div>
    <div class="header-content">
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
      <router-link to="/site-owner">
        <button class="button-choice">
          <p>{{button1}}</p>
        </button>
      </router-link>
      <router-link to="/project-developer">
        <button class="button-choice">
          <p>{{button2}}</p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../content/general/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      button1: "",
      button2: "",
      image: ""
    };
  },
  mounted() {
    this.title = header.title;
    this.description = header.description;
    this.button1 = header.button1;
    this.button2 = header.button2;
    this.image = header.image;
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/components/header.scss";

.header {
  height: 100vh
}
</style>