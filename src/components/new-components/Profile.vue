<template>
  <div class="profile">
    <button class="logout-button" @click="logout()">Logout</button>
    <div style="width: 100%">
      <iframe
        id="iframe-map"
        width="100%"
        height="700px"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Amsterdam+(GreenAtlas)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  mounted() {
    this.init();
    setTimeout(() => {
      console.log(document.getElementsByClassName("place-card"));
      document.getElementsByClassName("place-card")[0].style.visibility =
        "hidden";
    }, 10000);
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
    logout() {
      delete localStorage.token;
      this.$router.replace(`/${this.lang}`);
    },
  },
};
</script>

<style lang="scss">
.profile {
  height: 100vh;
  .logout-button {
    position: absolute;
    top: 0;
    right: 20px;
    background-color: transparent;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 14px;
    justify-content: center;
    color: black;
    font-weight: 700;
    width: 148px;
    height: 46px;
    align-items: baseline;
    outline: none;
  }
}
</style>