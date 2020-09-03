<template>
  <div class="container" id="renewable-energy">
    <div class="renewable-energy">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row">
        <div class="col-4 first-energy-card link-style">
          <div class="style-card">
            <h2>{{firstCardLabel}}</h2>
            <p>{{firstCardInformation}}</p>
            <a class="link">
              {{firstCardLink}}
              <img src="/assets/arrow-right-blue.svg" />
            </a>
          </div>
        </div>
        <div class="col-4 second-energy-card">
          <h1>
            {{middleCardDefault}}
            <h1 class="different-color">{{middleCardGreen}}</h1>
            {{middleCardAfter}}
          </h1>
        </div>
        <div
          class="col-4 info-energy-card link-style"
          v-for="cards of card.card"
          :key="cards.image"
        >
          <div class="style-card">
            <h2>{{cards.label}}</h2>
            <p>{{cards.information}}</p>
            <a class="link">
              {{cards.link}}
              <img src="/assets/arrow-right-blue.svg" />
            </a>
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
      firstCardLabel: "",
      firstCardInformation: "",
      firstCardLink: "",
      middleCardDefault: "",
      middleCardGreen: "",
      middleCardAfter: "",
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
      this.firstCardLabel = data["first-card-label"];
      this.firstCardInformation = data["first-card-information"];
      this.firstCardLink = data["first-card-link"];
      this.middleCardDefault = data["middle-card-default-text"];
      this.middleCardGreen = data["middle-card-green-text"];
      this.middleCardAfter = data["middle-card-after-green-text"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.renewable-energy {
  .link-style {
    .link {
      font-size: 14px;
      color: #5694e8;
      font-weight: 700;
      text-align: right;
      cursor: pointer;
      img {
        margin-left: 8px;
      }
    }
  }
  .second-energy-card {
    display: flex;
    h1 {
      width: 80%;
      font-size: 45px;
      margin: auto;
      text-align: left;
      line-height: 60px;
      &.different-color {
        color: #55b364;
        margin: 0;
      }
    }
  }
  h1 {
    text-align: center;
    margin-bottom: 75px;
  }
}
.row {
  display: flex;
  justify-content: space-between;
  .info-energy-card,
  .first-energy-card {
    .style-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border-radius: 40px;
      width: 330px;
      margin-bottom: 20px;
      height: 300px;
      padding: 0 25px 30px;
      overflow: hidden;
      p {
        max-height: 135px;
        overflow: hidden;
        line-height: 22px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>