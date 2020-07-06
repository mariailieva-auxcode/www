<template>
  <div>
    <h1
      :style="{'font-size': isHomePage ? '195px' : '80px', 'text-align': isCentered ? 'center' : 'left'}"
    >{{sectionTitle}}</h1>
    <h2
      :style="{'bottom': isHomePage ? '45px' : '10px', 'left': isCentered ? '35%' : isWhat ? '60px' : '100px'}"
    >{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: {
    sectionTitle: { default: "" },
    title: { default: "" },
    isHomePage: { default: false },
    isCentered: { default: false },
    isWhat: { default: false }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/main.scss";
div {
  position: relative;
  h1 {
    font-size: 80px;
    color: #f7f7fa;
    text-align: left;
  }
  h2 {
    font-size: 45px;
    position: absolute;
    bottom: 10px;
    left: 100px;
    font-family: $font__LatoBold;
    font-weight: 700;
    color: #393a4d;
  }
}
</style>