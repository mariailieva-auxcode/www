<template>
  <div class="tools">
    <div class="row">
      <Title v-if="!isPreview" title="Tools" sectionTitle="03" :isHomePage="true"></Title>
    </div>
    <div class="row">
      <div class="col-6 text">
        <p>
          {{tools.description}}
        </p>
        <button>
          <p>
            Coming soon
            <img src="assets/arrow-right-blue.png" />
          </p>
        </button>
      </div>
      <div class="col-6">
        <img src="assets/solar-panels.png" />
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../layout/Title"
export default {
  name: "Tools",
  components: {
    Title
  },
  props: {
    tools: {default: {}}
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.tools {
  .row {
    max-width: 80%;
    h1 {
      margin: 150px 0 10px 80px;
    }
    .col-6 {
      p {
        text-align: center;
        font-size: 18px;
        color: #9597ac;
        margin-bottom: 50px;
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
        p {
          color: #2783ff;
          font-size: 14px;
          margin: auto 0;
        }
      }
    }
  }
}
</style>