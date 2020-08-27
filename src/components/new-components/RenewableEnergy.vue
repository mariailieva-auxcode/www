<template>
  <div class="container" id="renewable-energy">
    <div class="renewable-energy">
      <div class="col-12">
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
      </div>
      <div class="row">
        <div class="col-3 info-energy-card" v-for="cards of card.card" :key="cards.image">
          <img :src="cards.image" />
          <h2>{{cards.label}}</h2>
          <p>{{cards.information}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import energy from "js-yaml-loader!../../../content/nl/general/renewable-energy.yaml";
import energyEn from "js-yaml-loader!../../../content/en/general/renewable-energy.yaml";
export default {
  name: "Renewable Energy",
  data() {
    return {
      card: {},
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
      let data = this.lang === "en" ? energyEn : energy;
      this.card = data;
      this.title = data.title;
      this.description = data.description;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.row {
  display: flex;
  justify-content: space-between;
  .info-energy-card {
    box-shadow: 0px 6px 30px #1d226f0d;
    border-radius: 40px;
    background-color: #ffffff;
    padding: 55px 25px;
  }
}
</style>