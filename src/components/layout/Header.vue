<template>
  <lazy-background
    class="background-image"
    :src="backgroundImage"
    placeholder="https://placeholder.pics/svg/1300x800"
    :blur="30"
  >
    <div slot="content" class="header" id="header">
      <div class="header-overlay"></div>
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
        <!-- <lazy-img :src="image" :blur="30" /> -->
        <img :src="image" />
        <!-- <h3 class="col-sm-12 col-12">{{description}}</h3>
        <router-link :to="`/${$router.history.current.params.lang}/site-owner`">
          <button class="button-choice">
            <p>
              <img src="/assets/site-owner-header-icon.svg" />
              {{button1}}
            </p>
          </button>
        </router-link>
        <router-link :to="`/${$router.history.current.params.lang}/specialists`">
          <button class="button-choice mobile">
            <p>
              <img src="/assets/specialist-header-icon.svg" />
              {{button2}}
            </p>
          </button>
        </router-link>
        <router-link :to="`/${$router.history.current.params.lang}/project-developer`">
          <button class="button-choice mobile">
            <p>
              <img src="/assets/project-dev-header-icon.svg" />
              {{button3}}
            </p>
          </button>
        </router-link>-->
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
      button1: "",
      button2: "",
      button3: "",
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
      this.button1 = data.button1;
      this.button2 = data.button2;
      this.button3 = data.button3;
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
@import "../../assets/styles/components/header.scss";
// .background-image {
//   height: 60vh;
// }
.header {
  height: 100vh;
  width: 100vw;
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
}

.header-content {
  h1 {
    font-weight: 700;
    font-size: 50px;
    width: 720px;
  }
  .lazy-image {
    .lazy-image-main {
      position: relative;
    }
  }
  h3 {
    font-family: $font__Lato;
    font-weight: 400;
    font-size: 25px;
    width: 660px;
    margin: 0 auto;
  }
  .button-choice {
    p {
      font-size: 14px;
      font-weight: 700;
      img {
        margin-right: 12px;
      }
    }
  }
}
</style>