<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <Title v-if="!isPreview" title="Partners" sectionTitle="SECTION TITLE" :isHomePage="false" :isCentered="true"></Title>
      </div>
    </div>
    <div class="row partners">
      <div class="col-3 partner" v-for="partner of partners" :key="partner.name">
        <img :src="partner.logo" />
        <p>{{partner.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import partners from "js-yaml-loader!../../../content/partners.yaml";
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
  mounted() {
    this.partners = partners
  }
};
</script>

<style scoped lang="scss">
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

    margin-left: 25px;
    margin-right: 25px;
    img {
      margin-top: 60px;
      margin-bottom: 60px;
    }
  }
}
</style>