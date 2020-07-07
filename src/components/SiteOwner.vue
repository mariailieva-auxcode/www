<template>
  <div>
    <div>
      <HeaderSO></HeaderSO>
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
      databaseEn: {},
      toolsEn: {}
    };
  },
  mounted() {
    this.database = database;
    this.tools = tools;
    this.databaseEn = databaseEn;
    this.toolsEn = toolsEn;
  }
};
</script>

<style scoped lang="scss">
</style>