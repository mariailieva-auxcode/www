<template>
  <div>
    <Header></Header>
    <News></News>
    <Database></Database>
    <Tools></Tools>
    <WhatIsGreen></WhatIsGreen>
  </div>
</template>

<script>
import Header from "./Header.vue";
import News from "./News.vue";
import Database from "./Database.vue";
import Tools from "./Tools.vue";
import WhatIsGreen from "./WhatIsGreen";

export default {
  components: {
    Header,
    News,
    Database,
    Tools,
    WhatIsGreen
  }
};
</script>

<style scoped lang="scss">
</style>