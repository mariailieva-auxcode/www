<template>
  <div>
    <div>
      <HeaderSO></HeaderSO>
      <News1></News1>
      <News :isPreview="true" mode="SITE OWNER"></News>
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

import tools from "js-yaml-loader!../../content/site-owner/tools.yaml";
import database from "js-yaml-loader!../../content/site-owner/database.yaml";

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
      tools: {}
    };
  },
  mounted() {
    this.database = database;
    this.tools = tools;
  }
};
</script>

<style scoped lang="scss">
</style>