<template>
  <div id="app">
    <div class="navigation">
      <NewNavigation></NewNavigation>
      <!-- <Navigation></Navigation> -->
    </div>
    <div class="content">
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
// import Navigation from "./components/layout/Navigation.vue";
import NewNavigation from "./components/layout/New-Navigation";
import Footer from "./components/layout/New-Footer.vue";
import CookieLaw from "vue-cookie-law";

export default {
  name: "App",
  components: {
    // Navigation,
    NewNavigation,
    Footer,
    CookieLaw,
  },
  mounted() {
    if (!this.$router.history.current.params.lang) {
      this.$router.push("nl");
    }
  },
};
</script>

<style lang="scss">
@import "./assets/styles/main.scss";
@import "./assets/styles/mobile-mode.scss";
@import "./assets/styles/lazy-images.scss";
@import "./assets/styles/new-mobile-mode.scss";
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fafbff;
  font-family: $font__IBM;
}

body.no-scroll {
  overflow: hidden;
}
body {
  overflow-y: overlay;
  overflow-x: hidden;
  .background-slot {
    .lazy-background-slot {
      z-index: 2;
    }
  }
  .unclicked-login-button {
    z-index: -1 !important;
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
  justify-content: center !important;
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
