<template>
  <div class="container" id="renewable-energy">
    <div class="renewable-energy">
      <div class="col-12">
        <h1>{{ title }}</h1>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 first-energy-card link-style"
        >
          <div class="style-card">
            <h2>{{ firstCardLabel }}</h2>
            <p>{{ firstCardInformation }}</p>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-xl-4 image">
          <img :src="cardImage" />
        </div>
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-energy-card link-style"
          v-for="cards of card.card"
          :key="cards.image"
        >
          <div class="style-card">
            <h2>{{ cards.label }}</h2>
            <p>{{ cards.information }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import energy from "@content/nl/general/renewable-energy.yaml";
import energyEn from "@content/en/general/renewable-energy.yaml";
export default {
  name: "RenewableEnergy",
  data() {
    return {
      card: {},
      firstCardLabel: "",
      firstCardInformation: "",
      cardImage: "",
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
      let data = this.lang === "en" ? energyEn : energy;
      this.card = data;
      this.title = data.title;
      this.firstCardLabel = data["first-card-label"];
      this.firstCardInformation = data["first-card-information"];
      this.cardImage = data.image;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/new-mobile-mode.scss";
@import "@styles/newmain.scss";
.renewable-energy {
  .link-style {
    padding-left: 20px;
    padding-right: 20px;
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
    flex-direction: column;
    h1 {
      width: 80%;
      font-size: 45px;
      margin: auto;
      text-align: left;
      line-height: 60px;
      &.middle-row {
        display: flex;
        flex-direction: row;
      }
      &.different-color {
        color: #55b364;
        margin-left: 10px;
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
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1100px;
  .image {
    img {
      width: 320px;
      height: 530px;
      border-radius: 20px;
      box-shadow: 0px 6px 30px #1d226f0d;
    }
  }
  .info-energy-card,
  .first-energy-card {
    .style-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      border-radius: 40px;
      width: 330px;
      margin-bottom: 38px;
      height: 530px;
      padding: 30px;
      overflow: hidden;
      h2 {
        max-width: 230px;
        margin: 0 auto 15px;
      }
      p {
        line-height: 22px;
        margin-bottom: 5px;
      }
      .central-text {
        display: flex;
        flex-direction: column;
        background-color: unset;
        align-items: center;
        h1 {
          font-size: 45px;
          margin: 0;
        }
        .middle-row {
          display: flex;
          flex-direction: row;
          .different-color {
            color: green;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 768px) and (max-width: 920px) {
  .renewable-energy {
    .row {
      .link-style {
        .style-card {
          width: 280px;
        }
      }
    }
  }
}
</style>