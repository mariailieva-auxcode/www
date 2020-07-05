<template>
  <div class="footer">
    <div class="row">
      <div class="col-3">
        <router-link to="/privacy-policy">
          <p class="footer-title privacy-policy">Privacy Policy</p>
        </router-link>
      </div>
      <div class="col-3">
        <p class="footer-title">Contact</p>
        <a :href="`mailto:${contact}`" v-for="contact of footer.contacts" :key="contact">
          <p>
            <img class="icon" src="assets/envelope-white.png" />{{contact}}
          </p>
        </a>
      </div>
      <div class="col-3">
        <p class="footer-title">Social Links</p>
        <p>
          <img class="icon" src="assets/linked-in-white.png" />/greenatlas
        </p>
      </div>
      <div class="col-3">
        <img src="assets/big-logo.png" />
      </div>
    </div>
  </div>
</template>

<script>
import footer from "js-yaml-loader!../../../content/footer.yaml";
export default {
  name: "Footer",
  data() {
    return {
      footer: {}
    };
  },
  mounted() {
    this.footer = footer;
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  height: 200px;
  background-color: #26272e;
  margin-top: 100px;
  text-align: left;
  .footer-title {
    font-weight: bold;
  }

  .privacy-policy {
    text-align: center;
  }

  .col-3, a {
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
