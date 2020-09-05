<template>
  <div class="new-navigation">
    <div class="row ml">
      <div class="col-6 logo">
        <router-link :to="`/${$router.history.current.params.lang}`">
          <img :src="logo" />
        </router-link>
      </div>
      <div class="col-6 language">
        <router-link :to="getURL('en')">
          <button>
            <div class="row">
              <p>{{nlLang}}</p>
            </div>
          </button>
        </router-link>
        <router-link :to="getURL('nl')">
          <button>
            <div class="row">
              <p class="en">{{enLang}}</p>
            </div>
          </button>
        </router-link>
      </div>
    </div>
    <div class="scroll-links">
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#header'"
      >{{firstComponent}}</router-link>
      <router-link to="#renewable-energy" v-scroll-to="'#renewable-energy'">{{secondComponent}}</router-link>
      <router-link to="#helper" v-scroll-to="'#helper'">{{thirdComponent}}</router-link>
      <router-link to="#process" v-scroll-to="'#process'">{{fourthComponent}}</router-link>
      <router-link to="#our-story" v-scroll-to="'#our-story'">{{fifthComponent}}</router-link>
      <router-link to="#team" v-scroll-to="'#team'">{{sixthComponent}}</router-link>
      <router-link to="#partners" v-scroll-to="'#partners'">{{seventhComponent}}</router-link>
    </div>
    <div class="ml-responsive">
      <div class="ml-mobile" @click="burgerMenuMLActive =!burgerMenuMLActive">
        <img
          class="flag"
          :src="currentPage.includes('/en') ? '/assets/united-kingdom.svg' : '/assets/netherlands.svg'"
        />
        <img src="/assets/angle-down.svg" />
      </div>
      <div class="burger-menu-ml" :class="{'active': burgerMenuMLActive}">
        <div class="row language-display mobile">
          <router-link :to="getURL('en')">
            <button @click="burgerMenuMLActive= false">
              <p class="nl">NL</p>
            </button>
          </router-link>
          <router-link :to="getURL('nl')">
            <button @click="burgerMenuMLActive= false">
              <p class="en">EN</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "js-yaml-loader!../../../content/nl/general/navigation.yaml";
import navigationEn from "js-yaml-loader!../../../content/en/general/navigation.yaml";
export default {
  name: "NewNavigation",
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  data() {
    return {
      logo: "",
      nlLang: "",
      enLang: "",
      firstComponent: "",
      secondComponent: "",
      thirdComponent: "",
      fourthComponent: "",
      fifthComponent: "",
      sixthComponent: "",
      seventhComponent: "",
      burgerMenuMLActive: false,
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    },
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? navigationEn : navigation;
      this.logo = data.logo;
      this.nlLang = data["nl-lang"];
      this.enLang = data["en-lang"];
      this.firstComponent = data["first-component"];
      this.secondComponent = data["second-component"];
      this.thirdComponent = data["third-component"];
      this.fourthComponent = data["fourth-component"];
      this.fifthComponent = data["fifth-component"];
      this.sixthComponent = data["sixth-component"];
      this.seventhComponent = data["seventh-component"];
    },
    getURL(prevLanguage) {
      return this.currentPage.replace(
        prevLanguage,
        prevLanguage == "nl" ? "en" : "nl"
      );
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/new-mobile-mode.scss";
.new-navigation {
  background: none;
  width: 170px;
  height: 100vh;
  z-index: 2;
  position: absolute;
  .ml {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .language {
      .router-link-exact-active > button > div.row > p {
        opacity: 1;
      }
      button {
        border: none;
        outline: none;
        background: none;
        p {
          margin: 0;
          color: white;
          opacity: 0.6;
          font-weight: 700;
          font-size: 12px;
        }
      }
    }
  }
  .scroll-links {
    margin-top: 75px;
    position: fixed;
    font-weight: 700;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    text-align: left;
    a {
      padding: 10px 0;
      color: white;
      opacity: 0.6;
      font-size: 14px;
      &.router-link-exact-active {
        opacity: 1;
      }
    }
  }
  .ml-responsive {
    display: none;
    .burger-menu-ml {
      height: auto;
      display: none;
      position: fixed;
      right: 20px;
      width: 55px;
      background-color: white;
      &.active {
        display: block;
      }
      @media screen and (min-width: 769px) {
        left: 27px;
        bottom: 10px;
      }
      .language-display {
        width: 120px;
      }
    }
  }
}
</style>