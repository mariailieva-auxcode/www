<template>
  <div>
    <div>
      <HeaderSO :lang="lang"></HeaderSO>
      <News1></News1>
      <News :isPreview="true" mode="site owner"></News>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderSO from "./layout/site-owner/HeaderSO";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import tools from "js-yaml-loader!../../content-nl/site-owner/tools.yaml";
import database from "js-yaml-loader!../../content-nl/site-owner/database.yaml";
import toolsEn from "js-yaml-loader!../../content-en/site-owner/tools.yaml";
import databaseEn from "js-yaml-loader!../../content-en/site-owner/database.yaml";

export default {
  components: {
    HeaderSO,
    News1,
    News,
    Database,
    Tools
  },
  data() {
    return {
      database: {},
      tools: {},
      lang: ""
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
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.query.lang;
      this.database = this.lang === "en" ? databaseEn : database;
      this.tools = this.lang === "en" ? toolsEn : tools;
    }
  }
};
</script>

<style scoped lang="scss">
</style>