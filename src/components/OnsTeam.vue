<template>
  <div class="team">
    <div>
      <h1>Ons team</h1>
    </div>
    <div class="row yaml-links row" v-for="team of team" :key="team">
      <div class="col-3">
        <img :src="team.picture" />
      </div>
      <div class="col-9">
        <div class="col-12">
          <h3>{{team.name}}</h3>
        </div>

        <div class="row">
          <div class="col-12">
            <p>{{team.position}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p>{{team.about}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col-1">
            <img src="../../public/assets/envelope.png" />
          </div>
          <div class="col-11">
            <p>{{team.email}}</p>
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
    this.email - team.email;
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
  }
}
</style>