<template>
  <div>
    <div class="font">
      <HeaderPD :lang="lang"></HeaderPD>
      <News1 :lang="lang"></News1>
      <News :isPreview="true" mode="project developer"></News>
      <Matchmaking :match="match"></Matchmaking>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderPD from "./layout/project-developer/HeaderPD";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Matchmaking from "./sections/Matchmaking.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import matchmaking from "js-yaml-loader!../../content/nl/project-developer/matchmaking.yaml";
import tools from "js-yaml-loader!../../content/nl/project-developer/tools.yaml";
import database from "js-yaml-loader!../../content/nl/project-developer/database.yaml";
import matchmakingEn from "js-yaml-loader!../../content/en/project-developer/matchmaking.yaml";
import toolsEn from "js-yaml-loader!../../content/en/project-developer/tools.yaml";
import databaseEn from "js-yaml-loader!../../content/en/project-developer/database.yaml";

export default {
  components: {
    HeaderPD,
    News1,
    News,
    Matchmaking,
    Database,
    Tools,
  },
  data() {
    return {
      match: {},
      database: {},
      tools: {},
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
      this.database = this.lang === "en" ? databaseEn : database;
      this.tools = this.lang === "en" ? toolsEn : tools;
      this.match = this.lang === "en" ? matchmakingEn : matchmaking;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.font {
  font-family: $font__IBM;
  font-weight: 500;
}
</style>