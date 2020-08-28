<template>
  <div class="container" id="renewable-energy">
    <div class="renewable-energy">
      <div class="col-12">
        <h1>{{title}}</h1>
        <h3>{{description}}</h3>
      </div>
      <div class="row">
        <div class="col-4 info-energy-card" v-for="cards of card.card" :key="cards.image">
          <div class="style-card">
            <img :src="cards.image" />
            <h2>{{cards.label}}</h2>
            <p>{{cards.information}}</p>
          </div>
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
.renewable-energy {
  h1 {
    text-align: center;
  }
  h3 {
    margin: 30px 0 80px;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  .info-energy-card {
    .style-card {
      border-radius: 40px;
      padding: 55px 25px;
      margin-bottom: 20px;
      height: 360px;
      overflow: hidden;
      h2 {
        margin: 25px 0;
      }
    }
  }
}
</style>