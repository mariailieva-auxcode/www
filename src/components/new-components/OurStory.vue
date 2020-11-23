<template>
  <div class="container our-story" id="our-story">
    <div class="story">
      <div class="col-12">
        <h1>{{ title }}</h1>
      </div>
      <div class="row style-card">
        <div class="col-12">
          <h2>{{ headerText }}</h2>
          <h3
            v-for="(description, index) of description.description"
            :key="index"
          >
            {{ description }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import story from "@content/nl/general/story.yaml";
import storyEn from "@content/en/general/story.yaml";
export default {
  name: "OurStory",
  data() {
    return {
      title: "",
      headerText: "",
      description: {},
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
      this.headerText = data["header-text"];
      this.description = data;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/newmain.scss";
.story {
  width: 875px;
  margin: 0 auto;
  h1 {
    margin-bottom: 45px;
  }
  .style-card {
    padding: 85px 205px;
    h2 {
      font-family: $font__Lato;
      font-weight: 900;
      text-align: center;
      margin-bottom: 30px;
      font-size: 25px;
      color: #65687e;
    }
    h3 {
      text-align: center;
    }
  }
}
</style>