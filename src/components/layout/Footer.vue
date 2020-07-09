<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-xl-3 col-3">
          <router-link :to="`/privacy-policy?lang=${$router.history.current.query.lang}`">
            <p class="footer-title privacy-policy">{{footer.titles.privacyPolicy}}</p>
          </router-link>
        </div>
        <div class="col-sm-6 col-xl-3 col-3">
          <p class="footer-title">{{footer.titles.contact}}</p>
          <a :href="`mailto:${contact}`" v-for="contact of footer.contacts" :key="contact">
            <p>
              <img class="icon" src="assets/envelope-white.svg" />
              {{contact}}
            </p>
          </a>
        </div>
        <div class="col-sm-6 col-xl-3 col-3">
          <p class="footer-title">{{footer.titles.social}}</p>
          <a :href="footer.linkedin.link" target="_blank">
            <p>
              <img class="icon" src="assets/linkedin-white.svg" />
              {{footer.linkedin.name}}
            </p>
          </a>
        </div>
        <div class="col-sm-3 col-xl-3 col-3">
          <img src="assets/logo.svg" class="footer-link" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import footerNl from "js-yaml-loader!../../../content-nl/footer.yaml";
import footerEn from "js-yaml-loader!../../../content-en/footer.yaml";
export default {
  name: "Footer",
  data() {
    return {
      footer: {},
      lang: ""
    };
  },
  watch: {
    $route() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.query.lang;
      let data = this.lang === "en" ? footerEn : footerNl;
      this.footer = data;
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 50px;
  background-color: #26272e;
  .row {
    width: 100%;
    height: 200px;

    margin-top: 100px;
    text-align: left;
    .footer-link {
      width: 130px;
    }
    .footer-title {
      font-weight: bold;
    }

    .privacy-policy {
      text-align: center;
    }

    .col-3,
    a {
      color: white;
      margin-top: auto;
      margin-bottom: auto;
      .icon {
        margin-right: 10px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .footer-link {
    display: none;
  }
}
</style>
