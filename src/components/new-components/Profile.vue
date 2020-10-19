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
    ></LeafMap>
    <div
      v-bind:style="{
        width: width2 + 'px',
        height: height2 + 'px',
        top: top2 + 'px',
        left: left2 + 'px',
      }"
    >
      <VueDragResize
        class="freeArea input-box"
        :class="freeAreaColorClass"
        :w="getWidth2()"
        :h="getHeight2()"
        :x="getLeft2()"
        :y="getTop2()"
        v-on:resizing="resize2"
        v-on:dragging="resize2"
      >
        <p>You will earn</p>
        <p class="values">€{{ cash }}</p>
        <p class="mounth">Per month</p>
        <p>You will produce</p>
        <p class="values">{{ production }}kw/h</p>
        <p class="mounth">Per month</p>
        <p>You will save</p>
        <p class="values">{{ preventedCO }}kgCO2</p>
        <p class="mounth">Per month</p>

        <!-- <p class="top">{{ width }}m</p>
        <p class="left">{{ height }}m</p>
        <p class="center">{{ (width * height).toFixed(2) }}m2</p> -->
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
        class="freeArea input-box"
        :class="freeAreaColorClass"
        :w="getWidth()"
        :h="getHeight()"
        :x="getLeft()"
        :y="getTop()"
        v-on:resizing="resize"
        v-on:dragging="resize"
        @activated="onActivated()"
      >
        <p>What type of site do you have?</p>
        <p>(You can select more than one)</p>
        <div class="toggles">
          <button
            class="owner"
            :class="{ active: owner }"
            @click="owner = !owner"
          >
            <img src="/assets/roof.svg" />Roof
          </button>
          <button class="owner" :class="{ active: land }" @click="land = !land">
            <img src="/assets/land.svg" />Land
          </button>
          <button
            class="owner"
            :class="{ active: water }"
            @click="water = !water"
          >
            <img src="/assets/water.svg" />Water
          </button>
        </div>
        <p>What type of energy do you want?</p>
        <p>(You can select both)</p>
        <div class="toggles">
          <button
            class="owner"
            :class="{ active: solar }"
            @click="solar = !solar"
          >
            <img src="/assets/solar.svg" />Solar
          </button>
          <button class="owner" :class="{ active: wind }" @click="wind = !wind">
            <img src="/assets/wind.svg" />Wind
          </button>
        </div>
        <div class="size">
          <p>What is the size of the site?</p>
          <input id="sqM" placeholder="0 sq.m" type="number" ref="input" />
        </div>
        <!-- <p class="top">{{ width }}m</p>
        <p class="left">{{ height }}m</p>
        <p class="center">{{ (width * height).toFixed(2) }}m2</p> -->
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
      width: 30,
      height: 50,
      top: 3,
      left: 10,
      width2: 30,
      height2: 50,
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
.profile {
  height: 100vh;
  overflow-y: hidden;
  .logout-button {
    position: absolute;
    top: 0;
    right: 20px;
    z-index: 401;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 14px;
    justify-content: center;
    color: black;
    font-weight: 700;
    width: 148px;
    height: 46px;
    align-items: baseline;
    outline: none;
  }
  .change {
    z-index: 401;
    position: absolute;
    bottom: 50px;
    left: 50px;
    border: none;
    outline: none;
    background: unset;
    img {
      border: 2px solid white;
      border-radius: 10px;
    }
  }
  .freeArea {
    z-index: 401 !important;
    border-radius: 15px;
    &.input-box {
      background-color: white;
      p {
        text-align: center;
        color: black;
        margin: 0;
        &.mounth {
          color: #65687e;
        }
      }
      .values {
        font-size: 30px;
        color: #55b364;
      }
    }
    // &.blue-background {
    //   background-color: #3388ff;
    // }
    // &.red-background {
    //   background-color: red;
    // }
    // &.green-background {
    //   background-color: green;
    // }
    .active::before {
      content: none;
    }
    .toggles {
      padding-right: 30px;
      .owner {
        // max-width: 150px;
        width: 100%;
        max-height: 50px;
        border-radius: 10px;
        border: 2px solid #d3d5e3;
        background-color: white;
        outline: none;
        color: #9597ac;
        font-weight: 700;
        margin-top: 20px;
        margin-left: 15px;

        &.active {
          border: 2px solid #55b364;
          color: #65687e;
        }
      }
    }
    .size {
      padding-right: 30px;
      input {
        width: 100%;
        margin-left: 15px;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
      }
      // p {
      //   position: absolute;
      //   right: 30px;
      //   top: 10px;
      //   color: black;
      // }
    }
  }
}
#app {
  .vdr.active:before {
    content: none;
  }
}
</style>