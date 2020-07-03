<template>
  <div class="database">
    <div class="row">
      <p class="two">02</p>
      <h1>Database</h1>
    </div>
    <div class="row">
      <div class="col-6">
        <img src="../../public/assets/person-writing-on-notebook.png" />
      </div>
      <div class="col-6">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita.
        </p>
        <button>Coming soon</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.database {
  .row {
    max-width: 80%;
    .two {
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