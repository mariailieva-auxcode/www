<template>
  <div class="tools">
    <div class="row">
      <Title :title="tools.title" :sectionTitle="tools.subTitle" :isHomePage="true"></Title>
    </div>
    <div class="row iPad">
      <div class="col-sm-12 col-xl-6 col-6 text">
        <p>{{tools.description}}</p>
        <button>
          <p>
            {{tools.button}}
            <img src="assets/arrow-right-blue.png" />
          </p>
        </button>
      </div>
      <div class="col-sm-12 col-xl-6 col-6">
        <img :src="tools.image" class="tools-image" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../layout/Title";
export default {
  name: "Tools",
  components: {
    Title
  },
  props: {
    tools: { default: {} }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.tools {
  .row {
    max-width: 80%;
    .tools-image {
      border-radius: 15px;
      width: 100%;
    }
    h1 {
      margin: 150px 0 10px 80px;
    }
    .col-6 {
      p {
        text-align: center;
        font-size: 18px;
        color: #9597ac;
        margin-bottom: 50px;
        max-height: 130px;
        overflow: hidden;
        margin-right: 40px;
      }
    }
    .text {
      margin-top: auto;
      margin-bottom: auto;
      button {
        width: 140px;
        height: 45px;
        border-radius: 10px;
        border: 2px solid #2783ff;
        background-color: white;
        margin-right: 40px;
        p {
          color: #2783ff;
          font-size: 14px;
          margin: auto 0;
        }
      }
    }
  }
}
@media only screen and (max-width: 768px) {
  .iPad {
    flex-direction: column-reverse;
    .tools-image {
      margin-bottom: 50px;
    }
    .text {
      p {
        margin-right: 0 !important;
      }
      button {
        margin: 0 !important;
      }
    }
  }
}
</style>