<template>
  <div class="tools">
    <div class="row">
      <p class="three">03</p>
      <h1>Tools</h1>
      <div class="row">
        <div class="col-6">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita.
          </p>
          <button>Comming soon</button>
        </div>
        <div class="col-6">
          <img src="../../public/assets/solar-panels.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.tools {
  .row {
    max-width: 80%;
    .three {
      z-index: 0;
      font-size: 190px;
      color: #f7f7fa;
    }
    h1 {
      margin-top: 150px;
    }
  }
}
</style>