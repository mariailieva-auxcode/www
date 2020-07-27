<template>
  <div id="app">
    <div class="navigation">
      <Navigation></Navigation>
    </div>
    <div class="content">
      <!-- TODO(Milen) check how router props work -->
      <router-view></router-view>
      <Footer></Footer>
    </div>

    <!-- TODO (Milen) create cookie.yaml for the texts -->
    <cookie-law class="cookie">
      <div slot-scope="props">
        <div class="row">
          <img src="/assets/cookie.png" />
          <p>
            This site uses
            <span class="undeline">cookies</span>
          </p>
        </div>
        <div class="row">
          <button class="skew" @click="props.accept">
            <span>OK</span>
          </button>
        </div>

        <!-- <button class="skew" @click="props.close">
          <span>Ignore me</span>
        </button>-->
      </div>
    </cookie-law>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";
import Footer from "./components/layout/Footer.vue";
import CookieLaw from "vue-cookie-law";

export default {
  name: "App",
  components: {
    Navigation,
    Footer,
    CookieLaw
  },
  mounted() {
    if (!this.$router.history.current.params.lang) {
      this.$router.push("nl");
    }
  }
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
@import "./assets/styles/mobile-mode.scss";
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
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

@media only screen and (max-width: 1366px) {
  .content {
    width: calc(100vw - 100px);
  }
}

.Cookie--bottom {
  left: 100px !important;
  opacity: 0.9;
}

.Cookie--base {
  background-color: white;
}

.cookie {
  width: 340px !important;
  height: 171px;
  justify-content: center;
  left: 90px;
  img {
    margin-right: 20px;
  }
  p {
    font-size: 14px;
    color: #26272e;
    font-family: "Rubik", sans-serif;
    margin-top: 20px;
    span {
      text-decoration: underline;
    }
  }
  button {
    margin-left: auto;
    margin-right: auto;
    background-color: #ffc800;
    border-radius: 10px;
    border: none;
    padding: 13px 70px;
    margin-top: 20px;
    span {
      font-family: "Rubik", sans-serif;
      font-size: 14px;
    }
  }
}
</style>
