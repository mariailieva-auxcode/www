<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import gdpr from "raw-loader!../../content/gdpr.md";
export default {
  name: "PrivacyPolicy",

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
</style>
