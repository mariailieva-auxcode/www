<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-xl-3 col-12 policy-positioning">
          <router-link :to="`/${lang}/privacy-policy`">
            <p class="footer-title privacy-policy">{{footer.titles.privacyPolicy}}</p>
          </router-link>
        </div>
        <div class="col-sm-6 col-xl-3 col-md-4 col-12 row-info">
          <p class="footer-title">{{footer.titles.contact}}</p>
          <a :href="`mailto:${contact}`" v-for="contact of footer.contacts" :key="contact">
            <p class="font">
              <img class="icon" src="/assets/envelope-white.svg" />
              {{contact}}
            </p>
          </a>
        </div>
        <div class="col-sm-6 col-xl-3 col-md-4 col-12 row-info">
          <p class="footer-title">{{footer.titles.social}}</p>
          <a :href="footer.linkedin.link" target="_blank">
            <p class="font-linkedin">
              <img class="icon" src="/assets/linkedin-white.svg" />
              {{footer.linkedin.name}}
            </p>
          </a>
        </div>
        <div class="col-sm-12 col-xl-3 col-md-4 col-12 footer-link">
          <img src="/assets/logo.svg" class="logo-image" />
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
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? footerEn : footerNl;
      this.footer = data;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
.footer {
  margin-top: 50px;
  background-color: #26272e;
  font-family: $font__IBM;
  font-weight: 700;
  .row {
    width: 100%;
    height: 200px;

    margin-top: 100px;
    text-align: left;
    .policy-positioning {
      display: flex;
      justify-content: center;
    }
    .footer-link {
      justify-content: center;
      display: flex;
      .logo-image {
        width: 130px;
      }
    }
    .footer-title {
      font-size: 18px;
    }

    .privacy-policy {
      text-align: center;
    }

    .row-info,
    a {
      color: white;
      margin-top: auto;
      margin-bottom: auto;
      .font,
      .font-linkedin {
        font-weight: 500;
        font-size: 14px;
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .footer {
    .container {
      .row {
        height: auto;
      }
    }
  }
  .col-sm-12 {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 0 !important;
  }

  .footer-link {
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 60px !important;
  }
}
@media only screen and (max-width: 1200px) {
  .policy-positioning {
    justify-content: flex-start !important;
  }
}
</style>
