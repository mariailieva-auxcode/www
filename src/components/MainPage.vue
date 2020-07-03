<template>
  <div>
    <Header></Header>
    <News></News>
    <Database></Database>
    <Tools></Tools>
  </div>
</template>

<script>
import Header from "./Header.vue";
import News from "./News.vue";
import Database from "./Database.vue";
import Tools from "./Tools.vue";

export default {
  components: {
    Header,
    News,
    Database,
    Tools
  }
};
</script>

<style scoped lang="scss">
</style>