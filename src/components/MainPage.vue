<template>
  <div>
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="content">
      <Header></Header>
      <News1></News1>
      <News :isPreview="true"></News>
      <Database></Database>
      <Tools></Tools>
      <WhatIsGreen></WhatIsGreen>
      <OnsTeam></OnsTeam>
      <Partners></Partners>
      <OurSurvey></OurSurvey>
      <Footer></Footer>
    </div>

    <cookie-law>
      <div slot-scope="props">
        <button class="skew" @click="props.accept">
          <span>I accept</span>
        </button>
        <p>This site uses cookies 🍪</p>
        <button class="skew" @click="props.close">
          <span>Ignore me</span>
        </button>
      </div>
    </cookie-law>
  </div>
</template>

<script>
import Header from "./Header.vue";
import News1 from "./News1.vue";
import News from "./News.vue";
import Database from "./Database.vue";
import Tools from "./Tools.vue";
import WhatIsGreen from "./WhatIsGreen";
import OnsTeam from "./OnsTeam.vue";
import Partners from "./Partners.vue";
import OurSurvey from "./OurSurvey.vue";
import Footer from "./Footer.vue";
import Navigation from "./Navigation.vue"

import CookieLaw from "vue-cookie-law";

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
    OurSurvey,
    Footer,
    CookieLaw,
    Navigation
  }
};
</script>

<style scoped lang="scss">
.content {
  width: calc(100vw - 100px);
  float: right;
}
</style>