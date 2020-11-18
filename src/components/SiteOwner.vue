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
import HeaderSO from "@components/layout/site-owner/HeaderSO";
import News1 from "@components/news/News1";
import News from "@components/news/News.vue";
import Matchmaking from "@components/sections/Matchmaking.vue";
import Database from "@components/sections/Database.vue";
import Tools from "@components/sections/Tools.vue";

import matchmaking from "@content/nl/site-owner/matchmaking.yaml";
import tools from "@content/nl/site-owner/tools.yaml";
import database from "@content/nl/site-owner/database.yaml";
import matchmakingEn from "@content/en/site-owner/matchmaking.yaml";
import toolsEn from "@content/en/site-owner/tools.yaml";
import databaseEn from "@content/en/site-owner/database.yaml";

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
@import "@styles/main.scss";
.font {
  font-family: $font__IBM;
  font-weight: 500;
}
</style>