<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-xl-3 col-md-4 col-12 footer-link">
          <img src="/assets/logo.svg" class="logo-image" />
        </div>
        <div class="col-sm-12 col-xl-3 col-12 links-positioning">
          <router-link :to="`/${lang}/privacy-policy`">
            <p class="footer-title privacy-policy">{{footer.titles['first-link']}}</p>
          </router-link>
          <router-link :to="`/${lang}/project-developer`">
            <p class="footer-title privacy-policy">{{footer.titles['second-link']}}</p>
          </router-link>
          <router-link :to="`/${lang}/specialists`">
            <p class="footer-title privacy-policy">{{footer.titles['third-link']}}</p>
          </router-link>
        </div>
        <div class="col-sm-6 col-xl-3 col-md-4 col-12 row-info">
          <h3 class="footer-title">{{footer.titles.contact}}</h3>
          <a :href="`mailto:${contact}`" v-for="contact of footer.contacts" :key="contact">
            <p class="font">
              <img class="icon" src="/assets/envelope-footer.svg" />
              {{contact}}
            </p>
          </a>
        </div>
        <div class="col-sm-6 col-xl-3 col-md-4 col-12 row-info">
          <h3 class="footer-title">{{footer.titles.social}}</h3>
          <a :href="footer.linkedin.link" target="_blank">
            <p class="font-linkedin">
              <img class="icon" src="/assets/linkedin-footer.svg" />
              {{footer.linkedin.name}}
            </p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import footerNl from "js-yaml-loader!../../../content/nl/footer.yaml";
import footerEn from "js-yaml-loader!../../../content/en/footer.yaml";
export default {
  name: "Footer",
  data() {
    return {
      footer: {},
      lang: "",
    };
  },
  watch: {
    $route() {
      this.init();
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? footerEn : footerNl;
      this.footer = data;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/newmain.scss";
.footer {
  padding-bottom: 60px;
  .container {
    width: 100%;
    padding: 0;
    .links-positioning,
    .row-info {
      text-align: left;
      img {
        margin-right: 10px;
      }
    }
    h3 {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>