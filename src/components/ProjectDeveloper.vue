<template>
  <div>
    <div>
      <HeaderPD></HeaderPD>
      <News1></News1>
      <News :isPreview="true" mode="PROJECT DEVELOPER"></News>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderPD from "./layout/project-developer/HeaderPD";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import tools from "js-yaml-loader!../../content/project-developer/tools.yaml";
import database from "js-yaml-loader!../../content/project-developer/database.yaml";

export default {
  components: {
    HeaderPD,
    News1,
    News,
    Database,
    Tools
  },
  data() {
    return {
      database: {},
      tools: {}
    }
  },
  mounted() {
    this.database = database;
    this.tools = tools;
  }
};
</script>

<style scoped lang="scss">
</style>