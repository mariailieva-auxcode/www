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
                <img
                  :src="currentPage === '/nl' || currentPage === '/en' ? '/assets/home.svg' : '/assets/home-alt.svg'"
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
                <img
                  :src="currentPage === '/nl/news' || currentPage === '/en/news' ? '/assets/newspaper.svg' : '/assets/newspaper-alt.svg'"
                />
                <p class="news">{{newsName}}</p>
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
              <img
                :src="currentPage === '/nl' || currentPage === '/en' ? '../assets/home.svg' : '../assets/home-alt.svg'"
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
              <img
                :src="currentPage === '/nl/news' || currentPage === '/en/news' ? '../assets/newspaper.svg' : '../assets/newspaper-alt.svg'"
              />
              <p class="news">{{newsName}}</p>
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="ml">
      <p>{{language}}</p>
      <div class="ml-mobile" @click="burgerMenuMLActive =!burgerMenuMLActive">
        <img
          class="flag"
          :src="currentPage.includes('/en') ? '/assets/united-kingdom.svg' : '/assets/netherlands.svg'"
        />
        <img src="/assets/angle-down.svg" />
      </div>
      <div class="burger-menu-ml" :class="{'active': burgerMenuMLActive}">
        <div class="row language-display">
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

export default {
  name: "Navigation",
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
  .logo {
    margin: 20px auto 60px auto;
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
      left: 10px;
      bottom: 10px;
    }
    .language-display {
      width: 120px;
      button {
        .nl {
          position: absolute;
          margin-top: 12px;
        }
      }
    }
  }
  .row {
    text-align: center;
    .news-logo,
    .owner-logo,
    .specialist-logo,
    .project-logo {
      margin-top: 25px;
    }
    .router-link-exact-active button p {
      color: #55b364;
    }
    button {
      border: none;
      margin-top: 10px;
      background-color: white;
      .news,
      .home,
      .owner,
      .specialist,
      .project {
        color: #9597ac;
        font-size: 14px;
        margin-top: 10px;
        margin-bottom: 0;
        font-weight: bold;
      }
      &:focus {
        outline: none;
      }
    }
  }
  .ml {
    position: absolute;
    bottom: 30px;
    margin-left: 15px;
    .ml-mobile {
      cursor: pointer;
      .flag {
        margin-right: 5px;
      }
    }
    p {
      font-size: 12px;
      font-family: $font__Lato;
      font-weight: 700;
      color: #9597ac;
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
  height: 1px;
  margin-top: 5px;
  border-bottom: 80px solid #55b364;
  border-radius: 10px;
  position: fixed;
  left: 0px;
}
</style>