<template>
  <div class="new-navigation">
    <div class="row ml">
      <div class="col-6 logo">
        <img :src="logo" />
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
}
</style>