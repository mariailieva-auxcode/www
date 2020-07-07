<template>
  <div>
    <div>
      <Header :lang="lang"></Header>
      <News1></News1>
      <News :isPreview="true"></News>
      <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>
      <WhatIsGreen></WhatIsGreen>
      <!-- <OnsTeam :lang="lang"></OnsTeam> TODO (Milen)-->
      <OnsTeam></OnsTeam>
      <Partners></Partners>
      <OurSurvey></OurSurvey>
    </div>
  </div>
</template>

<script>
import Header from "./layout/Header";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";
import WhatIsGreen from "./sections/WhatIsGreen";
import OnsTeam from "./sections/OnsTeam.vue";
import Partners from "./sections/Partners.vue";
import OurSurvey from "./sections/OurSurvey.vue";

import tools from "js-yaml-loader!../../content-nl/general/tools.yaml";
import database from "js-yaml-loader!../../content-nl/general/database.yaml";
import toolsEn from "js-yaml-loader!../../content-en/general/tools.yaml";
import databaseEn from "js-yaml-loader!../../content-en/general/database.yaml";

export default {
  components: {
    Header,
    News1,
    News,
    Database,
    Tools,
    WhatIsGreen,
    OnsTeam,
    Partners,
    OurSurvey
  },
  data() {
    return {
      database: {},
      tools: {},
      lang: ""
    };
  },
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
      console.log(this.lang);
      this.database = this.lang === "en" ? databaseEn : database;
      this.tools = this.lang === "en" ? toolsEn : tools;
    }
  }
};
</script>

<style scoped lang="scss">
</style>