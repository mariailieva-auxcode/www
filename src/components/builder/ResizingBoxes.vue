<template>
  <div>
    <router-link :to="`/news?lang=${$router.history.current.params.lang}`">Go to News</router-link>
    <div>
      <router-link :to="`/table?lang=${$router.history.current.params.lang}`">Go to Table</router-link>
    </div>
    <div v-bind:style="{ width: width + 'px', height: height + 'px'}">
      <VueDragResize
        class="freeArea"
        :isActive="true"
        :w="getWidth()"
        :h="getHeight()"
        v-on:resizing="resize"
        v-on:dragging="resize"
      >
        <p class="top">{{width}}m</p>
        <p class="left">{{height}}m</p>
        <p class="center">{{(width * height).toFixed(2)}}m2</p>
      </VueDragResize>
    </div>
    <div class="numberImput">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Top Meters</span>
        </div>
        <input type="number" class="form-control" aria-label="Area" v-model="width" />
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Left Meters</span>
        </div>
        <input type="number" class="form-control" aria-label="Area" v-model="height" />
      </div>

      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Square Meters</span>
        </div>
        <input
          type="number"
          class="form-control"
          aria-label="Area"
          v-model="squareMeters"
          @input="resizeArea"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
export default {
  components: {
    VueDragResize
  },
  data() {
    return {
      width: 20,
      height: 20,
      top: 0,
      left: 0,
      squareMeters: 400
    };
  },

  methods: {
    resize(newRect) {
      this.width = newRect.width / 10;
      this.height = newRect.height / 10;
      this.squareMeters = this.width * this.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    getWidth() {
      return parseFloat(this.width || 0) * 10;
    },
    getHeight() {
      return parseFloat(this.height || 0) * 10;
    },
    resizeArea() {
      const size = Math.sqrt(parseFloat(this.squareMeters || 0));
      this.width = size.toFixed(2);
      this.height = size.toFixed(2);
    }
  }
};
</script>

<style scoped>
div.freeArea {
  background-color: #00ff00;
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