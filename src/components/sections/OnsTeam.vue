<template>
  <div class="team">
    <div class="team-container">
      <Title :title="title" :sectionTitle="subTitle" :isHomePage="false"></Title>
    </div>
    <div class="row yaml-links row" v-for="person of team" :key="person.name">
      <div class="col-3 picture">
        <img :src="person.picture" />
      </div>
      <div class="col-9 team-card">
        <div class="col-12 name">
          <h3 class="team-name">{{person.name}}</h3>
        </div>

        <div class="row">
          <div class="col-12 position">
            <p>{{person.position}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 about">
            <p>{{person.about}}</p>
          </div>
        </div>
        <div class="row information">
          <div class="email">
            <img src="assets/envelope.svg" />
            <p>{{person.email}}</p>
          </div>
          <div class="linkedin">
            <img class="linkedin" src="assets/linkedin.svg" />
            <a :href="person.linkedIn" target="_blank" class="email">{{button}}</a>
            <img class="arrow" src="assets/arrow-right-blue.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team from "js-yaml-loader!../../../content/general/team.yaml";
import Title from "../layout/Title";
export default {
  components: {
    Title
  },
  data() {
    return {
      team: undefined,
      title: "",
      subTitle: "",
      button: ""
    };
  },

  mounted() {
    this.team = team.team;
    this.title = team.title;
    this.subTitle = team.subTitle;
    this.button = team.button;
  }
};
</script>


<style scoped lang="scss">
@import "../../assets/styles/main.scss";
.team {
  max-width: 80%;
  margin-bottom: 150px;
  margin-top: 180px;
  .team-container {
    margin-bottom: 70px;
  }
  h1 {
    text-align: left;
    margin-top: 150px;
    margin-left: 200px;
  }
  .team-card {
    padding-top: 25px;
  }
  h3.team-name {
    font-size: 20px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .yaml-links {
    margin-left: 250px;
    margin-bottom: 30px;
    box-shadow: 0px 0px 30px #1d226f1a;
    border-radius: 10px;
    text-align: left;
    .picture {
      padding-left: 0;
    }
  }
  .col-9 {
    .name {
      font-size: 18px;
      color: #26272e;
      font-weight: bold;
      font-family: $font__IBMbold;
    }
    .position {
      font-size: 16px;
      font-weight: bold;
      color: #9597ac;
      p {
        margin-bottom: 10px;
        font-family: $font__IBMbold;
      }
    }
    .about {
      font-size: 16px;
      line-height: 20px;
      color: #9597ac;
      font-family: $font__IBMmedium;
    }
    .email {
      font-size: 14px;
      color: #5694e8;
      font-family: $font__IBMmedium;
    }
    .col-5 {
      .linkedin {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        font-family: $font__IBMmedium;
      }
      .arrow {
        width: 12px;
        height: 12px;
        margin-left: 10px;
        margin-top: 5px;
      }
    }
  }
}
</style>