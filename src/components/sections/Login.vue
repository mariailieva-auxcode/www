<template>
  <div class="login">
    <div class="row login-buttons">
      <p>Already having an account?</p>
      <button @click="active = true">Log in</button>
    </div>
    <div class="card" :class="{'active' : active}">
      <div class="row">
        <div class="col-5 image">
          <img src="/assets/login-image.png" />
        </div>
        <div class="components col-7">
          <img src="/assets/logo.svg" />
          <p>Sign up for greenatlas.earth</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: false,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
.login {
  .card {
    display: none;
    &.active {
      display: flex;
      position: absolute;
      left: 35px;
      right: 130px;
      top: 60px;
      width: auto;
      height: auto;
      z-index: 11;
      .row {
        margin: unset;
      }
      .image {
        padding: 0;
        img {
          width: 470px;
          height: 650px;
          float: left;
        }
      }
      .components {
        padding: 0;
        img {
          margin-top: 55px;
          margin-bottom: 23px;
          width: 92px;
          height: 78px;
        }
        p {
          font-size: 40px;
          font-weight: 700;
        }
      }
    }
  }
  .login-buttons {
    position: absolute;
    top: 20px;
    right: 55px;
    align-items: baseline;
    font-family: $font__IBM;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    button {
      background-color: transparent;
      border: 2px solid #ffffff;
      border-radius: 10px;
      justify-content: center;
      padding: 14px 55px;
      margin-left: 20px;
      font-size: 14px;
      font-family: $font__IBM;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>