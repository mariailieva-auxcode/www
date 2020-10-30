<template>
  <div class="profile">
    <div class="steps">
      <img src="/assets/logo.svg" />
      <p :class="finishedStep ? 'finished' : 'unfinished'">Step 1</p>
      <p :class="finishedStep2 ? 'finished' : 'unfinished'">Step 2</p>
      <p :class="finishedStep3 ? 'finished' : 'unfinished'">Step 3</p>
      <p :class="finishedStep4 ? 'finished' : 'unfinished'">Step 4</p>
      <p>Step 5</p>
    </div>
    <button class="logout-button" @click="logout()">Logout</button>
    <button
      class="change"
      @click="isSatteliteView = !isSatteliteView"
      v-if="isSatteliteView"
    >
      <img src="/assets/layer-map.png" />
    </button>
    <button
      class="change"
      @click="isSatteliteView = !isSatteliteView"
      v-if="!isSatteliteView"
    >
      <img src="/assets/layer-satellite.png" />
    </button>
    <LeafMap
      :isSatteliteView="isSatteliteView"
      @changedSavingCalc="changeSavingCalc($event)"
      @getPolygonArea="PolygonAreaOutput($event)"
    ></LeafMap>
    <div class="output-box">
      <VueDragResize
        @clicked="toggleActivated('output')"
        :class="activatedOutputBox ? 'active' : 'inactive'"
        class="freeArea output-box"
        v-bind:style="height2"
        :isResizable="false"
        :w="width2"
        :x="left2"
        :y="top2"
      >
        <div
          class="row header-input-box"
          @dblclick="minimizeOutputBox = !minimizeOutputBox"
        >
          <div class="col-6 left-header">Advantages</div>
          <div class="col-6 right-header">
            <button @click="minimizeOutputBox = !minimizeOutputBox">
              <div v-if="!minimizeOutputBox">▼</div>
              <div v-if="minimizeOutputBox">▲</div>
            </button>
          </div>
        </div>
        <div
          class="output-data"
          :class="{ minimized: minimizeOutputBox == true }"
        >
          <div class="cash">
            <p class="description">You will earn</p>
            <p class="values">{{ cash }} €</p>
            <h6 class="mounth">Per month</h6>
          </div>
          <div class="production">
            <p class="description">You will produce</p>
            <p class="values">{{ production }} kW/h</p>
            <h6 class="mounth">Per month</h6>
          </div>
          <div class="preventCO">
            <p class="description">You will save</p>
            <p class="values">{{ preventedCO }} kgCO2</p>
            <h6 class="mounth">Per month</h6>
          </div>
        </div>
      </VueDragResize>
    </div>
    <div class="additional-questions">
      <VueDragResize
        @clicked="toggleActivated('description')"
        :class="activatedDescriptionBox ? 'active' : 'inactive'"
        v-if="roof == true || land == true || water == true"
        class="freeArea output-box description-box"
        v-bind:style="height3"
        :isResizable="false"
        :h="height3"
        :w="width3"
        :x="left3"
        :y="top3"
      >
        <ProfileOnboarding
          @nextStep="steps++"
          @close="(land = false), (roof = false), (water = false)"
          @stepsColor="finishedStep = !finishedStep"
          :lang="lang"
        ></ProfileOnboarding>
      </VueDragResize>
    </div>
    <div class="input-box">
      <VueDragResize
        v-bind:style="height"
        :class="activatedInputBox ? 'active' : 'inactive'"
        :isResizable="false"
        class="freeArea input-box"
        :w="width"
        :x="left"
        :y="top"
        @activated="onActivated()"
        @clicked="toggleActivated('input')"
      >
        <div
          class="row header-input-box"
          @dblclick="minimizeInputBox = !minimizeInputBox"
        >
          <div class="col-6 left-header">Site Information</div>
          <div class="col-6 right-header">
            <button @click="minimizeInputBox = !minimizeInputBox">
              <div v-if="!minimizeInputBox">▼</div>
              <div v-if="minimizeInputBox">▲</div>
            </button>
          </div>
        </div>
        <div :class="{ minimized: minimizeInputBox == true }">
          <div v-if="steps === 1">
            <p>What type of site do you have?</p>
            <div class="toggles">
              <button
                class="roof"
                :class="{ active: roof }"
                @click="(roof = !roof), (land = false), (water = false)"
              >
                <img src="/assets/roof.svg" />Roof
              </button>
              <button
                class="land"
                :class="{ active: land }"
                @click="(land = !land), (roof = false), (water = false)"
              >
                <img src="/assets/land.svg" />Land
              </button>
              <button
                class="water"
                :class="{ active: water }"
                @click="(water = !water), (roof = false), (land = false)"
              >
                <img src="/assets/water.svg" />Water
              </button>
            </div>
          </div>
          <div v-if="steps === 2">
            <p>What type of energy do you want?</p>
            <h6>(You can select both)</h6>
            <div class="toggles">
              <button
                class="solar"
                :class="{ active: solar }"
                @click="
                  (solar = !solar), steps++, (finishedStep2 = !finishedStep2)
                "
              >
                <img src="/assets/solar.svg" />Solar
              </button>
              <button
                class="wind"
                :class="{ active: wind }"
                @click="
                  (wind = !wind), steps++, (finishedStep2 = !finishedStep2)
                "
              >
                <img src="/assets/wind.svg" />Wind
              </button>
            </div>
            <p>What is your goal</p>
            <div class="checkboxes">
              <input class="checkboxSize" type="checkbox" value="produce">
              <label> Produce </label>
              <input class="checkboxSize" type="checkbox" value="sell">
              <label> Sell </label>
            </div>
          </div>
          <!-- --------------------------------------------------------------------------------------------------- -->
          <div v-if="steps === 3">
            <label>Are you ...?</label>
            <div class="toggles hovered">  
              <button class="isOwner"
              :class="{ active: isOwner }"
               @click="(isOwner = !isOwner), steps++, (finishedStep3 = !finishedStep3), (isDev = false)">
              Owner
              </button>
              <p>If you are site owner please proceed to the next step.</p>
            </div> 
            <div class="toggles hovered">
            <a :href="`mailto:${' '}`">
              <button class="isDev"
              :class="{ active: isDev }">
              Developer
              </button>
              <p>If you are project developer please contact the site owner via email.</p>
            </a>
            </div>
          </div>
          <!-- START --------------------------------------------------------------------------------------------------- -->
          <div v-if="steps === 4">
            <label>Do you sell the land and/or water?</label>
            <div class="scroll-links marginBot">
              <p1>*Description*</p1>
              <router-link :to="`/${$router.history.current.params.lang}`" :v-scroll-to="'#FAQ'">
                <div class="active-green-line">Got questions?</div>
                </router-link>
            </div>
            <label>Do you rent the land and/or water?</label>
            <div class="scroll-links marginBot">
              <p1>*Description*</p1>
                <router-link :to="`/${$router.history.current.params.lang}`" v-scroll-to="'#FAQ'">
                  <div class="active-green-line">Got questions?</div>
                </router-link>
            </div>
          </div>
          <!-- ------------------------------------------------------------------------------------------------------- -->
          <div class="size">
            <p>What is the size of the site?</p>
            <input ref="input" placeholder="0 sq.m" type="number" />
            <input
              id="sqM"
              class="last-input"
              placeholder="0 sq.m"
              type="number"
              v-model="polygonArea"
            />
          </div>
        </div>
      </VueDragResize>
    </div>
  </div>
</template>

<script>
import LeafMap from "../builder/LeafMap";
import VueDragResize from "vue-drag-resize";
import ProfileOnboarding from "./ProfileOnboarding";
export default {
  name: "Profile",
  components: {
    LeafMap,
    VueDragResize,
    ProfileOnboarding,
  },
  data() {
    return {
      lang: "",
      isSatteliteView: false,
      width: Number(370),
      height: {
        minimizeInputBox: false,
        height: Number(53),
      },
      top: Number(40),
      left: Number(100),
      width2: Number(380),
      height2: {
        minimizeOutputBox: false,
        height: Number(53),
      },
      top2: Number(100),
      left2: Number(1000),
      width3: Number(300),
      height3: Number(400),
      top3: Number(100),
      left3: Number(500),
      roof: false,
      land: false,
      water: false,
      solar: false,
      wind: false,
      isOwner: false,
      isDev: false,
      sqM: "",
      cash: 0,
      production: 0,
      preventedCO: 0,
      polygonArea: "",
      minimizeInputBox: false,
      minimizeOutputBox: false,
      activatedInputBox: false,
      activatedOutputBox: false,
      activatedDescriptionBox: false,
      steps: 1,
      finishedStep: "",
      finishedStep2: "",
      finishedStep3: "",
      finishedStep4: "",
    };
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
      this.lang = this.$router.history.current.params.lang;
    },
    onActivated() {
      this.$refs["input"].focus();
    },
    toggleActivated(e) {
      if (e == "input") {
        this.activatedInputBox = true;
        this.activatedOutputBox = false;
        this.activatedDescriptionBox = false;
      } else if (e == "output") {
        this.activatedOutputBox = true;
        this.activatedInputBox = false;
        this.activatedDescriptionBox = false;
      } else if (e == "description") {
        this.activatedDescriptionBox = true;
        this.activatedOutputBox = false;
        this.activatedInputBox = false;
      }
    },
    PolygonAreaOutput(e) {
      this.polygonArea = e.toFixed(2);
    },
    changeSavingCalc(newData) {
      this.cash = newData.totalNetRevenue
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.production = newData.annualEnergy
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.preventedCO = newData.CO2Saved.toFixed(0).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
    },
    logout() {
      delete localStorage.token;
      delete localStorage.loggedUser;
      this.$router.replace(`/${this.lang}`);
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
.checkboxes{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
}
.checkboxSize{
  width: 50px;
  height: 30px;
}
.hovered{
   p {
                display: none;
                position: absolute;
                top: 30px;
                z-index: 2;
                width: 375px;
                left: 270px;
                padding: 15px;
                background-color: white;
                opacity: 0.9;
                border-radius: 10px;
                font-size: 12px;
                text-align: left;
                box-shadow: 0px 0px 30px #65687e33;
            }
            &:hover {
                p {
                    display: block;
                }
            }
}
.new-navigation {
  background: none;
  width: 170px;
  height: 100vh;
  z-index: 2;
  position: absolute;
  .scroll-links {
    margin-top: 75px;
    position: fixed;
    font-weight: 700;
    margin-left: 55px;
    display: flex;
    flex-direction: column;
    text-align: left;
    a {
      padding: 10px 0;
      position: relative;
      color: white;
      opacity: 0.6;
      outline: none;
      font-size: 14px;
      &.router-link-exact-active {
        opacity: 1;
        .active-green-line {
          display: block;
        }
      }
      &.inverted {
        color: #65687e;
      }
    }
  }
}
.marginBot{
  margin-bottom: 15px;
  margin-bottom: 15px;
}
</style>