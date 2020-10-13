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
      >
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
      width: 20,
      height: 50,
      top: 3,
      left: 10,
      width2: 20,
      height2: 20,
      top2: 30,
      left2: 100,
      squareMeters: 400,
      freeAreaColorClass: "",
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
    opacity: 0.4;
    &.input-box {
      background-color: #3388ff;
    }
    &.blue-background {
      background-color: #3388ff;
    }
    &.red-background {
      background-color: red;
    }
    &.green-background {
      background-color: green;
    }
  }
}
</style>