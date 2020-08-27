<template>
  <div class="container" id="helper">
    <div class="helper">
      <div class="col-12">
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
      </div>
      <div class="row">
        <div class="col-12 info-helper" v-for="help of explanations.explanations" :key="help.image">
          <div class="row">
            <img :src="help.image" />
            <p>{{help.information}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helper from "js-yaml-loader!../../../content/nl/general/helper.yaml";
import helperEn from "js-yaml-loader!../../../content/en/general/helper.yaml";
export default {
  name: "Renewable Energy",
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
.info-helper {
  width: 50%;
}
</style>