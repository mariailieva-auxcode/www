<template>
  <div class="footer">
    <!-- <router-link to="/">Go to News</router-link>
    <div v-html="html"></div>
    <router-link to="/">Go to News</router-link>-->
    <div class="row">
      <div class="col-3">
        <p>Privacy Policy</p>
      </div>
      <div class="col-3">
        <p>Contact</p>
        <p>
          <img class="icon" src="../../public/assets/envelope-white.png" />jaap@greenatlas.earth
        </p>
      </div>
      <div class="col-3">
        <p>Social Links</p>
        <p>
          <img class="icon" src="../../public/assets/linked-in-white.png" />/greenatlas
        </p>
      </div>
      <div class="col-3">
        <img src="../../public/assets/big-logo.png" />
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import gdpr from "raw-loader!../../content/gdpr.md";
export default {
  name: "Footer",

  data() {
    return {
      html: ""
    };
  },
  mounted() {
    this.html = marked(gdpr);
  }
};
</script>

<style lang="scss" scoped>
.row {
  width: 100%;
  height: 200px;
  background-color: #26272e;
  margin-top: 100px;
  .col-3 {
    color: white;
    margin-top: auto;
    margin-bottom: auto;
    .icon {
      margin-right: 10px;
    }
  }
}
</style>
