<template>
  <lazy-background
    class="background-image"
    :src="backgroundImage"
    placeholder="https://placeholder.pics/svg/1300x800"
    :blur="30"
  >
    <div slot="content" class="header" id="header">
      <div class="header-overlay" id="header-overlay"></div>
      <div class="row login-buttons">
        <button v-if="hidden" @click="showUploadFile = true">Upload File</button>
        <p>Already having an account?</p>
        <button @click="showAuth = true" v-if="!isLogged">Log in</button>
        <button v-if="isLogged" @click="logout()">Logout</button>
      </div>
      <Assets v-if="showUploadFile" @close="showUploadFile=false"></Assets>
      <Authorization v-if="showAuth" @close="onAuthorizationClose($event)"></Authorization>
      <div class="header-content">
        <h1 class="col-sm-12 col-12">{{title}}</h1>
        <lazy-img :src="image" :blur="30" />
        <div>
          <router-link :to="`/${$router.history.current.params.lang}/questionnaire`">
            <button class="start-buttons">
              {{button}}
              <img src="/assets/arrow-right-white.png" />
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </lazy-background>
</template>

<script>
import Authorization from "../sections/Authorization";
import Assets from "../Assets";
import header from "js-yaml-loader!../../../content/nl/general/header.yaml";
import headerEn from "js-yaml-loader!../../../content/en/general/header.yaml";
export default {
  components: {
    Authorization,
    Assets,
  },
  data() {
    return {
      title: "",
      description: "",
      button: "",
      backgroundImage: "",
      image: "",
      showAuth: false,
      showUploadFile: false,
      isLogged: false,
      hidden: false,
    };
  },
  props: {
    lang: String,
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
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? headerEn : header;
      this.title = data.title;
      this.description = data.description;
      this.button = data.button;
      this.image = data.image;
      this.backgroundImage = data["background-image"];
    },
    onAuthorizationClose(isLogged) {
      this.showAuth = false;
      if (isLogged) this.isLogged = true;
    },
    logout() {
      delete localStorage.token;
      this.isLogged = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/newmain.scss";
@import "../../assets/styles/components/header.scss";
.header {
  height: 100%;
  width: 100vw;
  .header-overlay {
    height: 60vh;
  }
  .login-buttons {
    position: absolute;
    top: 20px;
    right: 55px;
    font-family: $font__IBM;
    align-items: baseline;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    button {
      background-color: transparent;
      border: 2px solid #ffffff;
      border-radius: 10px;
      margin-left: 20px;
      font-size: 14px;
      justify-content: center;
      color: #ffffff;
      font-weight: 700;
      width: 148px;
      height: 46px;
      align-items: baseline;
    }
  }
  div.header-content {
    h1 {
      text-align: center;
      font-size: 40px;
      color: #ffffff;
      margin-top: 100px;
      margin-bottom: 50px;
    }
  }
}
</style>