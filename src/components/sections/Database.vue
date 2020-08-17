<template>
  <div class="database">
    <div class="row">
      <Title :title="database.title" :sectionTitle="database.subTitle" :isHomePage="true"></Title>
    </div>
    <div class="row phone-resolution">
      <div class="col-sm-12 col-xl-6 col-12">
        <lazy-img class="image" :src="database.image" :blur="30" />
      </div>
      <div class="col-sm-12 col-xl-6 col-12 text">
        <p>{{database.description}}</p>
        <button>
          <p>
            {{database.button}}
            <img src="/assets/arrow-right-blue.png" />
          </p>
        </button>
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
    database: { default: {} },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.database {
  .row {
    max-width: 80%;
    margin-bottom: 50px;
    h1 {
      margin: 0 0 80px 80px;
    }
    .text {
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
    .text {
      margin-top: auto;
      margin-bottom: auto;
      button {
        width: 140px;
        height: 45px;
        border-radius: 10px;
        border: 2px solid #2783ff;
        background-color: white;
        margin-left: 40px;
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
  .col-sm-12 {
    .image {
      width: 100%;
    }
    padding: 0 !important;
    p {
      margin-top: 50px;
      margin-left: 0 !important;
    }
    button {
      margin-left: 0px !important;
    }
  }
}

@media only screen and (max-width: 1200px) {
  p {
    margin-top: 50px;
    margin-bottom: 50px !important;
  }
  .image {
    width: 100%;
  }
  button {
    p {
      margin: auto !important;
    }
  }
}
</style>