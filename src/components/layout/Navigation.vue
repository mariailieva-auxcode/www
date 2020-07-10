<template>
  <div class="menu">
    <div class="col-12 logo">
      <router-link :to="`?lang=${$router.history.current.query.lang}`">
        <img src="assets/logo.svg" />
      </router-link>
    </div>
    <div class="row">
      <div class="row">
        <div class="col-12 home-logo">
          <router-link :to="`/?lang=${$router.history.current.query.lang}`">
            <div v-if="currentPage === '/'" class="green-line"></div>
            <button>
              <img :src="currentPage === '/' ? 'assets/home.svg' : 'assets/home-alt.svg'" />
              <p class="home">{{homeName}}</p>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-12 news-logo">
          <router-link :to="`/news?lang=${$router.history.current.query.lang}`">
            <div v-if="currentPage === '/news'" class="green-line"></div>
            <button>
              <img
                :src="currentPage === '/news' ? 'assets/newspaper.svg' : 'assets/newspaper-alt.svg'"
              />
              <p class="news">{{newsName}}</p>
            </button>
          </router-link>
        </div>
      </div>
      <div class="row ml">
        <router-link to="?lang=nl">
          <button>
            <p>NL</p>
          </button>
        </router-link>

        <div class="line"></div>
        <router-link to="?lang=en">
          <button>
            <p>EN</p>
          </button>
        </router-link>
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
    }

    // ?lang=en TODO (Milen)
  },
  data() {
    return {
      homeName: "",
      newsName: "",
      lang: ""
    };
  },
  watch: {
    $route() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.query.lang;
      let data = this.lang === "en" ? navigationEn : navigation;
      this.homeName = data.homeName;
      this.newsName = data.newsName;
    }
  }
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
  }
  .row {
    text-align: center;
    .news-logo {
      margin-top: 40px;
    }
    .router-link-exact-active button p {
      color: #55b364;
    }
    button {
      border: none;
      margin-top: 10px;
      background-color: white;
      .news,
      .home {
        color: #9597ac;
        font-size: 14px;
        margin-top: 5px;
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
      margin-top: 10px;
    }
  }
}
.green-line {
  width: 5px;
  height: 1px;
  border-bottom: 70px solid #55b364;
  border-radius: 10px;
  position: fixed;
  left: 0px;
}
</style>