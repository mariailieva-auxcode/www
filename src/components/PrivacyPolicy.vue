<template>
  <div class="container privacy-policy">
    <div class="row">
      <div class="col-12">
        <div class="design" v-html="html"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import gdpr from "@content/nl/gdpr.md";
import gdprEn from "@content/en/gdpr.md";
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
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? gdprEn : gdpr;
      this.html = marked(data);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@styles/main.scss";
.container {
  text-align: left;
  margin-top: 90px;
}
</style>
