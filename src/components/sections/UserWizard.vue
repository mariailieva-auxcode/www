<template>
  <div>
    <div class="header">
      <Authorization v-if="showAuth" @close="close()" :isLogin="false" :data="siteOwnerData"></Authorization>
      <p>{{welcomeText}}</p>
      <lazy-img class="img" :src="welcomeIcon" :blur="30" />
    </div>
    <div class="user-wizard">
      <div class="row questions-header">
        <router-link :to="`/${$router.history.current.params.lang}`">
          <p class="site">Enter a Site</p>
        </router-link>
        <p>{{headerCardText}}</p>
      </div>
      <div class="user-questions">
        <div class="step" v-if="step === 1">
          <div class="first-step container">
            <div class="row">
              <div class="col-12">
                <h2>{{welcomeLabel}}</h2>
                <button @click="step++" v-if="step === 1">
                  <span>{{startButton}}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="step map" v-if="step === 2">
          <div class="container">
            <div class="row">
              <div class="col-12 col-sm-12 col-md-12 col-xl-6">
                <div class="col-12">
                  <div class="information-icon map">
                    <h2>{{firstQuestion}}</h2>
                    <div class="hovered">
                      <img src="/assets/information-green-icon.svg" />
                      <p>{{infoIcon}}</p>
                    </div>
                  </div>
                  <p>Enter your postal code and street number or click on the map</p>
                </div>
                <div class="form-inputs form-inline">
                  <div class="input-group">
                    <input id="postal" v-model="postCode" type="text" required />
                    <span class="highlight"></span>
                    <label class="postal-style">Postal Code</label>
                  </div>
                  <div class="input-group">
                    <input id="street" v-model="streetNumber" type="text" required />
                    <span class="highlight"></span>
                    <label>Street Number</label>
                  </div>
                </div>
              </div>
              <div class="col-12 col-sm-12 col-md-12 col-xl-6 google-map">
                <div style="width: 100%">
                  <iframe
                    width="445px"
                    height="215px"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Amsterdam+(GreenAtlas)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="step" v-if="step === 3">
          <div class="container">
            <div class="information-icon">
              <h2>{{secondQuestion}}</h2>
              <div class="hovered">
                <img src="/assets/information-green-icon.svg" />
                <p>{{infoIcon2}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 roof-land-water">
                <button
                  class="owner"
                  :class="{'active': owner}"
                  @click="owner =!owner; filterCompanies()"
                >Owner</button>
                <button
                  class="legal"
                  :class="{'active': legal}"
                  @click="legal =!legal; filterCompanies()"
                >Legal representative</button>
              </div>
            </div>
          </div>
        </div>
        <div class="step" v-if="step === 4">
          <div class="container">
            <div class="information-icon">
              <h2>{{thirdQuestion}}</h2>
              <div class="hovered">
                <img src="/assets/information-green-icon.svg" />
                <p>{{infoIcon3}}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 roof-land-water">
                <button
                  class="roof"
                  :class="{'active': roof}"
                  @click="roof =!roof; filterCompanies()"
                >
                  <img src="/assets/roof.svg" />Roof
                </button>
                <button
                  class="land"
                  :class="{'active': land}"
                  @click="land =!land; filterCompanies()"
                >
                  <img src="/assets/land.svg" />Land
                </button>
                <button
                  class="water"
                  :class="{'active': water}"
                  @click="water =!water; filterCompanies()"
                >
                  <img src="/assets/water.svg" />Water
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="step" v-if="step === 5">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="information-icon">
                  <h2 for="size">{{fourthQuestion}}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{infoIcon4}}</p>
                  </div>
                </div>
                <div class="form-inputs form-inline form-size">
                  <div class="size" v-if="roof">
                    <h6>Roof</h6>
                    <input
                      id="phoneNumber"
                      placeholder="0"
                      type="number"
                      v-model.number="roofSize"
                      @input="filterCompanies"
                    />
                    <p>sq.m.</p>
                  </div>
                  <div class="size" v-if="land">
                    <h6>Land</h6>
                    <input
                      id="phoneNumber"
                      placeholder="0"
                      type="number"
                      v-model.number="landSize"
                      @input="filterCompanies"
                    />
                    <p>sq.m.</p>
                  </div>
                  <div class="size" v-if="water">
                    <h6>Water</h6>
                    <input
                      id="phoneNumber"
                      placeholder="0"
                      type="number"
                      v-model.number="waterSize"
                      @input="filterCompanies"
                    />
                    <p>sq.m.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="step" v-if="step === 6">
          <div class="container second-step">
            <div class="row">
              <div class="col-12">
                <div class="information-icon">
                  <h2>{{fifthQuestion}}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{infoIcon5}}</p>
                  </div>
                </div>

                <div class="solar-and-wind">
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
            </div>
          </div>
        </div>
        <div class="step step-6" v-if="step === 7">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="information-icon">
                  <h2>{{sixthQuestion}}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{infoIcon6}}</p>
                  </div>
                </div>
              </div>
              <div class="col-12 solar-and-wind">
                <button
                  class="hydrogen"
                  :class="{'active': hydrogen}"
                  @click="hydrogen =!hydrogen;"
                >Green hydrogen</button>
                <button
                  class="batteries"
                  :class="{'active': batteries}"
                  @click="batteries =!batteries;"
                >Batteries</button>
                <button class="WKO" :class="{'active': WKO}" @click="WKO =!WKO;">Large scale WKO</button>
              </div>
              <!-- <div class="col-6">
                <div class="form-inputs">
                  <div class="complete">
                    <div class="input-group">
                      <input type="email" v-model="companyName" />
                      <span class="highlight"></span>
                      <label>Company Name</label>
                    </div>
                    <div class="input-group">
                      <input type="text" v-model="name" />
                      <span class="highlight"></span>
                      <label>Name</label>
                    </div>
                    <div class="input-group">
                      <input type="number" v-model="phoneNumber" />
                      <span class="highlight"></span>
                      <label>Phone Number</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="account">
                  <button class="white">{{firstButton}}</button>
                  <p>{{firstDescription}}</p>
                  <button
                    @click="signUp()"
                    :style="{'cursor':isNextAllowed ? 'pointer':'not-allowed'}"
                    class="green"
                  >{{secondButton}}</button>
                  <p>{{secondDescription}}</p>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="row" v-if="step === 2">
          <p>1 of 6</p>
        </div>
        <div class="row" v-if="step === 3">
          <p>2 of 6</p>
        </div>
        <div class="row" v-if="step === 4">
          <p>3 of 6</p>
        </div>
        <div class="row" v-if="step === 5">
          <p>4 of 6</p>
        </div>
        <div class="row" v-if="step === 6">
          <p>5 of 6</p>
        </div>
        <div class="row" v-if="step === 7">
          <p>6 of 6</p>
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
          <div class="percent-line" v-if="step === 6">
            <div class="green-line5"></div>
            <div class="other-line5"></div>
          </div>
          <div class="percent-line" v-if="step === 7">
            <div class="green-line6"></div>
            <div class="other-line6"></div>
          </div>
          <a
            class="next-button"
            @click="nextStep()"
            :style="{'cursor':isNextAllowed ? 'pointer':'not-allowed'}"
            v-if="step !== 1 && step !== 7 "
          >
            <p>Continue</p>
            <img src="/assets/arrow-right-green.svg" />
          </a>

          <a
            class="next-button"
            @click="signUp()"
            :style="{'cursor':isNextAllowed ? 'pointer':'not-allowed'}"
            v-else-if="step === 7"
          >
            <p>Finish</p>
            <img src="/assets/arrow-right-green.svg" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Authorization from "../sections/Authorization";
import questionnaire from "js-yaml-loader!../../../content/nl/site-owner/questionnaire.yaml";
import questionnaireEn from "js-yaml-loader!../../../content/en/site-owner/questionnaire.yaml";
import axios from "../../axios";
export default {
  components: {
    Authorization,
  },
  data() {
    return {
      lang: "",
      welcomeLabel: "",
      welcomeText: "",
      welcomeIcon: "",
      startButton: "",
      headerCardText: "",
      firstQuestion: "",
      secondQuestion: "",
      thirdQuestion: "",
      fourthQuestion: "",
      fifthQuestion: "",
      sixthQuestion: "",
      infoIcon: "",
      infoIcon2: "",
      infoIcon3: "",
      infoIcon4: "",
      infoIcon5: "",
      infoIcon6: "",
      completeLabel: "",
      firstButton: "",
      firstDescription: "",
      secondButton: "",
      secondDescription: "",
      powerType: [],
      postCode: "",
      streetNumber: "",
      roofSize: undefined,
      landSize: undefined,
      waterSize: undefined,
      name: "",
      companyName: "",
      phoneNumber: "",
      material: [],
      step: 1,
      owner: false,
      legal: false,
      solar: false,
      wind: false,
      roof: false,
      land: false,
      water: false,
      hydrogen: false,
      batteries: false,
      WKO: false,
      showAuth: false,
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
  computed: {
    siteOwnerData() {
      return {
        energyType: {
          wind: this.wind,
          solar: this.solar,
        },
        siteType: {
          roof: this.roof,
          land: this.land,
          water: this.water,
        },
        relationship: {
          owner: this.owner,
          legal: this.legal,
        },
        roofSize: this.roofSize,
        landSize: this.landSize,
        waterSize: this.waterSize,
        postCode: this.postCode,
        streetNumber: this.streetNumber,
        companyName: this.companyName,
        name: this.name,
        phoneNumber: this.phoneNumber,
      };
    },
    isNextAllowed() {
      if (this.step == 6 && !this.wind && !this.solar) return false;
      if (this.step == 3 && !this.owner && !this.legal) return false;
      if (this.step == 4 && !this.roof && !this.water && !this.land)
        return false;
      if (this.step == 5 && !this.roofSize && !this.landSize && !this.waterSize)
        return false;
      if (
        (this.step == 2 && !this.postCode) ||
        (this.step == 2 && !this.streetNumber)
      )
        return false;
      if (this.step == 7 && !this.hydrogen && !this.batteries && !this.WKO)
        // if (
        //   this.step == 7 &&
        //   (!this.companyName || !this.name || !this.phoneNumber)
        // )
        return false;
      return true;
    },
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? questionnaireEn : questionnaire;
      this.welcomeText = data["welcome-header-text"];
      this.welcomeIcon = data["welcome-icon"];
      this.welcomeLabel = data["welcome-label"];
      this.startButton = data["start-button"];
      this.headerCardText = data["header-card-text"];
      this.firstQuestion = data["first-question"];
      this.secondQuestion = data["second-question"];
      this.thirdQuestion = data["third-question"];
      this.fourthQuestion = data["fourth-question"];
      this.fifthQuestion = data["fifth-question"];
      this.sixthQuestion = data["sixth-question"];
      this.completeLabel = data["complete-label"];
      this.firstButton = data["first-button"];
      this.firstDescription = data["first-description"];
      this.secondButton = data["second-button"];
      this.secondDescription = data["second-description"];
      this.infoIcon = data["info-icon-step-1"];
      this.infoIcon2 = data["info-icon-step-2"];
      this.infoIcon3 = data["info-icon-step-3"];
      this.infoIcon4 = data["info-icon-step-4"];
      this.infoIcon5 = data["info-icon-step-5"];
      this.infoIcon6 = data["info-icon-step-6"];
      this.submit();
    },
    filterCompanies() {
      this.filteredCompanies = this.companies.filter(
        (comp) =>
          comp.data.companyName
            .toLowerCase()
            .includes(this.companyName.toLowerCase()) &&
          (!this.wind || comp.data.energy.includes("Wind")) &&
          (!this.solar || comp.data.energy.includes("Solar")) &&
          (!this.roof || comp.data.material.includes("Roof")) &&
          (!this.land || comp.data.material.includes("Land")) &&
          (!this.water || comp.data.material.includes("Water")) &&
          (!this.size || parseInt(comp.data.size) <= this.size)
      );
      this.submit();
    },
    nextStep() {
      if (this.isNextAllowed) this.step++;
    },
    signUp() {
      if (this.isNextAllowed) this.showAuth = true;
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
        this.submit();
      });
    },
    close() {
      this.showAuth = false;
      this.$router.push(
        `/${this.$router.history.current.params.lang}/site-owner`
      );
    },
    submit() {
      this.$emit("change", this.filteredCompanies);
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/styles/components/questionnaire.scss";
@import "../../assets/styles/questionnaire-mobile.scss";
@import "../../assets/styles/main.scss";
.so-questionnaire {
  width: 80%;
  margin: 0 auto;
  .container {
    max-width: 992px;
  }
  .step-6 {
    .container {
      max-width: 768px;
    }
  }
  .account {
    max-width: 420px;
    align-items: center;
    p {
      font: 12px;
      color: #9597ac;
    }
    button {
      outline: none;
      border: 1px solid #55b364;
      border-radius: 10px;
      width: 305px;
      height: 46px;
      font-size: 14px;
      font-family: $font__IBM;
      font-weight: 700;
    }
    .white {
      background-color: transparent;
      color: #55b364;
    }
    .green {
      background-color: #55b364;
      color: #ffffff;
    }
  }
  .form-inputs {
    justify-content: center;
    margin: auto;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &.form-size {
      justify-content: center;
    }
    .size {
      position: relative;
      margin-right: 15px;
      h6 {
        font-size: 14px;
        font-weight: 700;
        color: #9597ac;
      }
      p {
        color: #55b364;
        font-family: $font__IBM;
        font-weight: 700;
        position: absolute;
        right: 10px;
        top: 35px;
      }
      input {
        height: 45px;
        width: 230px;
      }
    }
    input {
      outline: none;
      display: block;
      border-radius: 10px;
      border: 1px solid #d3d5e3;
      padding-left: 20px;
      font-size: 14px;
      font-family: $font__IBM;
      font-weight: 500;
      height: 45px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      color: #26272e;
      &:focus {
        border: 1px solid #55b364;
      }
    }
    .complete {
      flex-direction: column;
      input {
        width: 305px;
      }
    }
    #postal {
      margin-right: 25px;
    }
  }
  .header {
    padding-top: 50px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;

    p {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 40px;
      color: #26272e;
      margin: 0;
    }
    .img {
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
    background-color: white;
    .questions-header {
      position: relative;
      width: 100%;
      margin: 10px auto 60px;
      .site {
        position: absolute;
        font-size: 12px;
        left: 35px;
      }
      p {
        margin: 0 auto;
        color: #55b364;
        font-family: $font__IBM;
        font-weight: 500;
        font-size: 14px;
      }
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
          .col-12 > p {
            font-size: 12px;
            font-weight: 400;
          }
          .map-codes {
            display: flex;
            flex-direction: column;
            justify-content: center;
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
          span {
            font-family: $font__IBM;
            font-weight: 700;
            font-size: 14;
            color: white;
            margin: auto;
          }
        }
      }
      h2 {
        font-family: $font__IBM;
        font-weight: 700;
        font-size: 25px;
        color: #65687e;
      }
      p {
        margin-bottom: 20px;
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
      > .row {
        position: relative;
      }
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
          border-right: 60px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line {
          border-right: 300px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line2 {
          border-right: 120px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line2 {
          border-right: 240px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line3 {
          border-right: 180px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line3 {
          border-right: 180px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line4 {
          border-right: 240px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line4 {
          border-right: 120px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line5 {
          border-right: 300px solid #55b364;
          height: 10px;
          border-radius: 10px 0 0 10px;
        }
        .other-line5 {
          border-right: 60px solid #e6e7f4;
          height: 10px;
          border-radius: 0 10px 10px 0;
        }
        .green-line6 {
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
}
.button {
  display: flex;
  justify-content: center;
}
.solar,
.roof,
.land,
.water,
.wind,
.legal,
.owner,
.hydrogen,
.batteries,
.WKO {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #d3d5e3;
  background-color: white;
  outline: none;
  margin-right: 25px;
  color: #9597ac;
  font-weight: 700;
  img {
    margin-right: 8px;
  }
  &.active {
    border: 2px solid #55b364;
    color: #65687e;
  }
}
.legal {
  width: 185px;
}
</style>