<template>
  <div class="background-color">
    <div class="SOquestionnaire">
      <div class="header">
        <p>Welcome to greenatlas.earth!</p>
        <img src="/assets/hello-hand.svg" />
      </div>
      <div class="user-wizard">
        <div class="row questions-header" v-if="step !==6">
          <p>COMPLETE YOUR PROFILE</p>
        </div>
        <div class="user-questions">
          <div class="step" v-if="step === 1">
            <div class="first-step">
              <div class="row">
                <label>{{welcomeLabel}}</label>
              </div>
              <button @click="step++" v-if="step === 1">
                <p>Start</p>
              </button>
            </div>
          </div>
          <div class="step" v-if="step === 2">
            <div class="row">
              <label>{{firstQuestion}}</label>
            </div>
            <div class="row solar-and-wind">
              <button class="solar" :class="{'active': solar}" @click="solar =!solar">
                <img src="/assets/solar.svg" />Solar
              </button>
              <button class="wind" :class="{'active': wind}" @click="wind =!wind">
                <img src="/assets/wind.svg" />Wind
              </button>
            </div>
          </div>
          <div class="step" v-if="step === 3">
            <label>{{secondQuestion}}</label>
            <div class="row">
              <button class="solar" :class="{'active': roof}" @click="roof =!roof">
                <img src="/assets/roof.svg" />Roof
              </button>
              <button class="wind" :class="{'active': land}" @click="land =!land">
                <img src="/assets/land.svg" />Land
              </button>
              <button class="wind" :class="{'active': water}" @click="water =!water">
                <img src="/assets/water.svg" />Water
              </button>
            </div>
          </div>
          <div class="step" v-if="step === 4">
            <div class="row">
              <label for="phoneNumber">{{thirdQuestion}}</label>
            </div>
            <div class="row number">
              <input id="phoneNumber" placeholder="0" type="text" v-model="phoneNumber" />
            </div>
          </div>
          <div class="step map" v-if="step === 5">
            <div class="row">
              <div class="map-codes">
                <label>{{fourthQuestion}}</label>
                <div class="row row-codes">
                  <input id="postal" placeholder="Postal Code" type="text" />
                  <input id="street" placeholder="Street Number" type="text" />
                </div>
              </div>
              <div>
                <img src="/assets/map.png" />
              </div>
            </div>
          </div>
          <div class="step" v-if="step === 6">
            <div class="comlete">
              <div class="row">
                <img src="/assets/correct.svg" />
              </div>
              <div class="row">
                <label for="phoneNumber">{{completeLabel}}</label>
              </div>
            </div>
          </div>
        </div>
        <!-- buttons -->
        <div class="buttons">
          <div class="row" v-if="step === 2">
            <p>1 of 4</p>
          </div>
          <div class="row" v-if="step === 3">
            <p>2 of 4</p>
          </div>
          <div class="row" v-if="step === 4">
            <p>3 of 4</p>
          </div>
          <div class="row" v-if="step === 5">
            <p>4 of 4</p>
          </div>
          <div class="row">
            <a
              class="back-button"
              :class="step == 2 ? 'invisible' : ''"
              @click="step--"
              v-if="step !== 1 && step !==6"
            >
              <img src="/assets/arrow-left-white.svg" />
              <p>Back</p>
            </a>
            <a class="back-button" @click="step--" v-if="step === 6">
              <img src="/assets/arrow-left-white.svg" />
              <p>Edit</p>
            </a>
            <div class="percent-line" v-if="step === 2">
              <div class="green1-line"></div>
              <div class="other-line"></div>
            </div>
            <div class="percent-line" v-if="step === 3">
              <div class="green-line2"></div>
              <div class="other-line2"></div>
            </div>
            <div class="percent-line" v-if="step === 4">
              <div class="green-line3"></div>
              <div class="other-line3"></div>
            </div>
            <div class="percent-line" v-if="step === 5">
              <div class="green-line4"></div>
              <div class="other-line4"></div>
            </div>
            <a class="next-button" @click="step++" v-if="step !== 5 && step !== 1 && step !== 6">
              <p>Continue</p>
              <img src="/assets/arrow-right-green.svg" />
            </a>
            <a class="next-button" v-if="step === 6">
              <p>Review</p>
              <img src="/assets/arrow-right-green.svg" />
            </a>
            <a class="next-button" @click="step++" v-else-if="step === 5">
              <p>Finish</p>
              <img src="/assets/arrow-right-green.svg" />
            </a>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="table-wizard">
        <div class="row search-bar">
          <div class="col-6 table-header-input">
            <img src="/assets/table-filter.svg" />
            <input type="text" placeholder="Search..." />
          </div>
          <div class="col-6 table-header-menu">
            <p>Owner</p>
            <img src="/assets/arrow-down.svg" />
            <p>Energy Type</p>
            <img src="/assets/arrow-down.svg" />
            <p>Location</p>
            <img src="/assets/arrow-down.svg" />
            <p>Cost</p>
            <img src="/assets/arrow-down.svg" />
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Phone Number</th>
                <th>Energy</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in projectDev" :key="user">
                <td>{{user.data.companyName}}</td>
                <td>{{user.data.phoneNumber}}</td>
                <td>{{user.data.energy}}</td>
                <td>{{user.data.position}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import questionnaire from "js-yaml-loader!../../../../content/nl/site-owner/questionnaire.yaml";
import questionnaireEn from "js-yaml-loader!../../../../content/en/site-owner/questionnaire.yaml";
import axios from "../../../axios";
export default {
  data() {
    return {
      lang: "",
      welcomeLabel: "",
      firstQuestion: "",
      secondQuestion: "",
      thirdQuestion: "",
      fourthQuestion: "",
      completeLabel: "",
      companyName: "",
      powerType: [],
      phoneNumber: "",
      position: "Site owner",
      projectDev: [],
      step: 1,
      solar: false,
      wind: false,
      roof: false,
      land: false,
      water: false,
    };
  },
  created() {
    this.getProjectDev();
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? questionnaireEn : questionnaire;
      this.welcomeLabel = data["welcome-label"];
      this.firstQuestion = data["first-question"];
      this.secondQuestion = data["second-question"];
      this.thirdQuestion = data["third-question"];
      this.fourthQuestion = data["fourth-question"];
      this.completeLabel = data["complete-label"];
    },
    siteOwner() {
      axios
        .post("siteOwner", {
          companyName: this.companyName,
          phoneNumber: this.phoneNumber,
          energy: this.energy,
          position: this.position,
        })
        .then((data) => (console.log(data), this.siteOwner.push(data.data)));
    },
    getProjectDev() {
      axios.get(`siteOwner`).then((data) => {
        this.projectDev = data.data.data;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
.SOquestionnaire {
  width: 80%;
  margin: 0 auto;
  .header {
    margin-top: 45px;
    margin-bottom: 50px;
    display: flex;
    justify-content: flex-start;
    p {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 40px;
      color: #26272e;
    }
    img {
      height: 47.5px;
      margin-left: 25px;
    }
  }
  .user-wizard {
    margin-bottom: 25px;
    min-height: 385px;
    height: auto;
    box-shadow: 0px 6px 30px #1d226f0d;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    .questions-header {
      color: #55b364;
      font-family: $font__IBM;
      font-weight: 500;
      font-size: 14px;
      margin: 10px auto 60px;
    }
    .step {
      display: flex;
      justify-content: center;
      flex-direction: column;
      &.map {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .row {
          .map-codes {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 70px;
            .row-codes {
              margin: 0 auto;
              input {
                border-radius: 5px;
                border: 1px solid #d3d5e3;
                padding-left: 20px;
                font-size: 14px;
                font-family: $font__IBM;
                font-weight: 400;
                height: 45px;
                width: 140px;
              }
              #postal {
                margin-right: 25px;
              }
            }
          }
        }
      }
      .first-step {
        width: 60%;
        margin: 0 auto;
        button {
          border-radius: 10px;
          width: 150px;
          height: 45px;
          background-color: #55b364;
          outline: none;
          border: none;
          p {
            font-family: $font__IBM;
            font-weight: 700;
            font-size: 14;
            color: white;
            margin: auto;
          }
        }
      }
      .number {
        input {
          text-align: center;
        }
      }
      label {
        font-family: $font__IBM;
        font-weight: 700;
        font-size: 25px;
        color: #65687e;
        margin-bottom: 50px;
      }
      #companyName,
      #phoneNumber,
      #serviceValue {
        border-radius: 5px;
        border: 1px solid #d3d5e3;
        height: 45px;
        width: 300px;
      }
      #powerType {
        display: flex;
        align-items: center;
      }
      .choice {
        margin: 0;
        margin-right: 20px;
        margin-left: 5px;
      }
      .comlete {
        display: flex;
        flex-direction: column;
        margin-top: 100px;
        img {
          margin-bottom: 30px;
        }
      }
    }
    .buttons > .row {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: #d3d5e3;
        font-family: $font__IBM;
        font-weight: 700;
        font-size: 14px;
        margin: 0;
      }
    }
    .buttons {
      margin-top: auto;
      margin-bottom: 30px;
      .next-button {
        display: flex;
        margin-left: auto;
        margin-right: 45px;
        height: 35px;
        outline: none;
        cursor: pointer;
        img {
          margin-left: 12px;
        }
        p {
          color: #55b364;
          font-family: $font__IBM;
          font-weight: 700;
          font-size: 14px;
          margin: auto;
        }
      }
      .percent-line {
        display: flex;
        .green1-line {
          border-right: 90px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line {
          border-right: 270px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line2 {
          border-right: 180px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line2 {
          border-right: 180px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line3 {
          border-right: 270px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line3 {
          border-right: 90px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line4 {
          border-right: 360px solid #55b364;
          height: 10px;
          border-radius: 10px;
        }
        // .other-line4 {
        //   border-right: 180px solid #e6e7f4;
        //   height: 10px;
        //   border-radius: 0 10px 10px 0;
        // }
      }
      .back-button {
        display: flex;
        margin-right: auto;
        margin-left: 55px;
        outline: none;
        cursor: pointer;
        img {
          margin-right: 12px;
        }
        p {
          color: #9597ac;
          font-family: $font__IBM;
          font-weight: 700;
          font-size: 14px;
          margin: auto;
        }
      }
    }
  }
  .table-wizard {
    box-shadow: 0px 6px 30px #1d226f0d;
    padding: 15px 45px 30px;
    border-radius: 15px;
    .search-bar {
      display: flex;
      background-color: #fafafd;
      border-radius: 8px;
      height: 40px;
      margin-bottom: 25px;
      .table-header-input {
        padding: 0;
        display: flex;
        img {
          margin: auto 15px;
        }
        input {
          background-color: #fafafd;
          border: none;
          outline: none;
        }
      }
      .table-header-menu {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        p {
          margin: 0;
          margin-left: 25px;
        }
        img {
          margin-left: 6px;
        }
      }
    }
  }
}
.button {
  display: flex;
  justify-content: center;
}
.table {
  margin: 0 auto;
  width: 100%;
  th {
    border-top: none;
    border-bottom: 1px solid #f4f4f4;
  }
  td {
    border: none;
  }
}
.solar,
.wind {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #d3d5e3;
  background-color: white;
  outline: none;
  margin-right: 25px;
  color: #9597ac;
  img {
    margin-right: 8px;
  }
  &.active {
    border: 2px solid #55b364;
    color: #65687e;
  }
}
</style>