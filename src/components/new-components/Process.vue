<template>
  <div class="container process" id="process">
    <div class="process">
      <div class="col-12">
        <h1>{{ title }}</h1>
        <div class="comming-soon">
          <img src="/assets/megaphone.svg" />
          <div class="labels">
            <h3>{{ label }}</h3>
            <p>
              {{ description }}<a :href="link">{{ contactText }}</a>
            </p>
          </div>
        </div>
        <img :src="headerImage" />
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps"
          v-for="step of steps.steps"
          :key="step.label"
        >
          <p class="background-numbers">{{ step.number }}</p>
          <h2>{{ step.label }}</h2>
          <p class="information">{{ step.information }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import process from "js-yaml-loader!../../../content/nl/general/process.yaml";
import processEn from "js-yaml-loader!../../../content/en/general/process.yaml";
export default {
  name: "Process",
  data() {
    return {
      steps: {},
      title: "",
      headerImage: "",
      label: "",
      description: "",
      link: "",
      contactText: "",
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
      let data = this.lang === "en" ? processEn : process;
      this.steps = data;
      this.title = data.title;
      this.headerImage = data["header-image"];
      this.label = data["introductory-title"];
      this.description = data["introductory-description"];
      this.ling = data["contact-link"];
      this.contactText = data["contact-text"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.process {
  .comming-soon {
    position: relative;
    width: 680px;
    margin: 0 auto 100px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    img {
      position: absolute;
      left: 0;
    }
    .labels {
      flex-direction: column;
      h3 {
        font-family: $font__Lato;
        font-weight: 900;
        text-align: center;
        color: black;
        font-size: 22px;
      }
      p {
        font-size: 18px;
        max-width: 450px;
        a {
          margin-left: 5px;
        }
      }
    }
  }
  h1 {
    text-align: center;
    margin-bottom: 60px;
  }
  .info-steps {
    position: relative;
    opacity: 0.5;
    margin-top: 30px;
    &:hover {
      margin-top: 5px;
      opacity: 1;
    }
    .background-numbers {
      position: absolute;
      font-size: 200px;
      top: -93px;
      z-index: 1;
      left: -10px;
      opacity: 0.05;
      color: #65687e;
      font-weight: 700;
    }
  }
}
</style>