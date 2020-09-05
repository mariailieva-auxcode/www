<template>
  <div class="container" id="process">
    <div class="process">
      <div class="col-12">
        <h1>{{title}}</h1>
        <img :src="headerImage" />
      </div>
      <div class="row">
        <div class="col-4 info-steps" v-for="step of steps.steps" :key="step.label">
          <p class="background-numbers">{{step.number}}</p>
          <h2>{{step.label}}</h2>
          <p>{{step.information}}</p>
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
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.process {
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