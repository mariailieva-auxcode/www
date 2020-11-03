<template>
  <div id="map" style="height: 100vh; width: 100vw"></div>
</template>

<script>
import L from "leaflet";
import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import * as turf from "@turf/turf";
import axios from "../../axios";
export default {
  name: "LeafMap",
  mounted() {
    this.createMap();
  },
  props: {
    isSatteliteView: { type: Boolean },
    showCadasters: { type: Boolean },
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
      maxZoom: 20,
      minZoom: "",
    };
  },
  methods: {
    createMap() {
      this.map = L.map("map", {
        center: this.center,
        zoom: this.zoom,
        minZoom: this.minZoom,
      });
      this.map.on("pm:create", this.addSite);

      L.control.scale().addTo(this.map);

      this.grayView = L.tileLayer(this.url, {
        attribution: this.attribution,
        maxZoom: this.maxZoom,
      });
      this.satteliteView = L.tileLayer(this.url2, {
        attribution: this.attribution2,
        maxZoom: this.maxZoom,
      });

      this.grayView.addTo(this.map);

      this.addDrawControls();
      this.getAndRenderPolygons();
    },
    getCadasters() {
      axios.get(`/.netlify/functions/perceels`).then((response) => {
        let cadasters = response.data.data;
        let lastCadaster;
        cadasters.forEach((cadaster) => {
          let id = `${cadaster.data.properties.sectie}-${cadaster.data.properties.perceelnummer}-${cadaster.data.properties["kadastraleAanduiding|TypeKadastraleAanduiding|aKRKadastraleGemeenteCode|AKRKadastraleGemeenteCode|waarde"]}`;
          lastCadaster = L.polygon(
            cadaster.data.geometry.coordinates[0].map((cord) => cord.reverse()),
            {
              color: "purple",
            }
          ).addTo(this.map);
          lastCadaster.options.isCadaster = true;
          lastCadaster.on("click", (e) => this.cadasterPopup(e, id));
        });
        if (!lastCadaster) return;
        this.map.fitBounds(lastCadaster.getBounds());
      });
    },
    cadasterPopup(e, id) {
      let popup = L.popup();
      popup.setLatLng(e.latlng);
      popup.setContent(id);
      popup.openOn(this.map);
    },
    addSite(newSite) {
      const ownerId = JSON.parse(localStorage.loggedUser).ownerId;
      if (!ownerId) return;

      const type = newSite.shape.toLowerCase();
      let coordinates = newSite.layer._latlngs[0].map((coordinate) => [
        coordinate.lat,
        coordinate.lng,
      ]);
      coordinates = coordinates.map((cord) => JSON.stringify(cord));
      coordinates = coordinates.filter((cord, index) => {
        return coordinates.indexOf(cord) == index;
      });
      coordinates = coordinates.map((cord) => JSON.parse(cord));
      newSite.layer._latlngs[0] = coordinates.map((cord) => ({
        lat: cord[0],
        lng: cord[1],
      }));
      if (type == "polygon") {
        axios
          .post(`/.netlify/functions/coordinates`, {
            ownerId,
            coordinates,
            type,
          })
          .then((data) => {
            let shapeId = data.data.ref["@ref"].id;
            let id = newSite.layer._leaflet_id;

            newSite.layer.options.id = shapeId;
            newSite.layer.on("pm:update", this.updateSite);
            newSite.layer.on("pm:remove", this.deleteSite);
            newSite.layer.on("click", (e) => this.popupMenu(e, id));
          });
      }
    },
    addDrawControls() {
      this.map.pm.addControls({
        position: "topleft",
        drawCircle: false,
        dragMode: false,
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
            if (site.data.type == "polygon") {
              lastSite = L.polygon(site.data.coordinates, {
                color: site.data.color || "#3388ff",
              }).addTo(this.map);
              let id = lastSite._leaflet_id;
              lastSite.options.id = site.ref["@ref"].id;
              lastSite.on("pm:update", this.updateSite);
              lastSite.on("pm:remove", this.deleteSite);
              lastSite.on("click", (e) => this.popupMenu(e, id));
            }
          });
          if (!lastSite) return;
          this.map.fitBounds(lastSite.getBounds());
        });
    },
    popupMenu(e, id) {
      let popup = L.popup();
      const site = this.map._layers[id];

      let area = turf.area(site.toGeoJSON());
      this.$emit("getPolygonArea", area);
      let center = site.getCenter();

      axios
        .get(
          `/.netlify/functions/windModel?latitude=${center.lat}&longitude=${center.lng}&landArea=${area}`
        )
        .then((data) => {
          this.$emit("changedSavingCalc", data.data);
        });

      // let template =
      //   "<button id=submit-color-change class=red-button type=button>red</button> <button id=submit-color-change class=green-button type=button>green</button> <button id=submit-color-change class=blue-button type=button>blue</button>";
      popup.setLatLng(e.latlng);
      // popup.setContent(template);
      popup.openOn(this.map);
      // this.$emit("changedBoxColor", site.options.color);

      let submitButtons = document.querySelectorAll("#submit-color-change");
      submitButtons.forEach((button) =>
        button.addEventListener("click", (ev) => {
          let color;
          if (ev.target.className.includes("red-button")) color = "#F00";
          else if (ev.target.className.includes("green-button")) color = "#0F0";
          else if (ev.target.className.includes("blue-button"))
            color = "#3388ff";
          site.options.color = color;
          // this.$emit("changedBoxColor", color);
          this.map.removeLayer(site);
          this.map.addLayer(site);
          this.map.closePopup();
          this.updateSite({ layer: site, shape: "polygon" });
        })
      );
    },
    updateSite(updatedSite) {
      const ownerId = JSON.parse(localStorage.loggedUser).ownerId;
      if (updatedSite.shape.toLowerCase() == "polygon") {
        const data = {
          color: updatedSite.layer.options.color || "#3388ff",
          id: updatedSite.layer.options.id,
          coordinates: updatedSite.layer._latlngs[0].map((site) => [
            site.lat,
            site.lng,
          ]),
          ownerId,
        };
        axios.put("/.netlify/functions/coordinates", { data });
      }
    },
    deleteSite(e) {
      const remove = confirm("Do you really want to delete that polygon ?");
      this.map.closePopup();
      if (remove)
        axios.delete(
          `/.netlify/functions/coordinates?id=${e.layer.options.id}`
        );
      else {
        this.map.pm.disableGlobalRemovalMode();
      }
    },
  },
  watch: {
    isSatteliteView(isSattelite) {
      this.map.removeLayer(isSattelite ? this.grayView : this.satteliteView);
      this.map.addLayer(isSattelite ? this.satteliteView : this.grayView);
    },
    showCadasters(showCadasters) {
      if (showCadasters) {
        this.getCadasters();
        this.map.options.minZoom = 20;
      } else {
        (this.map.options.minZoom = ""),
          Object.values(this.map._layers).forEach((layer) => {
            if (layer.options.isCadaster) layer.remove();
          });
      }
    },
  },
};
</script>

<style lang="scss">
#map {
  .leaflet-map-pane {
    .leaflet-popup-pane {
      .leaflet-popup {
        .leaflet-popup-content-wrapper {
          .leaflet-popup-content {
            button {
              &.red-button {
                background-color: red;
              }
              &.green-button {
                background-color: green;
              }
              &.blue-button {
                background-color: #3388ff;
              }
            }
          }
        }
      }
    }
  }
  .leaflet-control-zoom {
    &.leaflet-bar {
      &.leaflet-control {
        margin-top: 35px;
      }
    }
  }
}
</style>