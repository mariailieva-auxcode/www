<template>
  <div class="profilelogin">
    <div
      id="map"
      style="height: 100vh; width: 100vw"
      class="bottom disabled blur"
    ></div>

    <Authorization
      class="top"
      v-if="showAuth"
      @close="onAuthorizationClose($event)"
    ></Authorization>
  </div>
</template>

<script>
import L from "leaflet";
import Authorization from "@components/sections/Authorization";
export default {
  name: "ProfileLogin",
  components: {
    Authorization,
  },
  data() {
    return {
      showAuth: true,
      isLogged: false,
      zoom: 20,
      center: [51.926779, 4.4930619],
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    };
  },
  mounted() {
    this.init();
    this.createMap();
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
    createMap() {
      this.map = L.map("map", {
        center: this.center,
        zoom: this.zoom,
      });
      this.link = L.tileLayer(this.url);
      this.link.addTo(this.map);
    },
    onAuthorizationClose(isLogged) {
      this.showAuth = false;
      if (isLogged) {
        this.isLogged = true;
        this.$router.replace(`/${this.lang}/profile`);
      }
    },
  },
};
</script>

<style lang="scss">
@import "profile-style.scss";
.profilelogin {
  .top {
    z-index: 400;
  }
  .bottom {
    z-index: 1;
  }
  .disabled {
    pointer-events: none;
  }
  .leaflet-top.leaflet-left,
  .leaflet-left,
  .leaflet-bottom,
  .leaflet-right,
  .col-1 {
    display: none !important;
  }
  .blur {
    filter: blur(1px);
    height: 100%;
  }
}
</style>