<template>
  <div class="menu">
    <div class="col-12 logo">
      <img
        class="mobile"
        src="/assets/mobile-navigation.svg"
        @click="burgerMenuActive = !burgerMenuActive"
      />
      <img src="/assets/logo.svg" />
    </div>
    <div class="burger-menu" :class="{'active': burgerMenuActive}">
      <div class="row">
        <div class="col-12 home-logo">
          <router-link :to="`/${$router.history.current.params.lang}`">
            <div v-if="currentPage === '/nl' || currentPage === '/en'" class="green-line"></div>
            <button @click="burgerMenuActive=false">
              <div class="row">
                <svg-icon
                  icon="/assets/home-alt.svg"
                  :class="currentPage === '/nl' || currentPage === '/en' ? 'custom' : ''"
                />
                <p class="home">{{homeName}}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 news-logo">
          <router-link :to="`/${$router.history.current.params.lang}/news`">
            <div v-if="currentPage === '/nl/news' || currentPage === '/en/news'" class="green-line"></div>
            <button @click="burgerMenuActive=false">
              <div class="row">
                <svg-icon
                  icon="/assets/newspaper-alt.svg"
                  :class="currentPage === '/nl/news' || currentPage === '/en/news' ? 'custom' : ''"
                />
                <p class="news">{{newsName}}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 owner-logo mobile">
          <router-link :to="`/${$router.history.current.params.lang}/site-owner`">
            <div
              v-if="currentPage === '/nl/site-owner' || currentPage === '/en/site-owner'"
              class="green-line"
            ></div>

            <button @click="burgerMenuActive=false">
              <div class="row">
                <svg-icon
                  icon="/assets/siteowner-navigation-icon.svg"
                  :class="currentPage === '/nl/site-owner' || currentPage === '/en/site-owner' ? 'custom' : ''"
                />
                <p class="owner">{{siteownerName}}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 specialist-logo mobile">
          <router-link :to="`/${$router.history.current.params.lang}/specialists`">
            <div
              v-if="currentPage === '/nl/specialists' || currentPage === '/en/specialists'"
              class="green-line"
            ></div>
            <button @click="burgerMenuActive=false">
              <div class="row">
                <svg-icon
                  icon="/assets/specialist-navigation-icon.svg"
                  :class="currentPage === '/nl/specialists' || currentPage === '/en/specialists' ? 'custom' : ''"
                />
                <p class="specialist">{{specialistName}}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 project-logo mobile">
          <router-link :to="`/${$router.history.current.params.lang}/project-developer`">
            <div
              v-if="currentPage === '/nl/project-developer' || currentPage === '/en/project-developer'"
              class="green-line"
            ></div>
            <button @click="burgerMenuActive=false">
              <div class="row">
                <svg-icon
                  icon="/assets/project-navigation-icon.svg"
                  :class="currentPage === '/nl/project-developer' || currentPage === '/en/project-developer' ? 'custom' : ''"
                />
                <p class="project">{{projectName}}</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row nav-buttons">
      <div class="row">
        <div class="col-12 home-logo">
          <router-link :to="`/${$router.history.current.params.lang}`">
            <div v-if="currentPage === '/nl' || currentPage === '/en' " class="green-line"></div>
            <button>
              <svg-icon
                class="home-news-sizes"
                icon="/assets/home-alt.svg"
                :class="currentPage === '/nl' || currentPage === '/en' ? 'custom' : ''"
              />
              <p class="home">{{homeName}}</p>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 news-logo">
          <router-link :to="`/${$router.history.current.params.lang}/news`">
            <div v-if="currentPage === '/nl/news' || currentPage === '/en/news'" class="green-line"></div>
            <button>
              <svg-icon
                class="home-news-sizes"
                icon="/assets/newspaper-alt.svg"
                :class="currentPage === '/nl/news' || currentPage === '/en/news' ? 'custom' : ''"
              />
              <p class="news">{{newsName}}</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 owner-logo">
        <router-link :to="`/${$router.history.current.params.lang}/site-owner`">
          <div
            v-if="currentPage === '/nl/site-owner' || currentPage === '/en/site-owner'"
            class="green-line"
          ></div>
          <button>
            <svg-icon
              class="navigation-svg-button"
              icon="/assets/siteowner-navigation-icon.svg"
              :class="currentPage === '/nl/site-owner' || currentPage === '/en/site-owner' ? 'custom' : ''"
            />
            <p class="owner">{{siteownerName}}</p>
          </button>
        </router-link>
      </div>
    </div>
    <!-- <svg-icon
      class="custom"
      icon="/assets/siteowner-navigation-icon.svg"
      @click="activeSvg = true"
      :class="{'color' :activeSvg}"
    ></svg-icon>-->
    <div class="row">
      <div class="col-12 specialist-logo">
        <router-link :to="`/${$router.history.current.params.lang}/specialists`">
          <div
            v-if="currentPage === '/nl/specialists' || currentPage === '/en/specialists'"
            class="green-line"
          ></div>
          <button>
            <svg-icon
              class="navigation-svg-button"
              icon="/assets/specialist-navigation-icon.svg"
              :class="currentPage === '/nl/specialists' || currentPage === '/en/specialists' ? 'custom' : ''"
            />
            <p class="specialist">{{specialistName}}</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 project-logo">
        <router-link :to="`/${$router.history.current.params.lang}/project-developer`">
          <div
            v-if="currentPage === '/nl/project-developer' || currentPage === '/en/project-developer'"
            class="green-line"
          ></div>
          <button>
            <svg-icon
              class="navigation-svg-button"
              icon="/assets/project-navigation-icon.svg"
              :class="currentPage === '/nl/project-developer' || currentPage === '/en/project-developer' ? 'custom' : ''"
            />
            <p class="project">{{projectName}}</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="ml">
      <div class="row language-display">
        <router-link :to="getURL('en')">
          <button>
            <div class="row">
              <div id="underline">
                <p>NL</p>
              </div>
            </div>
          </button>
        </router-link>
        <router-link :to="getURL('nl')">
          <button>
            <div class="row">
              <div id="underline">
                <p class="en">EN</p>
              </div>
            </div>
          </button>
        </router-link>
      </div>
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
              <div class="row">
                <img src="/assets/netherlands.svg" />
                <p class="nl">NL</p>
              </div>
            </button>
          </router-link>
          <router-link :to="getURL('nl')">
            <button @click="burgerMenuMLActive= false">
              <div class="row">
                <img src="/assets/united-kingdom.svg" />
                <p class="en">EN</p>
              </div>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "js-yaml-loader!../../../content/nl/navigation.yaml";
import navigationEn from "js-yaml-loader!../../../content/en/navigation.yaml";
import SvgIcon from "../builder/Svg-icon.vue";

export default {
  name: "Navigation",
  components: {
    SvgIcon,
  },
  computed: {
    currentPage() {
      return this.$route.path;
    },
  },
  data() {
    return {
      homeName: "",
      newsName: "",
      siteownerName: "",
      specialistName: "",
      projectName: "",
      lang: "",
      language: "",
      burgerMenuActive: false,
      burgerMenuMLActive: false,
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? navigationEn : navigation;
      this.homeName = data.homeName;
      this.newsName = data.newsName;
      this.specialistName = data.specialistName;
      this.siteownerName = data.siteownerName;
      this.projectName = data.projectName;
      this.language = data.language;
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

<style lang="scss">
@import "../../assets/styles/main.scss";
.menu {
  background: white;
  position: fixed;
  width: 100px;
  height: 100vh;
  .ml-responsive {
    display: none;
  }
  .logo {
    margin: 20px auto 45px auto;
    .mobile {
      display: none;
    }
    .ml-mobile {
      display: none;
    }
  }
  .burger-menu {
    height: auto;
    width: 100%;
    display: none;
    background-color: #fff;
    @media only screen and (max-width: 768px) {
      &.active {
        display: block;
      }
    }
  }
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
  .row {
    text-align: center;
    div.home-logo {
      margin-top: 0;
    }
    .home-logo,
    .news-logo,
    .owner-logo,
    .specialist-logo,
    .project-logo {
      margin-top: 20px;
      padding-right: 0;
      word-break: break-word;
    }
    .owner-logo,
    .specialist-logo,
    .project-logo {
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
    .owner-logo.mobile,
    .project-logo.mobile,
    .specialists.mobile {
      display: none;
    }
    .router-link-exact-active button p {
      color: #55b364;
    }
    .router-link-exact-active #underline {
      border-bottom: 3px solid #55b364;
      padding-bottom: 3px;
      border-radius: 2px;
    }
    button {
      border: none;
      margin-top: 15px;
      background-color: white;
      .news,
      .home,
      .owner,
      .specialist,
      .project {
        color: #9597ac;
        font-size: 12px;
        margin-bottom: 0;
        font-weight: 700;
        font-family: $font__IBM;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .ml > p {
    margin-bottom: 0;
  }
  .ml {
    @media only screen and (max-width: 768px) {
      display: none;
    }
    position: absolute;
    bottom: 20px;
    margin-left: 30px;
    .ml-mobile {
      cursor: pointer;
    }
    p {
      font-size: 12px;
      font-family: $font__Lato;
      font-weight: 700;
      color: #9597ac;
      margin-bottom: 0px;
    }
    .line {
      width: 2px;
      height: 1px;
      border-bottom: 15px solid #afafaf;
      border-radius: 10px;
      margin-top: 12px;
    }
  }
}
.green-line {
  width: 5px;
  border-bottom: 80px solid #55b364;
  border-radius: 10px;
  position: fixed;
  left: 0px;
}
.custom {
  .a {
    fill: #55b364;
  }
}
.navigation-svg-button {
  .svg-class {
    width: 30px;
    height: 30px;
  }
}
.home-news-sizes {
  .svg-class {
    width: 20px;
    height: 20px;
  }
}
</style>