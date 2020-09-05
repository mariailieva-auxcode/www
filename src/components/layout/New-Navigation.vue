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
    <div class="scroll-links test">
      <router-link :to="`/${lang}`" v-scroll-to="'#header'" id="header" :class="{'inverted': areInverted[0]}">{{components[0]}}</router-link>
      <router-link
        to="#renewable-energy"
        v-scroll-to="'#renewable-energy'"
        id="renewable-energy"
        :class="{'inverted': areInverted[1]}"
      >{{components[1]}}</router-link>
      <router-link to="#helper" v-scroll-to="'#helper'" id="helper" :class="{'inverted': areInverted[2]}">{{components[2]}}</router-link>
      <router-link to="#process" v-scroll-to="'#process'" id="process" :class="{'inverted': areInverted[3]}">{{components[3]}}</router-link>
      <router-link to="#our-story" v-scroll-to="'#our-story'" id="our-story" :class="{'inverted': areInverted[4]}">{{components[4]}}</router-link>
      <router-link to="#team" v-scroll-to="'#team'" id="team" :class="{'inverted': areInverted[5]}">{{components[5]}}</router-link>
      <router-link to="#partners" v-scroll-to="'#partners'" id="partners" :class="{'inverted': areInverted[6]}">{{components[6]}}</router-link>
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
      components: [],
      areInverted: [false, false, false, false, false, false, false],
      headerImageHeight: undefined,
      headerImageCompare: 479,
      linkPoints: [380, 335, 290, 245, 200, 155, 110] // 479
      // linkPoints: [380, 335, 290, 245, 200, 155, 280] // 648
    };
  },
  props: {
    lang: String,
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
        data["seventh-component"]
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
        el = (this.headerImageHeight - this.headerImageCompare) + el;
        if(this.getScrollPosition() > el) {
          this.areInverted[i] = true;
        } else {
          this.areInverted[i] = false
        }
      })

      this.$forceUpdate()
    },
    getScrollPosition() {
      return pageYOffset;
    }
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
        }
      }
    }
  }
  .scroll-links {
    position: fixed;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    text-align: left;
    a {
      padding: 10px 0;
      color: white;
      opacity: 0.6;
      outline: none;
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