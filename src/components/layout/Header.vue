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
import header from "js-yaml-loader!../../../content-nl/general/header.yaml";
import headerEn from "js-yaml-loader!../../../content-en/general/header.yaml";
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
      this.button1 = data.button1;
      this.button2 = data.button2;
      this.image = data.image;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/components/header.scss";

.header {
  height: 100vh;
}
</style>