<template>
  <div class="container">
    <div class="row news-text">
      <div class="col-2">
        <h1>News</h1>
      </div>
      <div class="col-7">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
          tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita.
        </p>
      </div>
      <div class="col-2">
        <router-link to="/news">
          <button>
            <p>
              To News
              <img src="../../public/assets/arrow-right-blue.png" />
            </p>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.container {
  .news-text {
    display: flex;
    justify-content: flex-end;
    margin-top: 160px;
    .col-2 > h1 {
      font-size: 45px;
      color: #393a4d;
      font-weight: bold;
    }
    .col-7 > p {
      color: #9597ac;
      font-size: 18px;
    }
    .col-2 button {
      width: 140px;
      height: 45px;
      border-radius: 10px;
      border: 2px solid #2783ff;
      background-color: white;
      p {
        margin: auto;
        font-size: 14px;
        color: #2783ff;
      }
    }
  }
}
</style>