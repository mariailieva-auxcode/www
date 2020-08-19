<template>
  <div class="authorization">
    <div class="modal-overlay"></div>
    <div class="modal">
      <div class="modal--content">
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
  mounted() {
    document.body.classList.add("no-scroll");
  },
  destroyed() {
    document.body.classList.remove("no-scroll");
  },
  props: {
    isLogin: { type: Boolean, default: true },
    data: { type: Object },
    userType: { type: Number },
  },
  methods: {
    submit(credentials) {
      axios.post("register", { ...credentials, ...this.data }).then((_) => {
        this.$emit("close", _);
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
  .modal-overlay {
    background: #000000 0% 0% no-repeat padding-box;
    opacity: 0.2;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .modal {
    display: flex;
    position: fixed;
    border-radius: 15px;
    background-color: white;
    top: 60px;
    left: 130px;
    width: calc(100vw - 260px);
    height: 90vh;
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
      .Login {
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

    .modal--content {
      display: flex;
      width: 100%;
    }
    .image {
      padding: 0;
      img {
        width: 470px;
        height: 101%;
        float: left;
      }
    }
  }
}
</style> 