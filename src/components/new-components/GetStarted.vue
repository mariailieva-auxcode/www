<template>
  <div class="get-started">
    <h1>{{title}}</h1>
    <router-link :to="`/${$router.history.current.params.lang}/questionnaire`">
      <button class="start-buttons">
        {{button}}
        <img src="/assets/arrow-right-white.png" />
      </button>
    </router-link>
  </div>
</template>

<script>
import getStarted from "@content/nl/general/get-started.yaml";
import getStartedEn from "@content/en/general/get-started.yaml";
export default {
  name: "GetStarted",
  data() {
    return {
      title: "",
      button: "",
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
      let data = this.lang === "en" ? getStartedEn : getStarted;
      this.title = data.title;
      this.button = data.button;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
.get-started {
  margin-bottom: 150px;
  h1 {
    font-size: 40px;
    text-align: center;
    margin-bottom: 60px;
  }
}
</style>