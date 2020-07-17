<template>
  <div class="row row-fluid what-is-green-phone">
    <div class="col-6 image">
      <img :src="whatIs.image" />
    </div>
    <div class="col-sm-12 col-xl-6 col-6 what-section">
      <div class="col-sm-12 col-md-12 col-xl-12 col-12">
        <Title
          :title="whatIs.title"
          :sectionTitle="whatIs.subTitle"
          :isHomePage="false"
          :isWhat="true"
        ></Title>
      </div>
      <p class="description">{{whatIs.description}}</p>
      <div class="row">
        <div class="col-sm-12 col-xl-12 col-12 text" v-for="bullet of whatIs.bullets" :key="bullet">
          <div class="row">
            <img class="col-xl-2 col-sm-2 icon" :src="bullet.icon" />
            <p class="col-xl-10 col-sm-10">{{bullet.text}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import whatIs from "js-yaml-loader!../../../content/nl/general/whatis.yaml";
import whatIsEn from "js-yaml-loader!../../../content/en/general/whatis.yaml";
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
  props: {
    lang: String
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    }
  },
  methods: {
    init() {
      let data = this.lang === "en" ? whatIsEn : whatIs;
      this.whatIs = data;
    }
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
  p {
    font-size: 18px;
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
      margin-left: 40px;
      margin-bottom: 20px;
      padding: 0 15px 0 0;
      .row {
        padding: 0;
        p {
          margin: 0;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .image {
    display: none;
  }
}
</style>