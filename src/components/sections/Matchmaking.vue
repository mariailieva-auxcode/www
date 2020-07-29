<template>
  <div class="container matchmaking">
    <div class="row title">
      <Title :title="match.title" :sectionTitle="match.subTitle" :isHomePage="true"></Title>
    </div>
    <div class="row">
      <div class="row col-xl-12 match-info-card">
        <div class="col-xl-6">
          <p>{{match.description}}</p>
          <button>
            {{match.button}}
            <img src="/assets/arrow-right-blue.png" />
          </button>
        </div>
        <div class="col-xl-6">
          <img :src="match.image" class="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../layout/Title";
export default {
  name: "Database",
  components: {
    Title,
  },
  props: {
    match: { default: {} },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.matchmaking {
  .row {
    button {
      width: 140px;
      height: 45px;
      border-radius: 10px;
      border: 2px solid #2783ff;
      background-color: white;
      margin-left: 40px;
      color: #2783ff;
    }
    .match-info-card {
      align-items: center;
    }
    p {
      text-align: center;
      font-size: 18px;
      color: #9597ac;
      margin-bottom: 50px;
      max-height: 130px;
      overflow: hidden;
      margin-left: 40px;
    }
  }
}
@media only screen and (max-width: 768px) {
  .col-sm-12 {
    .image {
      width: 100%;
    }
    padding: 0 !important;
    p {
      margin-top: 50px;
      margin-left: 0 !important;
      font-size: 15px;
    }
    button {
      margin-left: 0px !important;
    }
  }
}

@media only screen and (max-width: 1365px) {
  .match-info-card {
    display: flex;
    flex-direction: column-reverse;
    p {
      margin-top: 50px;
      margin-bottom: 35px !important;
    }
    .img {
      width: 100% !important;
    }
    button {
      p {
        margin: auto !important;
      }
    }
  }
}
</style>