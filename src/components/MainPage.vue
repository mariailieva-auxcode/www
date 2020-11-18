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
import NewNavigation from "@components/layout/New-Navigation";
import Header from "@components/layout/Header";
import RenewableEnergy from "@components/new-components/RenewableEnergy";
import Helper from "@components/new-components/Helper";
import Process from "@components/new-components/Process";
import OurStory from "@components/new-components/OurStory";
import Team from "@components/new-components/Team";
import Knowledge from "@components/new-components/Knowledge";
import Partners from "@components/new-components/Partners";
import FAQ from "@components/new-components/FAQ";
import GetStarted from "@components/new-components/GetStarted";
import Calendly from "@components/new-components/Calendly";
import Footer from "@components/layout/New-Footer.vue";
// import News1 from "@components/news/News1";
// import News from "@components/news/News.vue";
// import Matchmaking from "@components/sections/Matchmaking.vue";
// import Database from "@components/sections/Database.vue";
// import Tools from "@components/sections/Tools.vue";
// import WhatIsGreen from "@components/sections/WhatIsGreen";
// import OnsTeam from "@components/sections/OnsTeam.vue";
// import Partners from "@components/sections/Partners.vue";
// import OurSurvey from "@components/sections/OurSurvey.vue";

// import matchmaking from "@content/nl/general/matchmaking.yaml";
// import tools from "@content/nl/general/tools.yaml";
// import database from "@content/nl/general/database.yaml";
// import matchmakingEn from "@content/en/general/matchmaking.yaml";
// import toolsEn from "@content/en/general/tools.yaml";
// import databaseEn from "@content/en/general/database.yaml";

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
@import "@styles/main.scss";
@import "@styles/new-mobile-mode.scss";
.font {
  font-family: $font__IBM;
  font-weight: 500;
  overflow-x: hidden;
}
</style>