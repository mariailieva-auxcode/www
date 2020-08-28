<template>
  <div class="faq">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
import faq from "js-yaml-loader!../../../content/nl/general/faq.yaml";
import faqEn from "js-yaml-loader!../../../content/en/general/faq.yaml";
export default {
  name: "FAQ",
  data() {
    return {
      title: "",
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    },
  },
  methods: {
    init() {
      let data = this.lang === "en" ? faqEn : faq;
      this.title = data.title;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.faq {
  display: flex;
  justify-content: center;
}
</style>