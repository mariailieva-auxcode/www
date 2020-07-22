<template>
  <div class="team">
    <div class="team-container">
      <div class="team-title">
        <Title :title="title" :sectionTitle="subTitle" :isHomePage="false"></Title>
      </div>
    </div>
    <div class="row yaml-links row" v-for="person of team" :key="person.name">
      <div class="col-sm-12 col-md-12 col-xl-3 col-12 picture">
        <img class="pic" :src="person.picture" />
        <img class="phone-only" :src="person.phonePicture" />
      </div>
      <div class="col-sm-12 col-md-12 col-xl-9 col-12 team-card">
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
          <div class="email col-xl-6 col-md-7 col-sm-12 col-12">
            <img src="/assets/envelope.svg" />
            <a>{{person.email}}</a>
          </div>
          <div class="linkedin col-xl-6 col-md-12 col-sm-12 col-12">
            <img class="linkedin-image" src="/assets/linkedin.svg" />
            <a :href="person.linkedIn" target="_blank" class="linkedin-link">{{button}}</a>
            <img class="arrow" src="/assets/arrow-right-blue.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import team from "js-yaml-loader!../../../content/nl/general/team.yaml";
import teamEn from "js-yaml-loader!../../../content/en/general/team.yaml";
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
  // watch: {} TODO (Milen) watch the lang prop
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
      let data = this.lang === "en" ? teamEn : team;
      this.team = data.team;
      this.title = data.title;
      this.subTitle = data.subTitle;
      this.button = data.button;
    }
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
    max-width: 90%;
  }
  h3.team-name {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: 700;
  }
  .yaml-links {
    margin-left: 100px;
    margin-bottom: 30px;
    box-shadow: 0px 0px 30px #1d226f1a;
    border-radius: 10px;
    text-align: left;
    .picture {
      padding-left: 0;
      .pic {
        max-width: 212px;
        max-height: 310px;
        border-radius: 10px 0 0 10px;
      }
      .phone-only {
        display: none;
      }
    }
  }
  .team-card {
    .name {
      font-size: 18px;
      color: #26272e;
      font-weight: 700;
    }
    .position {
      font-size: 16px;
      color: #9597ac;
      p {
        margin-bottom: 10px;
        font-weight: 700;
      }
    }
    .about {
      font-size: 16px;
      line-height: 20px;
      color: #9597ac;
    }
    .email {
      font-size: 14px;
      color: #5694e8;
      display: flex;
      align-items: center;
      width: 50%;
      a {
        margin-bottom: 0;
        margin-left: 15px;
      }
    }
    .linkedin {
      display: flex;
      align-items: center;
      width: 50%;
      justify-content: flex-end;
      padding: 0;
      .linkedin-link {
        font-size: 14px;
        color: #5694e8;
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
@media only screen and (max-width: 768px) {
  .team {
    max-width: 90%;
    margin-left: 0;
    .row {
      margin-left: 20px;
    }
  }

  .yaml-links {
    margin: none;
  }

  .team-card {
    max-width: 400px !important;
    padding-left: 10px !important;
  }
  .information {
    flex-wrap: wrap;
    .email {
      padding-left: 0;
    }
    .linkedin {
      margin-top: 20px;
      margin-left: -17px;
      justify-content: flex-start !important;
      margin-left: 0 !important;
    }
  }
}
// @media only screen and (max-width: 1366px) {
//   .team-card {
//     padding-left: 50px !important;
//     .information > .email {
//       padding: 0 !important;
//     }
//   }
// }

@media only screen and (max-width: 414px) {
  .picture {
    display: flex;
    justify-content: center;
    margin-left: 0 !important;
    padding-right: 0;
    .pic {
      display: none;
    }
    .phone-only {
      display: flex !important;
    }
  }
}

@media only screen and (min-width: 768px) {
  .yaml-links {
    margin-left: 20px !important;
  }
  .team-card {
    padding-left: 5px !important;
  }
  .information {
    .email {
      padding-left: 0;
    }
    .linkedin {
      justify-content: flex-start !important;
    }
  }
}

@media only screen and (min-width: 1200px) {
  .information {
    .linkedin {
      justify-content: flex-end !important;
    }
  }
}
</style>