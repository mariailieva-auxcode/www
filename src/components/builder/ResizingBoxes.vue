<template>
  <div>
    <div
      v-bind:style="{
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
      }"
    >
      <VueDragResize
        class="freeArea output-box"
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
import VueDragResize from "vue-drag-resize";
export default {
  components: {
    VueDragResize,
  },
  data() {
    return {
      width: 20,
      height: 20,
      top: 30,
      left: 100,
      squareMeters: 400,
    };
  },

  methods: {
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
    resizeArea() {
      const size = Math.sqrt(parseFloat(this.squareMeters || 0));
      this.width = size.toFixed(2);
      this.height = size.toFixed(2);
    },
  },
};
</script>

<style scoped lang="scss">
div.freeArea {
  &.output-box {
    background-color: white;
    opacity: 1;
  }
}
p.top {
  text-align: top;
}
p.left {
  margin-left: 5px;
  position: absolute;
  top: calc(50% - 12px);
}
p.center {
  position: absolute;
  top: 50%;
  left: calc(50% - 20px);
}
div.numberImput {
  width: 300px;
  position: absolute;
  right: 100px;
  top: 300px;
}
</style>