<template>
  <div class="container process" id="process">
    <div class="process">
      <div class="col-12 macbook-image">
        <h1>{{ title }}</h1>
        <div class="col-12 comming-soon">
          <img
            class="col-xl-2 col-sm-12 col-md-2"
            src="/assets/megaphone.svg"
          />
          <div class="col-xl-10 col-sm-12 col-md-10 labels">
            <h3>{{ label }}</h3>
            <p>
              {{ description }}<a :href="link">{{ contactText }}</a>
            </p>
          </div>
        </div>
        <div class="macbook-image">
          <img v-if="hover" :src="firstImage" />
          <img v-if="hover2" :src="secondImage" />
          <img v-if="hover3" :src="thirdImage" />
        </div>
      </div>
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps margin-fixing"
          v-for="step of firstStep.firstStep"
          :key="step.label"
        >
          <p class="background-numbers">{{ step.number }}</p>
          <h2>{{ step.label }}</h2>
          <p class="information">{{ step.information }}</p>
        </div>

        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps margin-fixing"
          v-for="step of secondStep.secondStep"
          :key="step.label"
          @mouseover="(hover2 = true) && (hover = false)"
          @mouseleave="(hover = true) && (hover2 = false)"
        >
          <p class="background-numbers">{{ step.number }}</p>
          <h2>{{ step.label }}</h2>
          <p class="information">{{ step.information }}</p>
        </div>

        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 info-steps margin-fixing"
          v-for="step of thirdStep.thirdStep"
          :key="step.label"
          @mouseover="(hover3 = true) && (hover = false)"
          @mouseleave="(hover = true) && (hover3 = false)"
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
import process from "@content/nl/general/process.yaml";
import processEn from "@content/en/general/process.yaml";
export default {
  name: "Process",
  data() {
    return {
      firstStep: {},
      secondStep: {},
      thirdStep: {},
      firstImage: "",
      secondImage: "",
      thirdImage: "",
      title: "",
      label: "",
      description: "",
      link: "",
      contactText: "",
      hover: true,
      hover2: false,
      hover3: false,
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
      this.firstStep = data;
      this.secondStep = data;
      this.thirdStep = data;
      this.title = data.title;
      this.firstImage = data["first-step-image"];
      this.secondImage = data["second-step-image"];
      this.thirdImage = data["third-step-image"];
      this.label = data["introductory-title"];
      this.description = data["introductory-description"];
      this.link = data["contact-link"];
      this.contactText = data["contact-text"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
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
        margin: 0 auto;
        a {
          margin-left: 5px;
        }
      }
    }
  }
  .macbook-image {
    > .macbook-image > img {
      width: 745px;
      height: 510px;
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
    &.margin-fixing:hover {
      padding-bottom: 25px;
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