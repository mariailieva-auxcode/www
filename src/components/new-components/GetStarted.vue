<template>
  <div class="get-started">
    <h1>Unlock the value of your location</h1>
    <router-link :to="`/${$router.history.current.params.lang}/questionnaire`">
      <button class="start-buttons">
        Start now
        <img src="/assets/arrow-right-white.png" />
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "GetStarted",
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.get-started {
  h1 {
    font-size: 40px;
    text-align: center;
  }
}
</style>