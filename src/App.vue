<template>
  <div id="app">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="content">
      <router-view></router-view>
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
import Navigation from "./components/layout/Navigation.vue"
import Footer from "./components/layout/Footer.vue";
import CookieLaw from "vue-cookie-law";


export default {
  name: "App",
  components: {
    Navigation, Footer, CookieLaw
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


.content {
  width: calc(100vw - 100px);
  float: right;
}
</style>
