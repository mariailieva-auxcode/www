<template>
  <div class="header" :style="{'background-image': `url(${image})`}">
    <div class="header-overlay"></div>
    <div class="header-content">
      <h1 class="col-sm-12 col-12">{{title}}</h1>
      <h3 class="col-sm-12 col-12">{{description}}</h3>
      <router-link :to="`/${$router.history.current.params.lang}/site-owner`">
        <button class="button-choice">
          <p>
            <img src="/assets/site-owner-header-icon.svg" />
            {{button1}}
          </p>
        </button>
      </router-link>
      <router-link :to="`/${$router.history.current.params.lang}`">
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
      </router-link>
    </div>
  </div>
</template>

<script>
import header from "js-yaml-loader!../../../content/nl/general/header.yaml";
import headerEn from "js-yaml-loader!../../../content/en/general/header.yaml";
export default {
  data() {
    return {
      title: "",
      description: "",
      button1: "",
      button2: "",
      button3: "",
      image: "",
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
      let data = this.lang === "en" ? headerEn : header;
      this.title = data.title;
      this.description = data.description;
      this.button1 = data.button1;
      this.button2 = data.button2;
      this.button3 = data.button3;
      this.image = data.image;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/components/header.scss";

.header {
  height: 100vh;
}

.header-content {
  h1 {
    font-weight: 700;
    font-size: 50px;
    width: 720px;
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