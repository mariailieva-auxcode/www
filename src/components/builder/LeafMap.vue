<template>
  <l-map :zoom="zoom" :center="center">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <!-- <l-marker :lat-lng="marker"></l-marker> -->
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
  data() {
    return {
      zoom: 10,
      center: L.latLng(52.3628434, 4.8443875),
      url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //   marker: L.latLng(52.35479, 4.76387),
    };
  },
};
</script>

<style lang="scss">
</style>