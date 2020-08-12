<template>
  <div class="background-color">
    <div class="SOquestionnaire">
      <div class="header">
        <p>Welcome to greenatlas.earth!</p>
        <img src="/assets/hello-hand.svg" />
      </div>
      <div class="user-wizard">
        <div class="row questions-header" v-if="step !== 6">
          <p>COMPLETE ONBOARDING</p>
        </div>
        <div class="user-questions">
          <div class="step" v-if="step === 1">
            <div class="first-step container">
              <div class="row">
                <div class="col-12">
                  <label>{{welcomeLabel}}</label>
                  <button @click="step++" v-if="step === 1">
                    <p>Start</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- TODO (Misho) to make the rest of the steps with grid -->
          <div class="step" v-if="step === 2">
            <div class="row">
              <label>{{firstQuestion}}</label>
            </div>
            <div class="row solar-and-wind">
              <button
                class="solar"
                :class="{'active': solar}"
                @click="solar =!solar;  filterCompanies()"
              >
                <img src="/assets/solar.svg" />Solar
              </button>
              <button
                class="wind"
                :class="{'active': wind}"
                @click="wind =!wind; filterCompanies()"
              >
                <img src="/assets/wind.svg" />Wind
              </button>
            </div>
          </div>
          <div class="step" v-if="step === 3">
            <label>{{secondQuestion}}</label>
            <div class="row">
              <button
                class="solar"
                :class="{'active': roof}"
                @click="roof =!roof; filterCompanies()"
              >
                <img src="/assets/roof.svg" />Roof
              </button>
              <button
                class="wind"
                :class="{'active': land}"
                @click="land =!land; filterCompanies()"
              >
                <img src="/assets/land.svg" />Land
              </button>
              <button
                class="wind"
                :class="{'active': water}"
                @click="water =!water; filterCompanies()"
              >
                <img src="/assets/water.svg" />Water
              </button>
            </div>
          </div>
          <div class="step" v-if="step === 4">
            <div class="row">
              <label for="size">{{thirdQuestion}}</label>
            </div>
            <div class="row number">
              <!-- TODO (Misho) make the input begin typing from the left -->
              <input
                id="phoneNumber"
                class="size-input"
                placeholder="0"
                type="number"
                v-model="size"
                @input="filterCompanies"
              />
            </div>
          </div>
          <div class="step map" v-if="step === 5">
            <div class="row">
              <div class="map-codes">
                <label>{{fourthQuestion}}</label>
                <div class="row form-inputs form-inline">
                  <!-- TODO (Misho) these buttons must not have width when they are part of the grid -->
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
            <!-- TODO (Misho) make the container smaller on steps where you have other than col-12 -->
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <!-- TODO (Misho) replace all <label> with the right heading, <label> is used on forms where it describes the input -->
                  <label>{{completeLabel}}</label>
                </div>
                <div class="col-6">
                  <div class="form-inputs">
                    <input type="email" placeholder="Company Name" />
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Phone Number" />
                  </div>
                </div>
                <div class="col-6">
                  Register 
                </div>
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
              <p>Back</p>
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
            <a
              class="next-button"
              @click="nextStep()"
              v-if="step !== 5 && step !== 1 && step !== 6"
            >
              <p>Continue</p>
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
          <!-- TODO (Misho) remove the search bar -->
          <div class="col-5 table-header-input">
            <img src="/assets/table-filter.svg" />
            <input
              type="text"
              placeholder="Search..."
              v-model="companyNameSearch"
              @input="filterCompanies"
            />
          </div>
          <div class="col-7 table-header-menu">
            <p>Company name</p>
            <img src="/assets/arrow-down.svg" />
            <p>Energy Type</p>
            <img src="/assets/arrow-down.svg" />
            <p>Material Type</p>
            <img src="/assets/arrow-down.svg" />
            <p>Size</p>
            <img src="/assets/arrow-down.svg" />
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Energy Type</th>
                <th>Material Type</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredCompanies" :key="user">
                <td>
                  <p>{{user.data.companyName}}</p>
                </td>
                <td>
                  <img src="/assets/wind.svg" v-if="user.data.energy.includes('Wind')" />
                  <img src="/assets/solar.svg" v-if="user.data.energy.includes('Solar')" />
                </td>
                <td>
                  <img src="/assets/roof.svg" v-if="user.data.material.includes('Roof')" />
                  <img src="/assets/land.svg" v-if="user.data.material.includes('Land')" />
                  <img src="/assets/water.svg" v-if="user.data.material.includes('Water')" />
                </td>
                <td>
                  <p>{{user.data.size}}</p>
                </td>
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
      companyNameSearch: "",
      powerType: [],
      size: undefined,
      material: [],
      companies: [],
      filteredCompanies: [],
      step: 1,
      solar: false,
      wind: false,
      roof: false,
      land: false,
      water: false,
    };
  },
  created() {
    this.getCompanies();
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
    filterCompanies() {
      this.filteredCompanies = this.companies.filter(
        (comp) =>
          comp.data.companyName
            .toLowerCase()
            .includes(this.companyNameSearch.toLowerCase()) &&
          (!this.wind || comp.data.energy.includes("Wind")) &&
          (!this.solar || comp.data.energy.includes("Solar")) &&
          (!this.roof || comp.data.material.includes("Roof")) &&
          (!this.land || comp.data.material.includes("Land")) &&
          (!this.water || comp.data.material.includes("Water")) &&
          (!this.size || parseInt(comp.data.size) <= this.size)
      );
      if (this.wind) this.filteredCompanies;
    },
    nextStep() {
      if (this.step == 2 && !this.wind && !this.solar) return;
      if (this.step == 3 && !this.roof && !this.water && !this.land) return;
      if (this.step == 4 && !this.size) return;
      this.step++;
    },
    siteOwner() {
      axios
        .post("siteOwner", {
          companyName: this.companyName,
          size: this.size,
          energy: this.energy,
          material: this.material,
        })
        .then((data) => (console.log(data), this.siteOwner.push(data.data)));
    },
    getCompanies() {
      axios.get(`siteOwner`).then((data) => {
        this.companies = data.data.data;
        this.filteredCompanies = this.companies;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
.size-input {
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
}
.SOquestionnaire {
  width: 80%;
  margin: 0 auto;
  .form-inputs {
    margin: 0 auto;
    input {
      display: block;
      border-radius: 5px;
      border: 1px solid #d3d5e3;
      padding-left: 20px;
      font-size: 14px;
      font-family: $font__IBM;
      font-weight: 400;
      height: 45px;
    }
    #postal {
      margin-right: 25px;
    }
    &.form-inline {
      input {
        display: inline-block;
      }
    }
  }
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
    font-family: $font__IBM;
    font-weight: 700;
    font-size: 14px;
    color: #333333;
  }
  td {
    border: none;
    p {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 12px;
      color: #9597ac;
    }
    img {
      margin-right: 10px;
    }
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