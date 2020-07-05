<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Our Survey</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p>{{survey.description}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <a :href="survey.link" target="_blank">
          <button>
            <p class="btn-text">
              Take the survey
              <img src="assets/arrow-right-white.png" />
            </p>
          </button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import survey from "js-yaml-loader!../../../content/survey.yaml";
export default {
  name: "Survey",
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
}
.btn-text {
  margin: 15px 80px;
  color: white;
}
</style>