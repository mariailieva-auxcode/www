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
        <lazy-img class="image" :src="partner.logo" :blur="30" />
        <p>{{partner.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import partners from "@content/nl/general/partners.yaml";
import partnersEn from "@content/en/general/partners.yaml";
import Title from "@components/layout/Title";
export default {
  name: "Partners",
  components: {
    Title,
  },
  data() {
    return {
      partners: {},
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
      let data = this.lang === "en" ? partnersEn : partners;
      this.partners = data;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/main.scss";
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
    max-width: 34%;
    padding: 50px 30px 70px;
    p {
      color: #9597ac;
      font-size: 18px;
      line-height: 23px;
    }
    .image {
      margin-bottom: 40px;
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
@media only screen and(min-width:768px) {
  .partner {
    margin-right: 65px;
  }
}
</style>