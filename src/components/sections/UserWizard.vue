<template>
  <div>
    <div class="header">
      <Authorization
        v-if="showAuth"
        @close="close()"
        :isLogin="false"
        :data="siteOwnerData"
      ></Authorization>
      <p>{{ welcomeText }}</p>
      <lazy-img class="img" :src="welcomeIcon" :blur="30" />
    </div>
    <div class="user-wizard">
      <div class="row questions-header">
        <router-link
          :to="`/${$router.history.current.params.lang}`"
          v-if="step !== 8"
        >
          <p class="site">1.Enter a Site</p>
        </router-link>
        <p class="header-card-text">{{ headerCardText }}</p>
        <p v-if="step === 1" class="progressive-label">1 of 3</p>
        <div v-if="step === 1" class="progressive-bar">
          <div class="success-bar"></div>
          <div class="unsuccess-bar"></div>
        </div>
        <p v-if="step === 8" class="progressive-label">2 of 3</p>
        <div v-if="step === 8" class="progressive-bar">
          <a class="back-button" @click="step--" v-if="step === 8">
            <img src="/assets/arrow-left-white.svg" />
            <p>Back</p>
          </a>
          <div class="success-bar-2"></div>
          <div class="unsuccess-bar-2"></div>
        </div>
      </div>
      <div class="user-questions">
        <Step1 v-if="step === 1" @nextStep="step++"></Step1>
        <div class="step map" v-if="step === 2">
          <div class="container">
            <div class="row">
              <div class="col-12 col-sm-12 col-md-12 col-xl-6">
                <div class="col-12">
                  <div class="information-icon map">
                    <h2>{{ firstQuestion }}</h2>
                    <div class="hovered">
                      <img src="/assets/information-green-icon.svg" />
                      <p>{{ infoIcon }}</p>
                    </div>
                  </div>
                  <p>
                    Enter your postal code and street number or click on the map
                  </p>
                </div>
                <div class="form-inputs form-inline">
                  <div class="input-group">
                    <input
                      id="postal"
                      v-model="postCode"
                      type="text"
                      required
                    />
                    <span class="highlight"></span>
                    <label class="postal-style">Postal Code</label>
                  </div>
                  <div class="input-group">
                    <input
                      id="street"
                      v-model="streetNumber"
                      type="text"
                      required
                    />
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
              <h2>{{ secondQuestion }}</h2>
              <div class="hovered">
                <img src="/assets/information-green-icon.svg" />
                <p>{{ infoIcon2 }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 roof-land-water">
                <button
                  class="owner"
                  :class="{ active: owner }"
                  @click="
                    owner = !owner;
                    filterCompanies();
                  "
                >
                  Owner
                </button>
                <button
                  class="legal"
                  :class="{ active: legal }"
                  @click="
                    legal = !legal;
                    filterCompanies();
                  "
                >
                  Legal representative
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="step" v-if="step === 4">
          <div class="container">
            <div class="information-icon">
              <h2>{{ thirdQuestion }}</h2>
              <div class="hovered">
                <img src="/assets/information-green-icon.svg" />
                <p>{{ infoIcon3 }}</p>
              </div>
            </div>
            <div class="row">
              <div class="col-12 roof-land-water">
                <button
                  class="roof"
                  :class="{ active: roof }"
                  @click="
                    roof = !roof;
                    filterCompanies();
                  "
                >
                  <img src="/assets/roof.svg" />Roof
                </button>
                <button
                  class="land"
                  :class="{ active: land }"
                  @click="
                    land = !land;
                    filterCompanies();
                  "
                >
                  <img src="/assets/land.svg" />Land
                </button>
                <button
                  class="water"
                  :class="{ active: water }"
                  @click="
                    water = !water;
                    filterCompanies();
                  "
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
                  <h2 for="size">{{ fourthQuestion }}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{ infoIcon4 }}</p>
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
                  <h2>{{ fifthQuestion }}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{ infoIcon5 }}</p>
                  </div>
                </div>

                <div class="solar-and-wind">
                  <button
                    class="solar"
                    :class="{ active: solar }"
                    @click="
                      solar = !solar;
                      filterCompanies();
                    "
                  >
                    <img src="/assets/solar.svg" />Solar
                  </button>
                  <button
                    class="wind"
                    :class="{ active: wind }"
                    @click="
                      wind = !wind;
                      filterCompanies();
                    "
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
                  <h2>{{ sixthQuestion }}</h2>
                  <div class="hovered">
                    <img src="/assets/information-green-icon.svg" />
                    <p>{{ infoIcon6 }}</p>
                  </div>
                </div>
              </div>
              <div class="col-12 solar-and-wind">
                <button
                  class="hydrogen"
                  :class="{ active: hydrogen }"
                  @click="hydrogen = !hydrogen"
                >
                  Green hydrogen
                </button>
                <button
                  class="batteries"
                  :class="{ active: batteries }"
                  @click="batteries = !batteries"
                >
                  Batteries
                </button>
                <button
                  class="WKO"
                  :class="{ active: WKO }"
                  @click="WKO = !WKO"
                >
                  Large scale WKO
                </button>
              </div>
            </div>
          </div>
        </div>
        <FinalStep v-if="step === 8" @signUp="signUp()"></FinalStep>
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
            v-if="step !== 1 && step !== 6 && step !== 8"
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
            :style="{ cursor: isNextAllowed ? 'pointer' : 'not-allowed' }"
            v-if="step !== 1 && step !== 7 && step !== 8"
          >
            <p>Continue</p>
            <img src="/assets/arrow-right-green.svg" />
          </a>

          <a
            class="next-button"
            @click="nextStep()"
            :style="{ cursor: isNextAllowed ? 'pointer' : 'not-allowed' }"
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
import Step1 from "./UserWizardSteps/Step1";
import FinalStep from "./UserWizardSteps/FinalStep";
import questionnaire from "js-yaml-loader!../../../content/nl/site-owner/questionnaire.yaml";
import questionnaireEn from "js-yaml-loader!../../../content/en/site-owner/questionnaire.yaml";
import axios from "../../axios";
export default {
  components: {
    Authorization,
    Step1,
    FinalStep,
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
        postCode: this.postCode,
        streetNumber: this.streetNumber,
        relationship: {
          owner: this.owner,
          legal: this.legal,
        },
        siteType: {
          roof: this.roof,
          land: this.land,
          water: this.water,
        },
        roofSize: this.roofSize,
        landSize: this.landSize,
        waterSize: this.waterSize,
        energyType: {
          wind: this.wind,
          solar: this.solar,
        },
        emergingTechnologies: {
          hydrogen: this.hydrogen,
          batteries: this.batteries,
          WKO: this.WKO,
        },
        // companyName: this.companyName,
        // name: this.name,
        // phoneNumber: this.phoneNumber,
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
        .post("/.netlify/functions/siteOwner", {
          companyName: this.companyName,
          size: this.size,
          energy: this.energy,
          material: this.material,
        })
        .then((data) => (console.log(data), this.siteOwner.push(data.data)));
    },
    getCompanies() {
      axios.get(`/.netlify/functions/siteOwner`).then((data) => {
        this.companies = data.data.data;
        this.filteredCompanies = this.companies;
        this.submit();
      });
    },
    close() {
      this.showAuth = false;
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
@import "../../assets/styles/newmain.scss";
@import "../../assets/styles/components/user-wizard.scss";
</style>