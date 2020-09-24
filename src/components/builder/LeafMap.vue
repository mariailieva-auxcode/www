<template>
  <div style="height: 100vh; width: 100vw;">
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="{attributionControl: false}"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url" :attribution="attribution" v-if="changeLayers"></l-tile-layer>
      <l-control-attribution position="bottomright" prefix="A custom prefix"></l-control-attribution>
      <l-tile-layer :url="url2" :attribution="attribution2" v-if="!changeLayers"></l-tile-layer>
      <l-draw-toolbar position="topleft"></l-draw-toolbar>
    </l-map>
  </div>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LControlAttribution } from "vue2-leaflet";
import LDrawToolbar from "vue2-leaflet-draw-toolbar";
export default {
  name: "LeafMap",
  components: {
    LMap,
    LTileLayer,
    LControlAttribution,
    LDrawToolbar,
    // LMarker,
  },
  props: {
    changeLayers: { default: false, type: Boolean },
  },
  data() {
    return {
      zoom: 10,
      bounds: null,
      center: L.latLng(52.3628434, 4.8443875),
      url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      url2:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      // marker: L.latLng(52.35479, 4.76387),
      attribution2:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>

<style lang="scss">
</style>