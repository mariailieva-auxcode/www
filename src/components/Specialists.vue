<template>
  <div>
    <div class="font">
      <HeaderSpecialists :lang="lang"></HeaderSpecialists>
      <News1 :lang="lang"></News1>
      <News :isPreview="true" mode="specialists"></News>
      <Matchmaking :match="match"></Matchmaking>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
    </div>
  </div>
</template>

<script>
import HeaderSpecialists from "./layout/specialists/HeaderSpecialists";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Matchmaking from "./sections/Matchmaking.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";

import matchmaking from "js-yaml-loader!../../content/nl/specialists/matchmaking.yaml";
import tools from "js-yaml-loader!../../content/nl/specialists/tools.yaml";
import database from "js-yaml-loader!../../content/nl/specialists/database.yaml";
import matchmakingEn from "js-yaml-loader!../../content/en/specialists/matchmaking.yaml";
import toolsEn from "js-yaml-loader!../../content/en/specialists/tools.yaml";
import databaseEn from "js-yaml-loader!../../content/en/specialists/database.yaml";

export default {
  components: {
    HeaderSpecialists,
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