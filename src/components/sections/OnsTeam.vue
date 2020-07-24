<template>
  <div class="team">
    <div class="team-container">
      <div class="team-title">
        <Title :title="title" :sectionTitle="subTitle" :isHomePage="false"></Title>
      </div>
    </div>
    <div class="row">
      <div class="yaml-links" v-for="person of team" :key="person.name">
        <div class="col-sm-12 col-md-5 col-lg-4 col-xl-3 col-12 picture">
          <img class="pic" :src="person.picture" />
          <img class="phone-only" :src="person.phonePicture" />
        </div>
        <div class="col-sm-12 col-lg-8 col-md-7 col-xl-9 col-12 team-card">
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
            <div class="email col-xl-6 col-md-12 col-lg-6 col-sm-12 col-12">
              <img src="/assets/envelope.svg" />
              <a>{{person.email}}</a>
            </div>
            <div class="linkedin col-xl-6 col-md-12 col-lg-6 col-sm-12 col-12">
              <img class="linkedin-image" src="/assets/linkedin.svg" />
              <a :href="person.linkedIn" target="_blank" class="linkedin-link">{{button}}</a>
              <img class="arrow" src="/assets/arrow-right-blue.png" />
            </div>
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
    Title,
  },
  data() {
    return {
      team: undefined,
      title: "",
      subTitle: "",
      button: "",
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
      this.team = data.team;
      this.title = data.title;
      this.subTitle = data.subTitle;
      this.button = data.button;
    },
  },
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
    text-align: left;
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
    display: flex;
    max-width: 875px;
    flex-wrap: wrap;
    margin: 0 auto;
    margin-bottom: 35px;
    box-shadow: 0px 0px 30px #1d226f1a;
    border-radius: 10px;
    .picture {
      max-width: 212px;
      padding: 0;
      .pic {
        max-width: 212px;
        max-height: 310px;
        border-radius: 10px 0 0 10px;
      }
      .phone-only {
        display: none;
        max-height: 152px;
        margin-top: 25px;
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
@media only screen and (min-width: 415px) and (max-width: 768px) {
  .team .yaml-links {
    width: calc(50% - 20px);
    margin-left: 10px;
    margin-right: 0;
    &:nth-child(odd) {
      margin-left: 0;
      margin-right: 10px;
    }
    .picture {
      display: flex;
      max-width: 152px;
      margin: 0 auto;
      padding-right: 0;
      .pic {
        display: none;
      }
      .phone-only {
        display: flex !important;
      }
    }
  }
}
.team {
  max-width: 100% !important;
  margin-left: 0;
  .row {
    padding: 0;
  }
}

.team-card {
  padding: 15px !important;
  max-width: 100% !important;
}
.information {
  flex-wrap: wrap;
  .email {
    padding-left: 0;
  }
  .linkedin {
    margin-left: -17px;
    justify-content: flex-start !important;
    margin-left: 0 !important;
  }
}

@media only screen and (max-width: 414px) {
  .team .yaml-links .picture {
    max-width: unset;
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

@media only screen and (min-width: 768px) and (max-width: 1200px) {
  .team-card {
    text-align: left;
  }
}

@media only screen and (min-width: 1200px) {
  .information {
    .linkedin {
      justify-content: flex-end !important;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .team {
    max-width: 100% !important;
    margin-left: 0;
    .row {
      margin-left: 20px;
      margin-right: 20px;
      padding: 0;
    }
  }
}
</style>