<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution" v-if="changeLayers"></l-tile-layer>
    <l-tile-layer :url="url2" :attribution="attribution" v-if="!changeLayers"></l-tile-layer>
  </l-map>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer } from "vue2-leaflet";
export default {
  name: "LeafMap",
  components: {
    LMap,
    LTileLayer,
    // LMarker,
  },
  props: {
    changeLayers: { default: false, type: Boolean },
  },
  data() {
    return {
      zoom: 10,
      center: L.latLng(52.3628434, 4.8443875),
      url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      url2:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(52.35479, 4.76387),
    };
  },
};
</script>

<style lang="scss">
</style>