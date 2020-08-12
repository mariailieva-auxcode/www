<template>
  <div class="authorization">
    <div class="row login-buttons">
      <p>Already having an account?</p>
      <button @click="active = true">Log in</button>
    </div>
    <div class="card" :class="{'active' : active}">
      <div class="row">
        <div class="col-5 image">
          <img src="/assets/login-image.png" />
        </div>
        <div class="col-6">
          <div class="Login" :class="{'active1' : active1}">
            <Login></Login>
          </div>
          <div class="SignUp" :class="{'active1' : active1}">
            <SignUp></SignUp>
          </div>
          <button class="switch" @click="active1 = !active1">
            <p>
              Don’t have an account?
              <span class="yellow-line">Sign up</span>
            </p>
          </button>
          <button class="switch" @click="active1 = !active1">
            <p>
              <span class="yellow-line">Log in</span>
              instead
            </p>
          </button>
        </div>
        <div class="col-1">
          <button @click="active = false">
            <img src="/assets/X-image.svg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "../sections/Login";
import SignUp from "../sections/SignUp";
export default {
  components: {
    Login,
    SignUp,
  },
  data() {
    return {
      active: false,
      active1: false,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
.authorization {
  .card {
    .col-6 {
      button.switch {
        border: none;
        background-color: transparent;
        outline-color: transparent;
        p {
          font-size: 12px;
          color: #26272e;
          font-weight: 700;
        }
        .yellow-line {
          border-bottom: 3px solid #fee224;
        }
      }
      .Login {
        display: flex;
        &.active1 {
          display: none;
        }
      }
      .SignUp {
        display: none;
        &.active1 {
          display: flex;
        }
      }
    }
    .col-1 {
      button {
        border: none;
        background-color: transparent;
      }
      padding: 0;
      width: 16px;
      height: 16px;
      top: 20px;
      right: -15px;
    }
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
    }
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
  }
  .login-buttons {
    position: absolute;
    top: 20px;
    right: 55px;
    font-family: $font__IBM;
    align-items: baseline;
    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    button {
      background-color: transparent;
      border: 2px solid #ffffff;
      border-radius: 10px;
      margin-left: 20px;
      font-size: 14px;
      justify-content: center;
      color: #ffffff;
      font-weight: 700;
      width: 148px;
      height: 46px;
      align-items: baseline;
    }
  }
}
</style> 