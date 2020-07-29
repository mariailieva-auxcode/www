<template>
  <div>
    <div class="font">
      <HeaderSO :lang="lang"></HeaderSO>
      <News1 :lang="lang"></News1>
      <News :isPreview="true" mode="site owner"></News>
      <Matchmaking :match="match"></Matchmaking>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderSO from "./layout/site-owner/HeaderSO";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Matchmaking from "./sections/Matchmaking.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import matchmaking from "js-yaml-loader!../../content/nl/site-owner/matchmaking.yaml";
import tools from "js-yaml-loader!../../content/nl/site-owner/tools.yaml";
import database from "js-yaml-loader!../../content/nl/site-owner/database.yaml";
import matchmakingEn from "js-yaml-loader!../../content/en/site-owner/matchmaking.yaml";
import toolsEn from "js-yaml-loader!../../content/en/site-owner/tools.yaml";
import databaseEn from "js-yaml-loader!../../content/en/site-owner/database.yaml";

export default {
  components: {
    HeaderSO,
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
      this.match = this.lang === "en" ? matchmakingEn : matchmaking;
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