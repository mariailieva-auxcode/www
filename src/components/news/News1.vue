<template>
  <div class="container-fluid">
    <div class="row news-text">
      <div class="col-2">
        <Title title="News" sectionTitle="01" :isHomePage="true"></Title>
      </div>
      <div class="col-7">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita.
        </p>
      </div>
      <div class="col-2">
        <router-link to="/news">
          <button>
            <p>
              To News
              <img src="assets/arrow-right-blue.png" />
            </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../layout/Title";
export default {
  components: {
    Title
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.container-fluid {
  margin-bottom: 75px;
  .news-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
    .col-2 > h1 {
      font-size: 45px;
      color: #393a4d;
      font-weight: bold;
    }
    .col-7 {
      max-width: 60%;
      margin-left: 100px;
    }
    p {
      color: #9597ac;
      font-size: 18px;
      font-family: $font__IBMmedium;
      font-weight: 500;
    }
    .col-2 button {
      width: 140px;
      height: 45px;
      border-radius: 10px;
      border: 2px solid #2783ff;
      background-color: white;
      p {
        margin: auto;
        font-size: 14px;
        font-family: $font__IBMmedium;
        font-weight: 500;
        color: #2783ff;
      }
    }
  }
}
</style>