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
import Header from "./layout/Header";
import News1 from "./news/News1";
import News from "./news/News.vue";
import Database from "./sections/Database.vue";
import Tools from "./sections/Tools.vue";
import WhatIsGreen from "./sections/WhatIsGreen";
import OnsTeam from "./sections/OnsTeam.vue";
import Partners from "./sections/Partners.vue";
import OurSurvey from "./sections/OurSurvey.vue";
import Footer from "./layout/Footer.vue";
import Navigation from "./layout/Navigation.vue"

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