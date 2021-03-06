<template>
  <lazy-background
    class="background-image"
    :src="backgroundImage"
    placeholder="https://placeholder.pics/svg/1300x800"
    :blur="30"
    :class="{ 'background-slot': showAuth == true }"
  >
    <div slot="content" class="header" id="header">
      <div class="header-overlay" id="header-overlay"></div>
      <div
        class="row login-buttons"
        :class="{ 'unclicked-login-button': showAuth == true }"
      >
        <button v-if="hidden" @click="showUploadFile = true">
          Upload File
        </button>
        <p v-if="env.VUE_APP_SITE_MODE == 'digital'">
          Already having an account?
        </p>
        <button
          @click="showAuth = true"
          v-if="!isLogged && env.VUE_APP_SITE_MODE == 'digital'"
        >
          Log in
        </button>
        <button v-if="isLogged" @click="logout()">Logout</button>
      </div>
      <Assets v-if="showUploadFile" @close="showUploadFile = false"></Assets>
      <Authorization
        v-if="showAuth"
        @close="onAuthorizationClose($event)"
      ></Authorization>
      <div class="header-content">
        <h1 class="col-sm-12 col-12">{{ title }}</h1>
        <!-- <lazy-img :src="image" :blur="30" /> -->
        <div>
          <router-link
            :to="`/${$router.history.current.params.lang}/profile`"
            v-if="isLogged"
          >
            <button class="start-buttons">
              {{ button }}
              <img src="/assets/arrow-right-white.png" />
            </button>
          </router-link>
          <router-link
            :to="`/${$router.history.current.params.lang}/profilelogin`"
            v-if="!isLogged && env.VUE_APP_SITE_MODE == 'digital'"
          >
            <button class="start-buttons" @click="showAuth = true">
              {{ button }}
              <img src="/assets/arrow-right-white.png" />
            </button>
          </router-link>
          <Calendly
            :lang="lang"
            v-if="env.VUE_APP_SITE_MODE == 'analogue'"
          ></Calendly>
        </div>
      </div>
    </div>
  </lazy-background>
</template>

<script>
import Authorization from "@components/sections/Authorization";
import Assets from "@components/Assets";
import Calendly from "@components/new-components/Calendly";
import header from "@content/nl/general/header.yaml";
import headerEn from "@content/en/general/header.yaml";
export default {
  components: {
    Authorization,
    Assets,
    Calendly,
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
      env: {},
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
    this.env = process.env;
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
      this.isLogged = !!localStorage.token;
    },
    onAuthorizationClose(isLogged) {
      this.showAuth = false;
      if (isLogged) {
        this.isLogged = true;
        this.$router.push(`${this.lang}/profile`);
      }
    },
    logout() {
      delete localStorage.token;
      delete localStorage.loggedUser;
      this.isLogged = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
@import "@styles/newmain.scss";
@import "@styles/components/header.scss";
.header {
  height: 100%;
  width: 100vw;
  .header-overlay {
    height: 100vh;
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
    z-index: 12;
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
      outline: none;
    }
    p {
      font-size: 14px;
      color: white;
      font-weight: 700;
    }
  }
  div.header-content {
    h1 {
      text-align: center;
      font-size: 40px;
      color: #ffffff;
      margin-top: 260px;
      margin-bottom: 40px;
      font-weight: 900;
      padding: 0;
      max-width: 850px;
    }
  }
}
</style>