<template>
  <div class="authorization">
    <div class="card">
      <div class="row">
        <div class="col-5 image">
          <img src="/assets/login-image.png" />
        </div>
        <div class="col-6">
          <div class="Login">
            <Login v-if="isLogin"></Login>
          </div>
          <div class="SignUp">
            <SignUp v-if="!isLogin" @sign-up="register($event)"></SignUp>
          </div>
          <button v-if="isLogin" @click="isLogin=false" class="switch">
            <p>
              Don’t have an account?
              <span class="yellow-line">Sign up</span>
            </p>
          </button>
          <button v-if="!isLogin" @click="isLogin=true" class="switch">
            <p>
              <span class="yellow-line">Log in</span>
              instead
            </p>
          </button>
        </div>
        <div class="col-1">
          <button @click="$emit('close')">
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
import axios from "../../axios";
export default {
  components: {
    Login,
    SignUp,
  },
  /**
   * 3 UserTypes
   * 
   * 1 = siteOwners
   * 2 = projectDevelopers
   * 3 = specialists
   */
  props: {
    isLogin: { type: Boolean, default: true },
    data: { type: Object },
    userType: { type: Number}
  },
  methods: {
    submit(credentials) {
      axios
        .post("register", {...credentials, ...this.data})
        .then((data) => {
          this.$emit('close')
        });
    },
    register(credentials) {
      // to be modified when we have regiter for specialist
      this.submit(credentials);
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
.authorization {
  .card {
    display: flex;
    position: absolute;
    left: 35px;
    right: 130px;
    top: 60px;
    width: auto;
    height: auto;
    z-index: 11;
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
      .Login,
      .SignUp {
        display: flex;
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
}
</style> 