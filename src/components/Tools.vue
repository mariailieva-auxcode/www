<template>
  <div class="tools">
    <div class="row">
      <h1>Tools</h1>
    </div>
    <div class="row">
      <div class="col-6 text">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita.
        </p>
        <button>
          <p>
            Coming soon
            <img src="../../public/assets/arrow-right-blue.png" />
          </p>
        </button>
      </div>
      <div class="col-6">
        <img src="../../public/assets/solar-panels.png" />
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
    h1 {
      margin: 150px 0 10px 80px;
    }
    .col-6 {
      p {
        text-align: center;
        font-size: 18px;
        color: #9597ac;
        margin-bottom: 50px;
      }
    }
    .text {
      margin-top: auto;
      margin-bottom: auto;
      button {
        width: 140px;
        height: 45px;
        border-radius: 10px;
        border: 2px solid #2783ff;
        background-color: white;
        p {
          color: #2783ff;
          font-size: 14px;
          margin: auto 0;
        }
      }
    }
  }
}
</style>