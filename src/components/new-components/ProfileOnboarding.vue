<template>
  <div class="profile-onboarding" v-if="data.steps && data.steps[step]">
        <p>{{ data.steps[step].title }}</p>
        <div class="style">
          <div v-if="step !== 6" class="toggles">
            <button             
              v-for="(choice, i) of data.steps[step].choices"
              :key="i"
              :class="{ active: choice.key == answers[step] }"
              @click="(toggle(choice.key), step++, questionnaire(choice.key))"
              class="step1choice1 style"
            >
              {{ choice.text }}
            </button>
          </div>
          <div class="toggles" v-if="step === 6">
              <button             
              v-for="(choice, i) of data.steps[step].choices"
              :key="i"
              :class="{ active: choice.key == answers[step] }"
              @click="toggle(choice.key), nextStep(), questionnaire(choice.key)"
              class="step1choice1 style"
            >
            {{ choice.text }}
            </button>
          </div>
        </div>
    <div>
      <button v-if="step !== 0" @click="step--">back</button>
      <button v-if="step === 6" @click="nextStep()">Next Step</button>
    </div>
  </div>
</template>

<script>
import questionnaireEn from "js-yaml-loader!../../../content/en/site-owner/profile-questionnaire.yaml";
import questionnaire from "js-yaml-loader!../../../content/nl/site-owner/profile-questionnaire.yaml";
import axios from '../../axios';
export default {
  data() {
    return {
      step: 0,
      data: {steps:{}},
      answers: [],
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
    toggle(key){
      this.answers[this.step] = key
    },
    init() {
      this.data = this.lang === "en" ? questionnaireEn : questionnaire;
    },
    questionnaire(variable){
      let test = this.answers;
      const data = {
           answers: test
        };
      axios.put("/.netlify/functions/siteOwner", { data }).then (console.log(variable))
    },
    nextStep() {
      this.$emit("nextStep");
      this.$emit("close");
      this.$emit("stepsColor");
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
</style>