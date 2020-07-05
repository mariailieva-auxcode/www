<template>
  <div>
    <Header></Header>
    <News1></News1>
    <MainNews></MainNews>
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
import News1 from "./News1.vue";
import News from "./News.vue";
import MainNews from "./MainNews.vue";
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
    News1,
    MainNews,
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