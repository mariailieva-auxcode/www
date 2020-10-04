<template>
  <div id="map" style="height: 100vh; width: 100vw"></div>
</template>

<script>
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import axios from "../../axios";
export default {
  name: "LeafMap",
  mounted() {
    this.createMap();
  },
  props: {
    isSatteliteView: { type: Boolean },
  },
  data() {
    return {
      zoom: 10,
      center: [52.3628434, 4.8443875],
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
  methods: {
    createMap() {
      this.map = L.map("map", {
        center: this.center,
        zoom: this.zoom,
      });

      this.map.on("pm:create", this.addSite);

      this.grayView = L.tileLayer(this.url, {
        attribution: this.attribution,
      });
      this.satteliteView = L.tileLayer(this.url2, {
        attribution: this.attribution2,
      });

      this.grayView.addTo(this.map);

      this.addDrawControls();
      this.getAndRenderPolygons();
    },
    addSite(newSite) {
      const ownerId = JSON.parse(localStorage.loggedUser).ownerId;
      if (!ownerId) return;

      const type = newSite.shape.toLowerCase();
      const coordinates = newSite.layer._latlngs[0].map((coordinate) => [
        coordinate.lat,
        coordinate.lng,
      ]);
      if (type == "polygon") {
        axios.post(`/.netlify/functions/coordinates`, {
          ownerId,
          coordinates,
          type,
        });
      }
    },
    addDrawControls() {
      this.map.pm.addControls({
        position: "topleft",
        drawCircle: false,
      });
    },
    getAndRenderPolygons() {
      const ownerId = JSON.parse(localStorage.loggedUser).ownerId;
      if (!ownerId) return;

      axios
        .get(`/.netlify/functions/coordinates?ownerId=${ownerId}`)
        .then((response) => {
          const sites = response.data.data;
          let lastSite;
          sites.forEach((site) => {
            if (site.data.type == "polygon")
              lastSite = L.polygon(site.data.coordinates, {
                color: site.data.color || "#3388ff",
              }).addTo(this.map);
          });

          this.map.fitBounds(lastSite.getBounds());
          console.log(sites);
        });
    },
  },
  watch: {
    isSatteliteView(isSattelite) {
      this.map.removeLayer(isSattelite ? this.grayView : this.satteliteView);
      this.map.addLayer(isSattelite ? this.satteliteView : this.grayView);
    },
  },
};
</script>

<style lang="scss">
</style>