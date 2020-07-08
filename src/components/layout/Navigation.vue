<template>
  <div class="menu">
    <div class="col-12 logo">
      <router-link to="/">
        <img src="assets/logo.svg" />
      </router-link>
    </div>
    <div class="row">
      <div class="col-12 home-logo">
        <router-link to="/?lang=nl">
          <button>
            <img :src="currentPage === '/' ? 'assets/home.svg' : 'assets/home-alt.svg'" />
            <p class="home">Home</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12 news-logo">
        <router-link to="/news">
          <button>
            <img
              :src="currentPage === '/news' ? 'assets/newspaper.svg' : 'assets/newspaper-alt.svg'"
            />
            <p class="news">News</p>
          </button>
        </router-link>
      </div>
    </div>
    <div class="row ml">
      <router-link to="/?lang=nl">
        <button>
          <p>NL</p>
        </button>
      </router-link>

      <div class="line"></div>
      <router-link to="/?lang=en">
        <button>
          <p>EN</p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  computed: {
    currentPage() {
      return this.$route.path;
    }
    // ?lang=en TODO (Milen)
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
      background-color: white;
      .news,
      .home {
        color: #9597ac;
        font-size: 14px;
        margin-top: 5px;
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
      font-family: $font__LatoBold;
      font-weight: 700;
      color: #9597ac;
    }
    .line {
      width: 2px;
      height: 1px;
      border-bottom: 15px solid #afafaf;
      border-radius: 10px;
      margin-top: 5px;
    }
  }
}
</style>