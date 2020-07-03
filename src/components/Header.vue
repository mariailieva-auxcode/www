<template>
  <div class="body">
    <div class="menu">
      <div class="col-12 logo">
        <img src="../../public/assets/logo.png" />
      </div>
      <div class="row">
        <div class="col-12 home-logo">
          <button>
            <img src="../../public/assets/home.png" />
            <p class="home">Home</p>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-12 news-logo">
          <button>
            <img src="../../public/assets/news.png" />
            <p class="news">News</p>
          </button>
        </div>
      </div>
    </div>

    <div class="header">
      <div class="header-content">
        <h1>Connecting renewable energy!</h1>
        <h3>Greenatlas.earth is hét matchmaking platform voor vraag en aanbod in de zakelijke duurzame energiemarkt.</h3>
        <p>Ik ben</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.body {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100%;
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
  .header {
    background-image: url("../../public/assets/header-image.png");
    background-size: cover;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-content {
      width: 60%;
      color: $color__white;
      h1 {
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 15px;
      }
      p {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>