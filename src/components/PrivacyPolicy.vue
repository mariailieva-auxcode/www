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
import gdpr from "raw-loader!../../content/nl/gdpr.md";
import gdprEn from "raw-loader!../../content/en/gdpr.md";
export default {
  name: "PrivacyPolicy",

  data() {
    return {
      html: "",
      lang: ""
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.query.lang;
      let data = this.lang === "en" ? gdprEn : gdpr;
      this.html = marked(data);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
