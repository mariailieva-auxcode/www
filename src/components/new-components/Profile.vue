<template>
  <div class="profile">
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
        <div class="row header-input-box">
          <div class="col-6 left-header">Advantages</div>
          <div class="col-6 right-header">
            <button @click="minimizeOutputBox = !minimizeOutputBox">
              <div class="minimize"></div>
            </button>
            <img src="/assets/close.svg" />
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
        <div class="row header-input-box">
          <div class="col-6 left-header">Site Information</div>
          <div class="col-6 right-header">
            <button @click="minimizeInputBox = !minimizeInputBox">
              <div class="minimize"></div>
            </button>
            <img src="/assets/close.svg" />
          </div>
        </div>
        <div :class="{ minimized: minimizeInputBox == true }">
          <p>What type of site do you have?</p>
          <div class="toggles">
            <button
              class="owner"
              :class="{ active: owner }"
              @click="(owner = !owner), (land = false), (water = false)"
            >
              <img src="/assets/roof.svg" />Roof
            </button>
            <button
              class="owner"
              :class="{ active: land }"
              @click="(land = !land), (owner = false), (water = false)"
            >
              <img src="/assets/land.svg" />Land
            </button>
            <button
              class="owner"
              :class="{ active: water }"
              @click="(water = !water), (owner = false), (land = false)"
            >
              <img src="/assets/water.svg" />Water
            </button>
          </div>
          <p>What type of energy do you want?</p>
          <h6>(You can select both)</h6>
          <div class="toggles">
            <button
              class="owner"
              :class="{ active: solar }"
              @click="solar = !solar"
            >
              <img src="/assets/solar.svg" />Solar
            </button>
            <button
              class="owner"
              :class="{ active: wind }"
              @click="wind = !wind"
            >
              <img src="/assets/wind.svg" />Wind
            </button>
          </div>
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
export default {
  name: "Profile",
  components: {
    LeafMap,
    VueDragResize,
  },
  data() {
    return {
      isSatteliteView: false,
      width: Number(370),
      height: {
        minimizeInputBox: false,
        height: Number(53),
      },
      top: Number(30),
      left: Number(100),
      width2: Number(380),
      height2: {
        minimizeOutputBox: false,
        height: Number(53),
      },
      top2: Number(100),
      left2: Number(1000),
      owner: false,
      land: false,
      water: false,
      solar: false,
      wind: false,
      sqM: "",
      cash: 0,
      production: 0,
      preventedCO: 0,
      polygonArea: "",
      minimizeInputBox: false,
      minimizeOutputBox: false,
      activatedInputBox: false,
      activatedOutputBox: false,
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
      } else if (e == "output") {
        this.activatedOutputBox = true;
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
      this.$router.replace(`/${this.lang}`);
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
.minimized {
  display: none;
}
</style>