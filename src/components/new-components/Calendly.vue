<template>
  <div class="calendly">
    <p class="title">
      {{ calendly.title }}
    </p>
    <div class="calendly-contact">
      <a :href="calendly.url" target="_blank">
        <img class="icon" src="/assets/calendly.svg" />
        <p>{{ calendly.contact }}</p>
        <div class="green-button-arrow">
          <img src="/assets/arrow-right-white.png" />
        </div>
      </a>
    </div>
    <p class="description">
      {{ calendly.description }}
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
      calendly: {},
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
      this.calendly = data.calendly;
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
        font-weight: 700;
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
      width: 370px;
      margin: auto;
      border-radius: 10px;
    }
  }
  .calendly-contact > a {
    &:hover {
      text-decoration: none;
    }
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: white;
    width: 370px;
    height: 60px;
    margin: 0 auto;
    border-radius: 10px;
    margin-bottom: 20px;
    img {
      &.icon {
        width: 28px;
        margin-right: 25px;
        margin-left: 35px;
      }
    }
    p {
      margin: 0;
      color: #9597ac;
      font-size: 14px;
    }
    .green-button-arrow {
      justify-content: center;
      align-items: center;
      display: flex;
      position: absolute;
      right: -1px;
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
</style>