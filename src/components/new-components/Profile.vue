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
    <LeafMap :isSatteliteView="isSatteliteView"></LeafMap>
    <ResizingBoxes></ResizingBoxes>
    <div
      v-bind:style="{
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
      }"
    >
      <VueDragResize
        class="freeArea"
        :class="active ? 'active' : 'inactive'"
        :isActive="true"
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
    <!-- <div
      v-bind:style="{
        width: width + 'px',
        height: height + 'px',
      }"
    >
      <VueDragResize
        class="freeArea"
        :isActive="true"
        :w="getWidth2()"
        :h="getHeight2()"
        v-on:resizing="resize"
        v-on:dragging="resize"
      >
      </VueDragResize>
    </div> -->
  </div>
</template>

<script>
import LeafMap from "../builder/LeafMap";
import ResizingBoxes from "../builder/ResizingBoxes";
import VueDragResize from "vue-drag-resize";
export default {
  name: "Profile",
  components: {
    LeafMap,
    VueDragResize,
    ResizingBoxes,
  },
  data() {
    return {
      isSatteliteView: false,
      width: 20,
      height: 50,
      top: 3,
      left: 10,
      squareMeters: 400,
      active: false,
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
    // resizeArea() {
    //   const size = Math.sqrt(parseFloat(this.squareMeters || 0));
    //   this.width = size.toFixed(2);
    //   this.height = size.toFixed(2);
    // },
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
    background-color: white;
    border-radius: 15px;
    .inactive .vdr-stick {
      display: none;
    }
    .vdr.active:before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      outline: 1px dashed #d6d6d6;
    }
    .vdr-stick {
      position: absolute;
      font-size: 1px;
      background: #ffffff;
      border: 1px solid #6c6c6c;
      box-shadow: 0 0 2px #bbb;
    }
  }
  // .leaflet-control-scale-line:not(:first-child) {
  //   display: none;
  // }
}
</style>