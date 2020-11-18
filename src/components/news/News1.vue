<template>
  <div class="container-fluid">
    <div class="row news-text">
      <div class="col-sm-12 col-ml-4 col-xl-4 col-12 title">
        <Title :title="homeTitles.title" :sectionTitle="homeTitles.subTitle" :isHomePage="true"></Title>
      </div>
      <div class="col-sm-7 col-xl-5 col-12 description-size">
        <p>{{description}}</p>
      </div>
      <div class="col-sm-5 col-xl-3 col-12 link">
        <router-link :to="`/${$router.history.current.params.lang}/news`">
          <button>
            <p>
              {{button}}
              <img src="/assets/arrow-right-blue.png" />
            </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import info from "@content/nl/news.yaml";
import infoEn from "@content/en/news.yaml";
import Title from "@components/layout/Title";
export default {
  components: {
    Title,
  },
  data() {
    return {
      homeTitles: {},
      description: "",
      button: "",
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
      let news1 = this.lang === "en" ? infoEn : info;
      this.homeTitles = news1.homeTitles;
      this.description = news1.description;
      this.button = news1.button;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
.container-fluid {
  margin-bottom: 75px;
  .news-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    .title > h1 {
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

      width: 80%;
      float: right;
      text-align: left;
      margin-top: 30px;
    }
    .link button {
      padding-left: 15px;
      padding-right: 15px;
      height: 45px;
      border-radius: 10px;
      border: 2px solid #2783ff;
      background-color: white;
      p {
        margin: auto;
        font-size: 14px;
        color: #2783ff;
        width: 100%;
      }
    }
  }
}
</style>