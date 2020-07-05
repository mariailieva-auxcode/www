<template>
  <div class="menu">
    <div class="col-12 logo">
      <img src="assets/logo.png" />
    </div>
    <div class="row">
      <div class="col-12 home-logo">
        <button>
          <img src="assets/home.png" />
          <p class="home">Home</p>
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 news-logo">
        <router-link to="/news">
          <button>
            <img src="assets/news.png" />
            <p class="news">News</p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    button {
      border: none;
      background-color: white;
      .home {
        color: #55b364;
      }
      .news {
        color: #9597ac;
        font-size: 14px;
        margin-top: 5px;
      }
    }
  }
}
</style>