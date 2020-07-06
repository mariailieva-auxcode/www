<template>
  <div class="header">
    <div class="header-content">
      <h1>{{title}}</h1>
      <h3>{{description}}</h3>
      <p>Ik ben</p>
      <router-link to="/site-owner">
        <button class="button-choice">
          <p>{{button1}}</p>
        </button>
      </router-link>
      <router-link to="/project-developer">
        <button class="button-choice">
          <p>{{button2}}</p>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../content/general/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      button1: "",
      button2: ""
    };
  },
  mounted() {
    this.title = header.title;
    this.description = header.description;
    this.button1 = header.button1;
    this.button2 = header.button2;
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.header {
  background-image: url("../../../public/assets/header-image.png");
  background-size: cover;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .header-content {
    width: 60%;
    color: $color__white;
    h1 {
      font-size: 50px;
      font-family: $font__IBMbold;
      font-weight: 700;
      margin-bottom: 15px;
    }
    h3 {
      font-size: 25px;
      font-family: $font__LatoRegular;
      font-weight: 400;
    }
    p {
      font-size: 14px;
      font-family: $font__LatoRegular;
      font-weight: 400;
      margin-top: 30px;
    }
    .button-choice {
      border-radius: 10px;
      background-color: #55b364;
      width: 225px;
      height: 46px;
      border: none;
      margin: 35px 12px 0 12px;
      p {
        font-size: 14px;
        color: $color__white;
        font-family: $font__IBMbold;
        font-weight: 700;
        margin-top: auto;
        margin-bottom: auto;
      }
    }
  }
}
</style>