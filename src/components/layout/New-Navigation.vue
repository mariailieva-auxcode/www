<template>
  <div class="new-navigation" :class="{ 'not-inverted': notInverted }">
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
              <p>{{ nlLang }}</p>
            </div>
          </button>
        </router-link>
        <router-link :to="getURL('nl')">
          <button>
            <div class="row">
              <p class="en">{{ enLang }}</p>
            </div>
          </button>
        </router-link>
      </div>
    </div>
    <div class="scroll-links test">
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#header'"
        :class="{
          inverted: areInverted[0],
          'router-link-exact-active active': activatedLink == 0,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[0] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#renewable-energy'"
        :class="{
          inverted: areInverted[1],
          'router-link-exact-active active': activatedLink == 1,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[1] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#helper'"
        :class="{
          inverted: areInverted[2],
          'router-link-exact-active active': activatedLink == 2,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[2] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#process'"
        :class="{
          inverted: areInverted[3],
          'router-link-exact-active active': activatedLink == 3,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[3] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#our-story'"
        :class="{
          inverted: areInverted[4],
          'router-link-exact-active active': activatedLink == 4,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[4] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#team'"
        :class="{
          inverted: areInverted[5],
          'router-link-exact-active active': activatedLink == 5,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[5] }}
      </router-link>
      <router-link
        :to="`/${$router.history.current.params.lang}`"
        v-scroll-to="'#FAQ'"
        :class="{
          inverted: areInverted[6],
          'router-link-exact-active active': activatedLink == 6,
        }"
      >
        <div class="active-green-line"></div>
        {{ components[6] }}
      </router-link>
    </div>

    <!-- mobile !-->
    <div class="ml-responsive">
      <button
        class="show-navigation-button"
        @click="showNavigation = !showNavigation"
      >
        <div v-if="!showNavigation">
          <img src="/assets/mobile-navigation.svg" />
        </div>
        <div v-if="showNavigation">
          <img src="/assets/close.svg" />
        </div>
      </button>
      <div
        class="navigation-mobile-mode"
        :class="{ 'burger-navigation': showNavigation == true }"
      >
        <router-link :to="`/${$router.history.current.params.lang}`">
          <img :src="logo" />
        </router-link>
        <div v-if="env.VUE_APP_SITE_MODE == 'digital'" class="login">
          <p>Already having an account?</p>
          <button>Log in</button>
        </div>
        <div class="mobile-navigation">
          <button @click="showNavigation = false">
            <router-link
              :to="`/${$router.history.current.params.lang}`"
              v-scroll-to="'#header'"
              :class="{ inverted: areInverted[0] }"
            >
              <div class="active-green-line"></div>
              {{ components[0] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#renewable-energy"
              v-scroll-to="'#renewable-energy'"
              :class="{ inverted: areInverted[1] }"
            >
              <div class="active-green-line"></div>
              {{ components[1] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#helper"
              v-scroll-to="'#helper'"
              :class="{ inverted: areInverted[2] }"
            >
              <div class="active-green-line"></div>
              {{ components[2] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#process"
              v-scroll-to="'#process'"
              :class="{ inverted: areInverted[3] }"
            >
              <div class="active-green-line"></div>
              {{ components[3] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#our-story"
              v-scroll-to="'#our-story'"
              :class="{ inverted: areInverted[4] }"
            >
              <div class="active-green-line"></div>
              {{ components[4] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#team"
              v-scroll-to="'#team'"
              :class="{ inverted: areInverted[5] }"
            >
              <div class="active-green-line"></div>
              {{ components[5] }}
            </router-link>
          </button>
          <button @click="showNavigation = false">
            <router-link
              to="#FAQ"
              v-scroll-to="'#FAQ'"
              :class="{ inverted: areInverted[6] }"
            >
              <div class="active-green-line"></div>
              {{ components[6] }}
            </router-link>
          </button>
        </div>
        <div class="ml-mobile">
          <router-link :to="getURL('en')">
            <button @click="showNavigation = false">
              <div class="active-green-line"></div>
              <div class="row">
                <p>{{ nlLang }}</p>
              </div>
            </button>
          </router-link>
          <router-link :to="getURL('nl')">
            <button @click="showNavigation = false">
              <div class="active-green-line"></div>
              <div class="row">
                <p class="en">{{ enLang }}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@content/nl/general/navigation.yaml";
import navigationEn from "@content/en/general/navigation.yaml";
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
      linkPoints: [580, 540, 500, 460, 420, 380, 340], // 479
      // linkPoints: [380, 335, 290, 245, 200, 155, 280] // 648
      linkPoints2: [730, 690, 650, 610, 570, 530, 490],
      linkPoints3: [660, 620, 580, 540, 500, 460, 420],
      activatedLink: 0,
      sectionElements: [],
      env: {},
      fullHDHeight: Number(1080),
      HdHeight: Number(900),
    };
  },
  props: {
    notInverted: { type: Boolean, default: false },
  },
  created() {
    this.headerImageHeight = window.innerHeight * 0.6;

    this.checkScroll();
    window.onscroll = () => this.checkScroll();
  },
  mounted() {
    this.init();
    this.env = process.env;
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
    selectorElements() {
      this.sectionElements = [
        document.querySelector("div#header"),
        document.querySelector("div#renewable-energy"),
        document.querySelector("div#helper"),
        document.querySelector("div#process"),
        document.querySelector("div#our-story"),
        document.querySelector("div#team"),
        document.querySelector("div#FAQ"),
      ];
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

      let fullHdResolution = window.innerHeight;
      if (fullHdResolution === this.fullHDHeight) {
        this.linkPoints2.forEach((el, i) => {
          el = this.headerImageHeight - this.headerImageCompare + el;
          if (this.getScrollPosition() > el) {
            this.areInverted[i] = true;
          } else {
            this.areInverted[i] = false;
          }
        });
      }

      let HdResolution = window.innerHeight;
      if (HdResolution === this.HdHeight) {
        this.linkPoints3.forEach((el, i) => {
          el = this.headerImageHeight - this.headerImageCompare + el;
          if (this.getScrollPosition() > el) {
            this.areInverted[i] = true;
          } else {
            this.areInverted[i] = false;
          }
        });
      }

      if (this.sectionElements.length == 0 || !this.sectionElements[0])
        this.selectorElements();

      this.sectionElements.forEach((element, i) => {
        if (element?.offsetTop - 110 <= this.getScrollPosition()) {
          this.activatedLink = i;
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
@import "@styles/new-mobile-mode.scss";
@import "@styles/mobile-modes/components/navigation-mobile.scss";
.new-navigation {
  background: none;
  width: 170px;
  height: 100vh;
  z-index: 2;
  position: absolute;
  &.not-inverted {
    .scroll-links {
      a {
        color: #65687e;
      }
    }

    div.language {
      button {
        p {
          color: #65687e;
          opacity: 1;
        }
      }
    }
  }
  .ml {
    display: flex;
    align-items: center;
    margin-top: 20px;
    .logo {
      a {
        opacity: 1;
      }
    }
    .language {
      opacity: 1;
      a {
        opacity: 0.6;
        &.router-link-active {
          opacity: 1;
        }
      }
      button {
        border: none;
        outline: none;
        background: none;
        p {
          margin: 0;
          color: white;
          opacity: 1;
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
    margin-left: 55px;
    display: flex;
    flex-direction: column;
    text-align: left;
    a {
      padding: 10px 0;
      position: relative;
      color: white;
      opacity: 0.6;
      outline: none;
      font-size: 14px;
      &.router-link-exact-active.active {
        opacity: 1;
        .active-green-line {
          display: block;
        }
      }
      .active-green-line {
        display: none;
      }
      &.inverted {
        color: #65687e;
        .active-green-line {
          display: none;
        }
      }
    }
    &.router-link-exact-active.router-link-active.inverted {
      opacity: 0.6 !important;
    }
  }
}
</style>