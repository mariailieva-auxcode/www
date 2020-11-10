<template>
  <div>
    <div class="font">
      <NewNavigation></NewNavigation>
      <Header :lang="lang"></Header>
      <RenewableEnergy :lang="lang"></RenewableEnergy>
      <Helper :lang="lang"></Helper>
      <Process :lang="lang"></Process>
      <OurStory :lang="lang"></OurStory>
      <Team :lang="lang"></Team>
      <Knowledge :lang="lang"></Knowledge>
      <Partners :lang="lang"></Partners>
      <FAQ :lang="lang"></FAQ>
      <GetStarted
        v-if="env.VUE_APP_SITE_MODE == 'digital'"
        :lang="lang"
      ></GetStarted>
      <Calendly
        class="bottom-calendly"
        :lang="lang"
        v-if="env.VUE_APP_SITE_MODE == 'analogue'"
      ></Calendly>
      <Footer :lang="lang"></Footer>
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
import NewNavigation from "./layout/New-Navigation";
import Header from "./layout/Header";
import RenewableEnergy from "./new-components/RenewableEnergy";
import Helper from "./new-components/Helper";
import Process from "./new-components/Process";
import OurStory from "./new-components/OurStory";
import Team from "./new-components/Team";
import Knowledge from "./new-components/Knowledge";
import Partners from "./new-components/Partners";
import FAQ from "./new-components/FAQ";
import GetStarted from "./new-components/GetStarted";
import Calendly from "./new-components/Calendly";
import Footer from "./layout/New-Footer.vue";
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
    NewNavigation,
    Header,
    RenewableEnergy,
    Helper,
    Process,
    OurStory,
    Team,
    Knowledge,
    Partners,
    FAQ,
    GetStarted,
    Calendly,
    Footer,
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
      env: {},
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    this.init();
    this.env = process.env;
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
@import "../assets/styles/new-mobile-mode.scss";
.font {
  font-family: $font__IBM;
  font-weight: 500;
  overflow-x: hidden;
}
</style>