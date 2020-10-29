<template>
  <div class="profile-onboarding">
    <div v-if="step === 1">
      <div v-for="(question, index) of firstStep.firstStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->

    <div v-if="step === 2">
      <div v-for="(question, index) of secondStep.secondStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3 -->

    <div v-if="step === 3">
      <div v-for="(question, index) of thirdStep.thirdStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4 -->

    <div v-if="step === 4">
      <div v-for="(question, index) of fourthStep.fourthStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 5 -->

    <div v-if="step === 5">
      <div v-for="(question, index) of fifthStep.fifthStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 6 -->

    <div v-if="step === 6">
      <div v-for="(question, index) of sixthStep.sixthStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              @click="step++"
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 7 -->

    <div v-if="step === 7">
      <div v-for="(question, index) of seventhStep.seventhStep" :key="index">
        <p>{{ question.title }}</p>
        <div class="style">
          <div class="toggles">
            <button
              v-for="(test, i) of question.choices"
              :key="i"
              class="step1choice1 style"
            >
              {{ test.choice }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <button v-if="step !== 1" @click="step--">back</button>
      <button v-if="step === 7" @click="nextStep()">Next Step</button>
    </div>
  </div>
</template>

<script>
import questionnaireEn from "js-yaml-loader!../../../content/en/site-owner/profile-questionnaire.yaml";
import questionnaire from "js-yaml-loader!../../../content/nl/site-owner/profile-questionnaire.yaml";
export default {
  data() {
    return {
      step: 1,
      firstStep: {},
      secondStep: {},
      thirdStep: {},
      fourthStep: {},
      fifthStep: {},
      sixthStep: {},
      seventhStep: {},
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
      let data = this.lang === "en" ? questionnaireEn : questionnaire;
      this.firstStep = data;
      this.secondStep = data;
      this.thirdStep = data;
      this.fourthStep = data;
      this.fifthStep = data;
      this.sixthStep = data;
      this.seventhStep = data;
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