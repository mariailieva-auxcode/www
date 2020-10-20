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
      @changedBoxColor="boxBackgroundColor($event)"
      @changedSavingCalc="changeSavingCalc($event)"
      @getPolygonArea="PolygonAreaOutput($event)"
    ></LeafMap>
    <div
      class="output-box"
      v-bind:style="{
        width: width2 + 'px',
        height: height2 + 'px',
        top: top2 + 'px',
        left: left2 + 'px',
      }"
    >
      <VueDragResize
        :isResizable="false"
        class="freeArea output-box"
        :class="freeAreaColorClass"
        :w="getWidth2()"
        :h="getHeight2()"
        :x="getLeft2()"
        :y="getTop2()"
        v-on:resizing="resize2"
        v-on:dragging="resize2"
      >
        <div class="row header-input-box">
          <div class="col-6 left-header">Advantages</div>
          <div class="col-6 right-header">
            <div class="minimize"></div>
            <img src="/assets/close.svg" />
          </div>
        </div>
        <div class="output-data">
          <div class="cash">
            <p class="description">You will earn</p>
            <p class="values">€ {{ cash }}</p>
            <h6 class="mounth">Per month</h6>
          </div>
          <div class="production">
            <p class="description">You will produce</p>
            <p class="values">{{ production }} kw/h</p>
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
    <div
      class="input-box"
      v-bind:style="{
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
      }"
    >
      <VueDragResize
        :isResizable="false"
        class="freeArea input-box"
        :class="freeAreaColorClass"
        :w="getWidth()"
        :h="getHeight()"
        :x="getLeft()"
        :y="getTop()"
        :minw="300"
        :minh="470"
        v-on:resizing="resize"
        v-on:dragging="resize"
        @activated="onActivated()"
      >
        <div class="row header-input-box">
          <div class="col-6 left-header">Site Information</div>
          <div class="col-6 right-header">
            <div class="minimize"></div>
            <img src="/assets/close.svg" />
          </div>
        </div>
        <div>
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
      width: 37,
      height: 63,
      top: 3,
      left: 10,
      width2: 38,
      height2: 55,
      top2: 10,
      left2: 100,
      squareMeters: 400,
      freeAreaColorClass: "",
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
    PolygonAreaOutput(e) {
      this.polygonArea = e.toFixed(2);
    },
    changeSavingCalc(newData) {
      this.cash = newData.totalNetRevenue.toFixed(2);
      this.production = newData.annualEnergy.toFixed(2);
      this.preventedCO = newData.CO2Saved.toFixed(2);
    },
    boxBackgroundColor(color) {
      if (color == "#F00") {
        this.freeAreaColorClass = "red-background";
      } else if (color == "#0F0") {
        this.freeAreaColorClass = "green-background";
      } else if (color == "#3388ff") {
        this.freeAreaColorClass = "blue-background";
      }
    },
    logout() {
      delete localStorage.token;
      this.$router.replace(`/${this.lang}`);
    },
    resize(newRect) {
      this.width = newRect.width / 10;
      this.height = newRect.height / 10;
      this.squareMeters = this.width * this.height;
      this.top = newRect.top / 10;
      this.left = newRect.left / 10;
    },
    resize2(newRect) {
      this.width2 = newRect.width / 10;
      this.height2 = newRect.height / 10;
      this.top2 = newRect.top / 10;
      this.left2 = newRect.left / 10;
    },

    getWidth() {
      return parseFloat(this.width || 0) * 10;
    },
    getHeight() {
      return parseFloat(this.height || 0) * 10;
    },
    getLeft() {
      return parseFloat(this.left || 0) * 10;
    },
    getTop() {
      return parseFloat(this.top || 0) * 10;
    },

    getWidth2() {
      return parseFloat(this.width2 || 0) * 10;
    },
    getHeight2() {
      return parseFloat(this.height2 || 0) * 10;
    },
    getLeft2() {
      return parseFloat(this.left2 || 0) * 10;
    },
    getTop2() {
      return parseFloat(this.top2 || 0) * 10;
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
</style>