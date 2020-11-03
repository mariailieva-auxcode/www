<template>
  <div class="profilelogin">

    <LeafMap class="bottom disabled blur"
    ></LeafMap>   

    <Authorization class="top"
        v-if="showAuth"
        @close="onAuthorizationClose($event)"
      ></Authorization>
      
  </div>

</template>

<script>
import LeafMap from "../builder/LeafMap";
import Authorization from "../sections/Authorization"
export default {
  name: "ProfileLogin",
  components: {
    Authorization,
    LeafMap,
  },
  data() {
    return {
      lang: "",
      isSatteliteView: false,
      showAuth: true,
      isLogged: false,
    };
  },
  watch: {
    lang() {
      this.init();
      this.isLogged = !!localStorage.token;
    },
  },
  methods: {
    onAuthorizationClose(isLogged) {
      this.showAuth = false;
      if (isLogged) {
        this.isLogged = true;
        this.$router.push(`${this.lang}/profile`);
      }
     },
    },
};
</script>

<style lang="scss">
@import "profile-style.scss";
.profilelogin{
  .top{
    z-index: 400;
  }
  .bottom{
    z-index: 1;
  }
  .marginBot{
    margin-bottom: 15px;
    margin-bottom: 15px;
  }
  .disabled {
      pointer-events:none;
  }
  .leaflet-top {
    display: none;
  }
  .leaflet-left{
    display: none;
  }
  .blur{
    filter: blur(8px);
    height: 100%;
  }
  .col-1{
    display: none;
  }
}
</style>