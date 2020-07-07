<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Title :title="partners.title" :sectionTitle="partners.subTitle" :isHomePage="false" :isCentered="true"></Title>
      </div>
    </div>
    <div class="row partners">
      <div class="col-3 partner" v-for="partner of partners.partners" :key="partner.name">
        <img :src="partner.logo" />
        <p>{{partner.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import partners from "js-yaml-loader!../../../content/general/partners.yaml";
import Title from "../layout/Title"
export default {
  name: "Partners",
  components: {
    Title
  },
  data() {
    return {
      partners: undefined
    }
  },
  created() {
    this.partners = partners
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/main.scss";
h1 {
  font-size: 45px;
  font-weight: bold;
  text-align: center;
  margin-top: 150px;
}
.partners {
  display: flex;
  justify-content: center;
  margin-bottom: 150px;
  .partner {
    box-shadow: 0px 0px 30px #1d226f1a;
    border-radius: 15px;
    max-width: 25%;
    padding: 50px 30px 70px;
    font-family: $font__IBMmedium;

    margin-left: 25px;
    margin-right: 25px;
    p {
      color: #9597AC;
      font-size: 18px;
      line-height: 23px;
    }
    img {
      margin-top: 60px;
      margin-bottom: 60px;
    }
  }
}
</style>