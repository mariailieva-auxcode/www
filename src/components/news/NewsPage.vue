<template>
  <div>
    <HeaderNews :lang="lang"></HeaderNews>
    <News :lang="lang"></News>
  </div>
</template>

<script>
import HeaderNews from "@components/layout/news/HeaderNews";
import News from "@components/news/News";
export default {
  name: "News Page",
  components: {
    HeaderNews,
    News,
  },
  data() {
    return {
      lang: "",
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
    },
  },
};
</script>