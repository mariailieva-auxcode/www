<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="partners-title">
          <Title
            :title="partners.title"
            :sectionTitle="partners.subTitle"
            :isHomePage="false"
            :isCentered="false"
          ></Title>
        </div>
      </div>
    </div>
    <div class="row partners">
      <div
        class="col-sm-6 col-xl-3 col-3 partner"
        v-for="partner of partners.partners"
        :key="partner.name"
      >
        <img :src="partner.logo" />
        <p>{{partner.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import partners from "js-yaml-loader!../../../content/nl/general/partners.yaml";
import partnersEn from "js-yaml-loader!../../../content/en/general/partners.yaml";
import Title from "../layout/Title";
export default {
  name: "Partners",
  components: {
    Title
  },
  data() {
    return {
      partners: undefined
    };
  },
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
      let data = this.lang === "en" ? partnersEn : partners;
      this.partners = data;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.partners-title {
  margin-left: 20%;
}
.partners {
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
  margin-top: 60px !important;
  .partner {
    box-shadow: 0px 0px 30px #1d226f1a;
    border-radius: 15px;
    max-width: 25%;
    padding: 50px 30px 70px;

    margin-left: 25px;
    margin-right: 25px;
    p {
      color: #9597ac;
      font-size: 18px;
      line-height: 23px;
    }
    img {
      margin-bottom: 40px;
      height: 80px;
      width: 100%;
    }
  }
}

@media only screen and (max-width: 768px) {
  .partners-title {
    margin-left: 0;
  }
  .row {
    justify-content: space-around;
    display: flex;
    .partner {
      padding: 10px;
      min-width: 90%;
      margin-bottom: 50px;
      p {
        font-size: 14px;
      }
    }
  }
}
</style>