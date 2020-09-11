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
    <div class="scroll-links test">
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#header'"
        :class="{'inverted': areInverted[0]}"
      >{{components[0]}}</router-link>
      <router-link
        to="#renewable-energy"
        v-scroll-to="'#renewable-energy'"
        :class="{'inverted': areInverted[1]}"
      >{{components[1]}}</router-link>
      <router-link
        to="#helper"
        v-scroll-to="'#helper'"
        :class="{'inverted': areInverted[2]}"
      >{{components[2]}}</router-link>
      <router-link
        to="#process"
        v-scroll-to="'#process'"
        :class="{'inverted': areInverted[3]}"
      >{{components[3]}}</router-link>
      <router-link
        to="#our-story"
        v-scroll-to="'#our-story'"
        :class="{'inverted': areInverted[4]}"
      >{{components[4]}}</router-link>
      <router-link
        to="#team"
        v-scroll-to="'#team'"
        :class="{'inverted': areInverted[5]}"
      >{{components[5]}}</router-link>
      <router-link
        to="#partners"
        v-scroll-to="'#partners'"
        :class="{'inverted': areInverted[6]}"
      >{{components[6]}}</router-link>
    </div>

    <!-- mobile !-->
    <div class="ml-responsive">
      <button class="show-navigation-button" @click="showNavigation = !showNavigation">
        <div v-if="!showNavigation">
          <img src="/assets/mobile-navigation.svg" />
        </div>
        <div v-if="showNavigation">
          <img src="/assets/close.svg" />
        </div>
      </button>
      <div class="navigation-mobile-mode" :class="{'burger-navigation' : showNavigation == true}">
        <router-link :to="`/${$router.history.current.params.lang}`">
          <img :src="logo" />
        </router-link>
        <div class="login">
          <p>Already having an account?</p>
          <button>Log in</button>
        </div>
        <div class="mobile-navigation">
          <button @click="showNavigation=false">
            <router-link
              :to="`/${$router.history.current.params.lang}`"
              v-scroll-to="'#header'"
              :class="{'inverted': areInverted[0]}"
            >{{components[0]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#renewable-energy"
              v-scroll-to="'#renewable-energy'"
              :class="{'inverted': areInverted[1]}"
            >{{components[1]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#helper"
              v-scroll-to="'#helper'"
              :class="{'inverted': areInverted[2]}"
            >{{components[2]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#process"
              v-scroll-to="'#process'"
              :class="{'inverted': areInverted[3]}"
            >{{components[3]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#our-story"
              v-scroll-to="'#our-story'"
              :class="{'inverted': areInverted[4]}"
            >{{components[4]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#team"
              v-scroll-to="'#team'"
              :class="{'inverted': areInverted[5]}"
            >{{components[5]}}</router-link>
          </button>
          <button @click="showNavigation=false">
            <router-link
              to="#partners"
              v-scroll-to="'#partners'"
              :class="{'inverted': areInverted[6]}"
            >{{components[6]}}</router-link>
          </button>
        </div>
        <div class="ml-mobile">
          <router-link :to="getURL('en')">
            <button @click="showNavigation=false">
              <div class="row">
                <p>{{nlLang}}</p>
              </div>
            </button>
          </router-link>
          <router-link :to="getURL('nl')">
            <button @click="showNavigation=false">
              <div class="row">
                <p class="en">{{enLang}}</p>
              </div>
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
      showNavigation: false,
      components: [],
      areInverted: [false, false, false, false, false, false, false],
      headerImageHeight: undefined,
      headerImageCompare: 479,
      linkPoints: [395, 350, 315, 270, 225, 180, 135], // 479
      // linkPoints: [380, 335, 290, 245, 200, 155, 280] // 648
    };
  },
  created() {
    this.headerImageHeight = window.innerHeight * 0.6;

    this.checkScroll();
    window.onscroll = () => this.checkScroll();
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
      this.components = [
        data["first-component"],
        data["second-component"],
        data["third-component"],
        data["fourth-component"],
        data["fifth-component"],
        data["sixth-component"],
        data["seventh-component"],
      ];
    },
    getURL(prevLanguage) {
      return this.currentPage.replace(
        prevLanguage,
        prevLanguage == "nl" ? "en" : "nl"
      );
    },
    checkScroll() {
      this.linkPoints.forEach((el, i) => {
        el = this.headerImageHeight - this.headerImageCompare + el;
        if (this.getScrollPosition() > el) {
          this.areInverted[i] = true;
        } else {
          this.areInverted[i] = false;
        }
      });

      this.$forceUpdate();
    },
    getScrollPosition() {
      return pageYOffset;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/new-mobile-mode.scss";
@import "../../assets/styles/mobile-modes/components/navigation-mobile.scss";
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
      outline: none;
      font-size: 14px;
      &.router-link-exact-active {
        opacity: 1;
      }
      &.inverted {
        color: black;
      }
    }
  }
}
</style>