<template>
  <div>
    <button class="logout-button" @click="logout()">Logout</button>
    <div style="width: 100%">
      <iframe
        width="90%"
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
.logout-button {
  background-color: transparent;
  border: 2px solid black;
  border-radius: 10px;
  margin-left: 20px;
  font-size: 14px;
  justify-content: center;
  color: black;
  font-weight: 700;
  width: 148px;
  height: 46px;
  align-items: baseline;
  outline: none;
}
</style>