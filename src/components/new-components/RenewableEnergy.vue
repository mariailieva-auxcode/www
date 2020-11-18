<template>
  <div class="container" id="renewable-energy">
    <div class="renewable-energy">
      <div class="col-12">
        <h1>{{ title }}</h1>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 first-energy-card link-style"
          v-for="cards of card.card"
          :key="cards.image"
        >
          <div class="first-box style-card">
            <div class="central-text">
              <h1>{{ cards["first-row"] }}</h1>
              <h1 class="middle-row">
                {{ cards["second-row"] }}
                <h1 class="different-color">{{ cards["second-row-green"] }}</h1>
              </h1>
              <h1>{{ cards["third-row"] }}</h1>
            </div>
            <h2>{{ cards["top-box-label"] }}</h2>
            <p>{{ cards["top-box-information"] }}</p>
          </div>
          <div class="second-box style-card">
            <h2>{{ cards["bottom-box-label"] }}</h2>
            <p>{{ cards["bottom-box-information"] }}</p>
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
      // firstCardLabel: "",
      // firstCardInformation: "",
      // firstCardLink: "",
      // middleCardDefault: "",
      // middleCardGreen: "",
      // middleCardAfter: "",
      title: "",
      // description: "",
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
      // this.firstCardLabel = data["first-card-label"];
      // this.firstCardInformation = data["first-card-information"];
      // this.firstCardLink = data["first-card-link"];
      // this.middleCardDefault = data["middle-card-default-text"];
      // this.middleCardGreen = data["middle-card-green-text"];
      // this.middleCardAfter = data["middle-card-after-green-text"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/new-mobile-mode.scss";
@import "@styles/newmain.scss";
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
        // margin: 0;
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
  .info-energy-card,
  .first-energy-card {
    .style-card {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border-radius: 40px;
      width: 330px;
      margin-bottom: 40px;
      height: auto;
      padding: 30px 25px;
      overflow: hidden;
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
</style>