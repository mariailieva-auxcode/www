<template>
  <div class="container" id="team">
    <div class="team">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row">
        <div class="col-4">
          <p>Smart.</p>
          <p>Profesional.</p>
          <p>Motivated.</p>
        </div>
        <div class="col-4 info-team" v-for="member of team.team" :key="member.image">
          <img :src="member.image" />
          <h2>{{member.name}}</h2>
          <p>{{member.information}}</p>
          <div class="row">
            <img src="/assets/envelope.svg" />
            <img src="/assets/linkedin.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team from "js-yaml-loader!../../../content/nl/general/new-team.yaml";
import teamEn from "js-yaml-loader!../../../content/en/general/new-team.yaml";
export default {
  name: "Our Team",
  data() {
    return {
      team: {},
      title: "",
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
      let data = this.lang === "en" ? teamEn : team;
      this.team = data;
      this.title = data.title;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/newmain.scss";
</style>