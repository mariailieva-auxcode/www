<template>
  <div class="container survey">
    <div class="row">
      <div class="col-12">
        <Title
          :title="survey.title"
          :sectionTitle="survey.subTitle"
          :isHomePage="false"
          :isCentered="true"
        ></Title>
      </div>
    </div>
    <div class="row">
      <div class="col-12 description">
        <p class="survey-description">{{survey.description}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a :href="survey.link" target="_blank">
          <button class="survey-button">
            <p class="btn-text">
              {{survey.button}}
              <img src="/assets/arrow-right-white.png" />
            </p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import survey from "@content/nl/general/survey.yaml";
import surveyEn from "@content/en/general/survey.yaml";
import Title from "@components/layout/Title";
export default {
  name: "Survey",
  components: {
    Title
  },
  data() {
    return {
      survey: {}
    };
  },
  props: {
    lang: String
  },
  mounted() {
    this.init();
  },
  watch: {
    lang() {
      this.init();
    }
  },
  methods: {
    init() {
      let data = this.lang === "en" ? surveyEn : survey;
      this.survey = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
.survey {
  margin-top: 160px;
}
p {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
  margin-top: 40px;
  margin-bottom: 50px;
  color: #9597ac;
}
button.survey-button {
  background-color: #55b364;
  border-radius: 15px;
  border: none;
  box-shadow: 0px 4px 15px #00000033;
}
.btn-text {
  margin: 15px 80px;
  color: white;
}
</style>