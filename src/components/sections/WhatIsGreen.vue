<template>
  <div class="row row-fluid">
    <div class="col-6 image">
      <img :src="whatIs.image" />
    </div>
    <div class="col-6">
      <div class="col-12">
        <Title :title="whatIs.title" :sectionTitle="whatIs.subTitle" :isHomePage="false" :isWhat="true"></Title>
      </div>
      <p class="description">{{whatIs.description}}</p>
      <div class="row text" v-for="bullet of whatIs.bullets" :key="bullet">
        <div class="col-1">
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
import whatIs from "js-yaml-loader!../../../content/general/whatis.yaml";
import Title from "../layout/Title";
export default {
  name: "WhatIsGreen",
  components: {
    Title
  },
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
    .description {
      margin-left: 80px;
      margin-bottom: 70px;
    }
    .text {
      margin-left: 60px;
      margin-bottom: 20px;
      .col-1 {
        margin-right: 30px;
      }
    }
  }
}
</style>