<template>
  <div class="container" id="helper">
    <div class="helper">
      <div class="col-12">
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
      </div>
      <div class="col-12 info-helper" v-for="help of explanations.explanations" :key="help.image">
        <div class="row">
          <img class="col-2" :src="help.image" />
          <h2 class="col-10">{{help.information}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helper from "js-yaml-loader!../../../content/nl/general/helper.yaml";
import helperEn from "js-yaml-loader!../../../content/en/general/helper.yaml";
export default {
  name: "Helper",
  data() {
    return {
      explanations: {},
      title: "",
      description: "",
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
      let data = this.lang === "en" ? helperEn : helper;
      this.explanations = data;
      this.title = data.title;
      this.description = data.description;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.helper {
  h3 {
    margin: 30px 0 60px;
    text-align: center;
  }
  .row {
    display: flex;
    align-items: center;
    width: 50%;
    opacity: 0.6;
    margin: 20px auto;
    h2 {
      text-align: left;
      font-size: 18px;
      font-weight: 500;
      line-height: 23px;
      padding: 0;
      margin-left: 28px;
    }
    img {
      max-width: 45px;
      padding: 0;
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>