<template>
  <div>
    <div class="font">
      <HeaderSpecialists :lang="lang"></HeaderSpecialists>
      <News1 :lang="lang"></News1>
      <News :isPreview="true" mode="specialists"></News>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderSpecialists from "./layout/specialists/HeaderSpecialists";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import tools from "js-yaml-loader!../../content/nl/specialists/tools.yaml";
import database from "js-yaml-loader!../../content/nl/specialists/database.yaml";
import toolsEn from "js-yaml-loader!../../content/en/specialists/tools.yaml";
import databaseEn from "js-yaml-loader!../../content/en/specialists/database.yaml";

export default {
  components: {
    HeaderSpecialists,
    News1,
    News,
    Database,
    Tools,
  },
  data() {
    return {
      database: {},
      tools: {},
      lang: "",
    };
  },
  // mounted() {
  //   this.database = database;
  //   this.tools = tools;
  //   this.databaseEn = databaseEn;
  //   this.toolsEn = toolsEn;
  // },
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
      this.database = this.lang === "en" ? databaseEn : database;
      this.tools = this.lang === "en" ? toolsEn : tools;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.font {
  font-family: $font__IBM;
  font-weight: 700;
}
</style>