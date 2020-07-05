<template>
  <div class="row">
    <div class="col-6 image">
      <img src="assets/greenatlas.earth.png" />
    </div>
    <div class="col-6">
      <div class="col-12">
        <h1>{{whatIs.title}}</h1>
      </div>
      <p>
        {{whatIs.description}}
      </p>
      <div class="row" v-for="bullet of whatIs.bullets" :key="bullet">
        <div class="col-2 small-logo">
          <img src="assets/solar power.png" />
        </div>
        <div class="col-10">
          <p>{{bullet}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import whatIs from "js-yaml-loader!../../../content/whatis.yaml";
export default {
  name: "WhatIsGreen",
  data() {
    return {
      whatIs: {}
    };
  },
  mounted() {
    this.whatIs = whatIs;
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";

.row {
  max-width: 95%;
  h1 {
    margin-bottom: 35px;
    margin-top: 60px;
    font-size: 45px;
    color: #26272e;
  }
  .col-6 {
    margin-top: 150px;
    text-align: left;
    color: #9597ac;
    font-size: 14px;
  }
}
</style>