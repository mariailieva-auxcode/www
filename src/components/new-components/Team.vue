<template>
  <div class="container" id="team">
    <div class="team">
      <div class="col-12">
        <h1>{{title}}</h1>
      </div>
      <div class="row team-content">
        <div class="col-4 team-labels">
          <h1>Smart.</h1>
          <h1 class="different-color">Profesional.</h1>
          <h1>Motivated.</h1>
        </div>
        <div
          class="col-12 col-sm-12 col-md-6 col-xl-4 team-info-card"
          v-for="member of team.team"
          :key="member.image"
        >
          <div class="style-card">
            <img class="member-image" :src="member.image" />
            <h2>{{member.name}}</h2>
            <p>{{member.information}}</p>
            <div class="row links">
              <img class="first-link" src="/assets/envelope.svg" />
              <img src="/assets/linkedin.svg" />
            </div>
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
.team {
  .team-content {
    display: flex;
    align-items: center;
    margin-top: 65px;
    h1 {
      font-size: 45px;
      margin: 0;
      color: #26272e;
      text-align: left;
      &.different-color {
        margin: 15px 0;
        color: #55b364;
      }
    }
    @media only screen and (max-width: 1200px) {
      .team-labels {
        display: none;
      }
    }
    .team-info-card {
      > .style-card {
        margin-bottom: 45px;
        padding: 50px 25px 30px;
      }
      .member-image {
        max-width: 200px;
        max-height: 200px;
        width: 100%;
      }
      h2 {
        color: #65687e;
        margin: 10px 0 15px;
      }
      .links {
        display: flex;
        justify-content: center;
        .first-link {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>