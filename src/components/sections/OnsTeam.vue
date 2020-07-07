<template>
  <div class="team">
    <div class="team-container">
      <div class="team-title">
        <Title :title="title" :sectionTitle="subTitle" :isHomePage="false"></Title>
      </div>
    </div>
    <div class="row yaml-links row" v-for="person of team" :key="person.name">
      <div class="col-3 picture">
        <img :src="person.picture" />
      </div>
      <div class="col-9 team-card">
        <div class="team-content">
          <div class="name">
            <h3 class="team-name">{{person.name}}</h3>
          </div>

          <div class="position">
            <p>{{person.position}}</p>
          </div>
          <div class="about">
            <p>{{person.about}}</p>
          </div>
        </div>
        <div class="information">
          <div class="email">
            <img src="assets/envelope.svg" />
            <p>{{person.email}}</p>
          </div>
          <div class="linkedin">
            <img class="linkedin-image" src="assets/linkedin.svg" />
            <a :href="person.linkedIn" target="_blank" class="linkedin-link">{{button}}</a>
            <img class="arrow" src="assets/arrow-right-blue.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team from "js-yaml-loader!../../../content-nl/general/team.yaml";
import teamEn from "js-yaml-loader!../../../content-en/general/team.yaml";
import Title from "../layout/Title";
export default {
  components: {
    Title
  },
  data() {
    return {
      team: undefined,
      teamEn: undefined,
      title: "",
      subTitle: "",
      button: ""
    };
  },
  // watch: {} TODO (Milen) watch the lang prop
  mounted() {
    // this.team = team[lang].team; TODO (Milen)
    this.team = team.team;
    this.title = team.title;
    this.subTitle = team.subTitle;
    this.button = team.button;

    this.teamEn = teamEn.team;
    this.title = teamEn.title;
    this.subTitle = teamEn.subTitle;
    this.button = teamEn.button;
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

    .team-title {
      margin-left: 100px;
    }
  }
  .information {
    display: flex;
  }
  h1 {
    text-align: left;
    margin-top: 150px;
    margin-left: 200px;
  }
  .team-card {
    padding-top: 25px;
    padding-left: 22px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      display: flex;
      align-items: center;
      width: 50%;
      p {
        margin-bottom: 0;
        margin-left: 15px;
      }
    }
    .linkedin {
      font-family: $font__IBMmedium;
      display: flex;
      align-items: center;
      width: 50%;
      justify-content: flex-end;
      .linkedin-link {
        font-size: 14px;
        color: #5694e8;
        font-family: $font__IBMmedium;
      }
      img {
        margin-right: 15px;
      }
      p {
        margin-right: 10px;
      }
    }
    .arrow {
      width: 12px;
      height: 12px;
      margin-left: 10px;
      margin-top: 5px;
    }
  }
}
</style>