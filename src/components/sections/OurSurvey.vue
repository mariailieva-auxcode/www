<template>
  <div class="container survey">
    <div class="row">
      <div class="col-12">
        <Title :title="survey.title" :sectionTitle="survey.subTitle" :isHomePage="false"  :isCentered="true"></Title>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="survey-description">{{survey.description}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a :href="survey.link" target="_blank">
          <button>
            <p class="btn-text">
              {{survey.button}}
              <img src="assets/arrow-right-white.png" />
            </p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import survey from "js-yaml-loader!../../../content/general/survey.yaml";
import Title from "../layout/Title"
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
  mounted() {
    this.survey = survey;
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.survey {
  margin-top: 160px;
}
h1 {
  text-align: center;
  font-size: 45px;
  font-weight: bold;
  color: #26272e;
  margin-top: 180px;
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
button {
  background-color: #55b364;
  border-radius: 15px;
  border: none;
  font-family: $font__IBMmedium;
}
.survey-description {
  font-family: $font__IBMmedium;
}
.btn-text {
  margin: 15px 80px;
  color: white;
}
</style>