<template>
  <div class="container-fluid">
    <div class="row news-text">
      <div class="col-sm-12 col-ml-4 col-xl-4 col-2">
        <Title
          :title="data.homeTitles.title"
          :sectionTitle="data.homeTitles.subTitle"
          :isHomePage="true"
        ></Title>
      </div>
      <div class="col-sm-7 col-xl-5 col-5">
        <p>{{data.description}}</p>
      </div>
      <div class="col-sm-5 col-xl-3 col-3">
        <router-link :to="`/news?lang=${$router.history.current.query.lang}`">
          <button>
            <p>
              {{data.button}}
              <img src="assets/arrow-right-blue.png" />
            </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../../content/nl/news.yaml";
import infoEn from "js-yaml-loader!../../../content/en/news.yaml";
import Title from "../layout/Title";
export default {
  components: {
    Title
  },
  data() {
    return {
      data: {}
    };
  },
  // created() {
  //   this.data = info;
  //   this.data = infoEn;
  // },
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
      let news1 = this.lang === "en" ? infoEn : info;
      this.data = news1;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.container-fluid {
  margin-bottom: 75px;
  .news-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    .col-2 > h1 {
      font-size: 45px;
      color: #393a4d;
      font-weight: bold;
    }
    .col-7 {
      max-width: 60%;
    }
    p {
      color: #9597ac;
      font-size: 18px;
      font-family: $font__IBMmedium;
      font-weight: 500;

      width: 80%;
      float: right;
      text-align: left;
      margin-top: 30px;
    }
    .col-3 button {
      padding-left: 15px;
      padding-right: 15px;
      height: 45px;
      border-radius: 10px;
      border: 2px solid #2783ff;
      background-color: white;
      p {
        margin: auto;
        font-size: 14px;
        font-family: $font__IBMmedium;
        font-weight: 500;
        color: #2783ff;
        width: 100%;
      }
    }
  }
}
</style>