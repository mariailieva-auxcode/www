<template>
  <div>
    <Header></Header>
    <News></News>
    <Database></Database>
    <Tools></Tools>
    <WhatIsGreen></WhatIsGreen>
    <OnsTeam></OnsTeam>
    <Partners></Partners>
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

export default {
  components: {
    Header,
    News,
    Database,
    Tools,
    WhatIsGreen,
    OnsTeam,
    Partners
  }
};
</script>

<style scoped lang="scss">
</style>