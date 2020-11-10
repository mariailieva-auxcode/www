<template>
  <div class="calendly">
    <p class="title">
      {{ title }}
    </p>
    <div class="calendly-contact">
      <p>{{ contact }}</p>
      <a :href="url"
        ><button><img src="/assets/arrow-right-white.png" /></button
      ></a>
    </div>
    <p class="description">
      {{ description }}
    </p>
  </div>
</template>

<script>
import calendly from "js-yaml-loader!../../../content/nl/general/header.yaml";
import calendlyEn from "js-yaml-loader!../../../content/en/general/header.yaml";
export default {
  name: "Calendly",
  data() {
    return {
      title: "",
      contact: "",
      url: "",
      description: "",
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
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? calendlyEn : calendly;
      this.title = data["calendly-title"];
      this.contact = data["calendly-contact"];
      this.url = data["calendly-url"];
      this.description = data["calendly-description"];
    },
  },
};
</script>

<style lang="scss">
.calendly {
  p {
    color: white;
    &.title {
      font-size: 20px;
    }
    &.description {
      font-size: 12px;
      max-width: 570px;
      margin: auto;
    }
  }
  &.bottom-calendly {
    margin-bottom: 100px;
    margin-top: 150px;
    p {
      color: black;
      &.title {
        font-size: 25px;
      }
      &.description {
        font-size: 12px;
        max-width: 570px;
        margin: auto;
        color: #9597ac;
      }
    }
    .calendly-contact {
      box-shadow: 0px 6px 30px #1d226f1a;
    }
  }
  .calendly-contact {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
    width: 370px;
    height: 60px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 20px;
    p {
      margin: 0;
      color: #9597ac;
      font-size: 14px;
    }
    a {
      position: absolute;
      right: -1px;
      button {
        border-radius: 10px;
        background-color: #55b364;
        box-shadow: 0px 6px 30px #33333326;
        width: 93px;
        height: 60px;
        border: none;
        outline: none;
      }
    }
  }
}
</style>