<template>
  <div class="container" id="partners">
    <div class="partners">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row">
        <div class="col-10 info-partners" v-for="partner of partners.partners" :key="partner.image">
          <div class="row">
            <img class="col-4" :src="partner.image" />
            <p class="col-8">{{partner.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import partners from "js-yaml-loader!../../../content/nl/general/new-partners.yaml";
import partnersEn from "js-yaml-loader!../../../content/en/general/new-partners.yaml";
export default {
  name: "Partners",
  data() {
    return {
      partners: {},
      title: "",
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
      let data = this.lang === "en" ? partnersEn : partners;
      this.partners = data;
      this.title = data.title;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
</style>