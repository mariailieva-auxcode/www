<template>
  <div class="team">
    <div>
      <h1>Ons team</h1>
    </div>
    <div class="row yaml-links row" v-for="team of team" :key="team">
      <div class="col-3 picture">
        <img :src="team.picture" />
      </div>
      <div class="col-9">
        <div class="col-12 name">
          <h3>{{team.name}}</h3>
        </div>

        <div class="row">
          <div class="col-12 position">
            <p>{{team.position}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12 about">
            <p>{{team.about}}</p>
          </div>
        </div>
        <div class="row information">
          <div class="col-1">
            <img src="../../public/assets/envelope.png" />
          </div>
          <div class="col-6 email">
            <p>{{team.email}}</p>
          </div>
          <div class="col-5 linkedin">
            <div class="row">
              <img class="linkedin" src="../../public/assets/linked-in-blue.png" />
              <p class="email">Visit LinkedIn profile</p>
              <img class="arrow" src="../../public/assets/arrow-right-blue.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <img :src="'../../public/assets/foto-Thomas-Shaw.png'" /> -->
  </div>
</template>

<script>
import team from "js-yaml-loader!../../content/team.yaml";
export default {
  data() {
    return {
      name: "",
      position: "",
      about: "",
      team: team,
      email: ""
    };
  },

  mounted() {
    this.name = team.name;
    this.position = team.position;
    this.about = team.about;
    this.email = team.email;
  }
};
</script>


<style scoped lang="scss">
@import "../assets/styles/main.scss";
.team {
  max-width: 80%;
  h1 {
    text-align: left;
    margin-top: 150px;
    margin-left: 200px;
  }
  .yaml-links {
    margin-left: 250px;
    margin-bottom: 30px;
    margin-top: 100px;
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
    }
    .position {
      font-size: 16px;
      font-weight: bold;
      color: #9597ac;
    }
    .about {
      font-size: 16px;
      color: #9597ac;
    }
    .email {
      font-size: 14px;
      color: #5694e8;
    }
    .col-5 {
      .linkedin {
        width: 20px;
        height: 20px;
        margin-right: 10px;
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