<template>
  <div class="container our-story" id="our-story">
    <div class="story">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row style-card">
        <div class="col-12 col-sm-12 col-md-6 col-xl-6">
          <h2>{{leftHeaderText}}</h2>
          <h3>{{leftDescription}}</h3>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-xl-6">
          <h2>{{rightHeaderText}}</h2>
          <h3>{{rightDescription}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import story from "js-yaml-loader!../../../content/nl/general/story.yaml";
import storyEn from "js-yaml-loader!../../../content/en/general/story.yaml";
export default {
  name: "OurStory",
  data() {
    return {
      title: "",
      leftHeaderText: "",
      leftDescription: "",
      rightHeaderText: "",
      rightDescription: "",
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
      let data = this.lang === "en" ? storyEn : story;
      this.title = data.title;
      this.leftHeaderText = data["left-header-text"];
      this.leftDescription = data["left-description"];
      this.rightHeaderText = data["right-header-text"];
      this.rightDescription = data["right-description"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
.story {
  h1 {
    margin-bottom: 45px;
  }
  .style-card {
    padding: 65px 90px;
    h2 {
      font-family: $font__Lato;
      font-weight: 900;
      text-align: left;
      margin-bottom: 45px;
      font-size: 25px;
    }
  }
}
</style>