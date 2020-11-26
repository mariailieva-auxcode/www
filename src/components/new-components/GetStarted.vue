<template>
  <div class="get-started">
      <Authorization
        v-if="showAuth"
        @close="onAuthorizationClose($event)"
      ></Authorization>
    <h1>{{title}}</h1>
    <router-link :to="`/${$router.history.current.params.lang}/profile`"
          v-if="isLogged">
      <button class="start-buttons">
        {{button}}
        <img src="/assets/arrow-right-white.png" />
      </button>
    </router-link>
    <router-link
            :to="`/${$router.history.current.params.lang}/profilelogin`" 
          v-if="!isLogged">
            <button class="start-buttons"
            @click="showAuth = true">
               {{ button }}
              <img src="/assets/arrow-right-white.png" />
            </button>
          </router-link>
  </div>
</template>

<script>
import Authorization from "@components/sections/Authorization";
import getStarted from "@content/nl/general/get-started.yaml";
import getStartedEn from "@content/en/general/get-started.yaml";
export default {
  components: {
    Authorization,
  },
  name: "GetStarted",
  data() {
    return {
      title: "",
      button: "",
      isLogged: false,
      showAuth: false,
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
      let data = this.lang === "en" ? getStartedEn : getStarted;
      this.title = data.title;
      this.button = data.button;
      this.isLogged = !!localStorage.token;
    },
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

<style scoped lang="scss">
@import "@styles/newmain.scss";
.get-started {
  margin-bottom: 150px;
  h1 {
    font-size: 40px;
    text-align: center;
    margin-bottom: 60px;
  }
}
</style>