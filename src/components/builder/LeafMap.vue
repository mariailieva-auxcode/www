<template>
  <div style="height: 100vh; width: 100vw">
    <editable-map
      :editable="true"
      ref="map"
      :zoom="zoom"
      :center="center"
      :options="{ attributionControl: false }"
      @draw:created="drawCreated"
      @draw:edited="drawEdited"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        v-if="changeLayers"
      ></l-tile-layer>
      <l-control-attribution
        position="bottomright"
        prefix=""
      ></l-control-attribution>
      <l-tile-layer
        :url="url2"
        :attribution="attribution2"
        v-if="!changeLayers"
      ></l-tile-layer>
      <l-draw-toolbar position="topleft"></l-draw-toolbar>
      <!-- <l-polygon
        v-for="(site, i) of coordinates"
        :key="i"
        :lat-lngs="site.coordinates"
      ></l-polygon> -->
      <editable-polygon
        v-for="(site, i) of coordinates"
        :key="i"
        @click="editPolygon(site)"
        :editable="editMode[site.ref['@ref'].id]"
        :lat-lngs="site.coordinates"
        :ref="site.ref['@ref'].id"
      />
      <l-control-scale position="bottomleft"></l-control-scale>
    </editable-map>
    <div class="coordinates">
      Coordinates:
      <span v-for="(coordinate, i) of coordinates" :key="i"
        >lat:{{ coordinate.lat }} lng:{{ coordinate.lng }}</span
      >
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { LTileLayer, LControlAttribution, LControlScale } from "vue2-leaflet";
import LDrawToolbar from "vue2-leaflet-draw-toolbar";
import { EditableMap, EditablePolygon } from "vue2-leaflet-editable";
import axios from "../../axios";
export default {
  name: "LeafMap",
  components: {
    LTileLayer,
    LControlAttribution,
    LDrawToolbar,
    LControlScale,
    EditablePolygon,
    EditableMap,
  },
  props: {
    changeLayers: { default: false, type: Boolean },
  },
  data() {
    return {
      zoom: 10,
      coordinates: [],
      bounds: null,
      editMode: {
        polygon: false,
      },
      center: L.latLng(52.3628434, 4.8443875),
      url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
      url2:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // marker: L.latLng(52.35479, 4.76387),
      attribution2:
        "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    };
  },
  created() {
    this.Drawers();
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    editPolygon(site) {
      const polygonId = site.ref["@ref"].id;
      this.editMode[polygonId] = !this.editMode[polygonId];
      const polygonEdit = this.$refs[polygonId][0];
      polygonEdit.toggleEdit();

      if (!this.editMode[polygonId]) {
        this.finishEditPolygon(site);
      }
    },
    finishEditPolygon(site) {
      axios.put("/.netlify/functions/coordinates", { data: site });
    },
    drawCreated(data) {
      if (!data || !data.layer || !data.layer._latlngs) return;
      const coordinates = data.layer._latlngs[0].map((site) => [
        site.lat,
        site.lng,
      ]);
      axios
        .post("/.netlify/functions/coordinates", {
          ownerId: JSON.parse(localStorage.loggedUser).ownerId,
          coordinates,
        })
        .then((data) => {
          this.coordinates.push({
            ref: data.ref,
            ...data.data,
          });
        });
    },
    centerUpdated(center) {
      this.center = center;
    },
    drawEdited(data) {
      Object.values(data.layers._layers).forEach((layer) => {
        // this.coordinates = layer._latlngs[0];
        axios.put("/.netlify/functions/coordinates", {
          oldCoordinates: this.coordinates,
          coordinates: layer._latlngs[0],
        });
      });
    },
    Drawers() {
      const ownerId = JSON.parse(localStorage.loggedUser).ownerId;
      axios
        .get(`/.netlify/functions/coordinates?ownerId=${ownerId}`)
        .then((data) => {
          this.coordinates = data.data.data.map((site) => ({
            ref: site.ref,
            ...site.data,
          }));
        });
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>

<style lang="scss">
.coordinates {
  position: absolute;
  display: flex;
  flex-direction: column;
  color: white;
  bottom: 50px;
  right: 50px;
  z-index: 401 !important;
}
</style>