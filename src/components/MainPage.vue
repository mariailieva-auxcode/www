<template>
  <div>
    <Header></Header>
    <News></News>
    <Database></Database>
    <Tools></Tools>
    <WhatIsGreen></WhatIsGreen>
    <OnsTeam></OnsTeam>
    <Partners></Partners>
    <OurSurvey></OurSurvey>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./Header.vue";
import News from "./News.vue";
import Database from "./Database.vue";
import Tools from "./Tools.vue";
import WhatIsGreen from "./WhatIsGreen";
import OnsTeam from "./OnsTeam.vue";
import Partners from "./Partners.vue";
import OurSurvey from "./OurSurvey.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    News,
    Database,
    Tools,
    WhatIsGreen,
    OnsTeam,
    Partners,
    OurSurvey,
    Footer
  }
};
</script>

<style scoped lang="scss">
</style>