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
      showAuth: true,
      isLogged: false,
    };
  },
  props: {
    lang: String,
  },
  mounted() {
    this.init();
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
.profilelogin{
  .top{
    z-index: 400;
  }
  .bottom{
    z-index: 1;
  }
  .disabled {
      pointer-events:none;
  }
  .leaflet-top, .leaflet-left, .col-1 {
    display: none;
  }
  .blur{
    filter: blur(8px);
    height: 100%;
  }
}
</style>