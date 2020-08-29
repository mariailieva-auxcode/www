<template>
  <div>
    <div class="font">
      <Header :lang="lang"></Header>
      <RenewableEnergy :lang="lang"></RenewableEnergy>
      <Helper :lang="lang"></Helper>
      <Process :lang="lang"></Process>
      <OurStory :lang="lang"></OurStory>
      <Team :lang="lang"></Team>
      <Resources :lang="lang"></Resources>
      <Partners :lang="lang"></Partners>
      <FAQ :lang="lang"></FAQ>
      <GetStarted :lang="lang"></GetStarted>
      <!-- <News1 :lang="lang"></News1>
      <News :lang="lang" :isPreview="true"></News>-->
      <!-- <Matchmaking :match="match"></Matchmaking> -->
      <!-- <Database :database="database"></Database>
      <Tools :tools="tools"></Tools>-->
      <!-- <WhatIsGreen :lang="lang"></WhatIsGreen> -->
      <!-- <OnsTeam :lang="lang"></OnsTeam>
      <Partners :lang="lang"></Partners>
      <OurSurvey :lang="lang"></OurSurvey>-->
    </div>
  </div>
</template>

<script>
import Header from "./layout/Header";
import RenewableEnergy from "./new-components/RenewableEnergy";
import Helper from "./new-components/Helper";
import Process from "./new-components/Process";
import OurStory from "./new-components/OurStory";
import Team from "./new-components/Team";
import Resources from "./new-components/Resources";
import Partners from "./new-components/Partners";
import FAQ from "./new-components/FAQ";
import GetStarted from "./new-components/GetStarted";
// import News1 from "./news/News1";
// import News from "./news/News.vue";
// import Matchmaking from "./sections/Matchmaking.vue";
// import Database from "./sections/Database.vue";
// import Tools from "./sections/Tools.vue";
// import WhatIsGreen from "./sections/WhatIsGreen";
// import OnsTeam from "./sections/OnsTeam.vue";
// import Partners from "./sections/Partners.vue";
// import OurSurvey from "./sections/OurSurvey.vue";

// import matchmaking from "js-yaml-loader!../../content/nl/general/matchmaking.yaml";
// import tools from "js-yaml-loader!../../content/nl/general/tools.yaml";
// import database from "js-yaml-loader!../../content/nl/general/database.yaml";
// import matchmakingEn from "js-yaml-loader!../../content/en/general/matchmaking.yaml";
// import toolsEn from "js-yaml-loader!../../content/en/general/tools.yaml";
// import databaseEn from "js-yaml-loader!../../content/en/general/database.yaml";

export default {
  components: {
    Header,
    RenewableEnergy,
    Helper,
    Process,
    OurStory,
    Team,
    Resources,
    Partners,
    FAQ,
    GetStarted,
    // News1,
    // News,
    // Matchmaking,
    // Database,
    // Tools,
    // WhatIsGreen,
    // OnsTeam,
    // Partners,
    // OurSurvey,
  },
  data() {
    return {
      // match: {},
      // database: {},
      // tools: {},
      lang: "",
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
      // this.database = this.lang === "en" ? databaseEn : database;
      // this.tools = this.lang === "en" ? toolsEn : tools;
      // this.match = this.lang === "en" ? matchmakingEn : matchmaking;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.font {
  font-family: $font__IBM;
  font-weight: 500;
  overflow-x: hidden;
}
</style>