<template>
  <div class="container" id="FAQ">
    <div class="faq">
      <div>
        <h1>{{title}}</h1>
      </div>
      <div v-for="(faq, i) of questions.questions" :key="i">
        <button @click="faq.opened = !faq.opened">
          <div class="row style-card">
            <div class="green-plus">
              <div class="green-plus-bottom-line" :class="{'accordion' : faq.opened}"></div>
              <div class="green-plus-right-line"></div>
            </div>
            <h2>{{faq.questionName}}</h2>
          </div>
        </button>
        <div v-if="faq.questions && faq.questions.length > 0">
          <div class="sub-question" v-for="(subQ, i) of faq.questions" :key="i">
            <button
              @click="subQ.opened = !subQ.opened"
              class="secondary-question"
              :class="{'accordion': faq.opened}"
            >
              <div>
                <div class="green-plus-bottom-line" :class="{'accordion2nd' : subQ.opened}"></div>
                <div class="green-plus-right-line"></div>
                <h2>{{subQ.subquestion}}</h2>
                <p :class="{'accordion2nd' : !subQ.opened}">{{subQ.answer}}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import faq from "@content/nl/general/faq.yaml";
import faqEn from "@content/en/general/faq.yaml";
export default {
  name: "FAQ",
  data() {
    return {
      title: "",
      questions: {},
      accordion: false,
      accordion2nd: false,
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
      let data = this.lang === "en" ? faqEn : faq;
      this.title = data.title;
      this.questions = data;
      this.addOpenedProperty();
    },
    addOpenedProperty() {
      this.questions.questions = this.questions.questions.map((question) => ({
        ...question,
        opened: false,
        questions: (question.questions || []).map((subQ) => ({
          ...subQ,
          opened: false,
        })),
      }));
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
.faq {
  margin: 0 auto;
  width: 90%;
  & > div h1 {
    margin-bottom: 45px;
  }
  button {
    width: 100%;
    border: none;
    outline: none;
    background-color: unset;
    padding: 0;
  }
  .green-plus,
  .secondary-question {
    position: relative;
    .green-plus-bottom-line {
      position: absolute;
      left: 9px;
      width: 3px;
      border-bottom: 21px solid #55b364;
      border-radius: 10px;
      &.accordion {
        display: none;
      }
    }
    .green-plus-right-line {
      position: absolute;
      top: 9px;
      border-right: 21px solid #55b364;
      border-radius: 10px;
      height: 3px;
    }
  }
  .style-card {
    border-radius: 10px;
    text-align: left;
    padding: 25px 0 20px;
    margin-bottom: 10px;
    padding-left: 25px;
    h2 {
      margin-left: 35px;
    }
  }
  .secondary-question {
    background-color: unset;
    display: none;
    border-radius: 10px;
    text-align: left;
    padding: 25px 0 20px 25px;
    margin-bottom: 10px;
    box-shadow: 0px 6px 30px #1d226f0d;

    h2 {
      margin-left: 35px;
    }
    p {
      margin-left: 36px;
    }
    &.accordion {
      display: inline-block;
      width: 95%;
      background-color: white;
    }
    .accordion2nd {
      display: none;
    }
    & > div {
      position: relative;
    }
  }
  .sub-question {
    display: flex;
    justify-content: flex-end;
  }
}
</style>