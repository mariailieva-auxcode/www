<template>
  <div class="footer">
    <router-link to="/">Go to News</router-link>
    <div v-html="html"></div>
    <router-link to="/">Go to News</router-link>
  </div>
</template>

<script>
import marked from "marked";
import gdpr from "raw-loader!../../content/gdpr.md";
export default {
  name: "Footer",

  data() {
    return {
      html: ""
    };
  },
  mounted() {
    this.html = marked(gdpr);
  }
};
</script>

<style lang="scss" scoped>
.footer {
  max-width: 1000px;
  margin-right: auto;
  margin-left: 200px;
  margin-bottom: 100px;
  text-align: left;
}
</style>
