<template>
  <div class="menu">
    <div class="col-12 logo">
      <img src="assets/logo.svg" />
    </div>
    <div class="row">
      <div class="col-12 home-logo">
        <router-link to="/">
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
            <img :src="currentPage === '/news' ? 'assets/newspaper.svg' : 'assets/newspaper-alt.svg'" />
            <p class="news">News</p>
          </button>
        </router-link>
      </div>
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
  }
}
</script>

<style lang="scss">
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
      .news, .home {
        color: #9597ac;
        font-size: 14px;
        margin-top: 5px;
      }
      &:focus {
        outline: none
      }
    }
  }
}
</style>