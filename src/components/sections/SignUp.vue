<template>
  <div class="signup">
    <div class="components col-12">
      <img class="logo" src="/assets/logo.svg" />
      <p class="header">Sign up for greenatlas.earth</p>
      <div class="inputs">
        <input type="email" id="email" placeholder="Email address " v-model="email" />
        <div class="row">
          <input
            class="pass"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
          />
          <b-img
            class="eye"
            src="/assets/eye.svg"
            type="button"
            @click="showPassword = !showPassword"
          ></b-img>
        </div>
        <div class="col-12" v-if="passMatch">
          <ul>
            <li>At least 6 symbols</li>
            <li>Numeric character (0-9)</li>
            <li>Uppercase and lowercase letter</li>
          </ul>
        </div>
        <div class="confirm">
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            :class="{ 'error': !passMatch }"
          />
        </div>
        <div v-if="!passMatch" class="confirm">
          <img src="/assets/warning.svg" />
          <p>Please, confirm your password.</p>
        </div>
        <div>
          <div class="checkbox custom-control custom-checkbox">
            <input
              type="checkbox"
              class="custom-control-input"
              id="termsAndConditions"
              v-model="checkbox"
              @change="!checkbox"
            />
            <label class="custom-control-label" for="termsAndConditions">
              I agree to the
              <span class="black">Terms & Conditions</span>
            </label>
          </div>
        </div>
        <button
          class="sign-up"
          @click="signUp()"
          :style="{'cursor':signupAllow ? 'pointer':'not-allowed'}"
        >Sign up</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      showPassword: false,
      active: false,
      checkbox: false,
      email: "",
      confirmPassword: "",
      isError: false,
    };
  },
  computed: {
    signupAllow() {
      if (!this.email || !this.password || !this.confirmPassword) return false;
      if (this.checkbox == false) return false;
      return true;
    },
    passMatch() {
      return this.password == this.confirmPassword ? true : false;
    },
  },
  methods: {
    signUp() {
      if (this.signupAllow && this.passMatch) {
        this.isError = false;
        this.$emit("sign-up", { email: this.email, password: this.password });
        return true;
      } else {
        this.isError = true;
      }
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/_inputs.scss";
.signup {
  .components {
    display: flex;
    flex-direction: column;
    padding: 0;
    .logo {
      margin: 55px auto 23px;
      width: 92px;
      height: 78px;
    }
    p.header {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    button.sign-up {
      background: #55b364;
      border-radius: 10px;
      color: #ffffff;
      font-family: $font__IBM;
      padding: 14px 130px;
      margin-top: 15px;
      margin-bottom: 15px;
      border: none;
      outline-color: none;
      outline: none;
      width: 305px;
      height: 46px;
    }
    .custom-checkbox
      .custom-control-input:checked
      ~ .custom-control-label::before {
      background-color: #55b364 !important;
    }

    .custom-checkbox
      .custom-control-input:checked:focus
      ~ .custom-control-label::before {
      box-shadow: none;
    }
    .custom-checkbox
      .custom-control-input:focus
      ~ .custom-control-label::before {
      box-shadow: none;
    }
    .custom-checkbox
      .custom-control-input:active
      ~ .custom-control-label::before {
      background-color: #c8ffc8;
    }
    .checkbox {
      margin-top: 15px;
      font-size: 12px;
      font-family: $font__IBM;
      margin-bottom: 0;
      color: #9597ac;
      justify-content: left;
      margin-left: 20px;
      label {
        margin-left: 6px;
        margin-bottom: 0;
        line-height: 24px;
        span.black {
          margin-left: 3px;
          margin-bottom: 0;
          color: black;
        }
      }
    }
    .pass {
      margin-top: 16px;
      margin-bottom: 8px;
    }
    .eye {
      border: none;
      background-color: none;
      position: absolute;
      z-index: 11;
      right: 180px;
      top: 320px;
    }
    .eye:hover {
      border: none;
      background-color: none;
    }
    ul {
      text-align: left;
      margin-top: 0px;
      margin-left: 15px;
      margin-bottom: 15px;
      padding: 0;
      font-family: $font__IBM;
      list-style-type: circle;
      font-size: 12px;
      color: #65687e;
    }
    .confirm {
      .error {
        border: 1px solid #d84949;
        margin-top: 8px;
      }
      p {
        margin-top: 5px;
        padding-top: 10px;
        padding-left: 20px;
        color: #d84949;
        margin-bottom: 0;
        background: pink;
        border-radius: 5px;
        font-size: 12px;
        font-family: $font__IBM;
        width: 305px;
        height: 36px;
        text-align: left;
      }
      img {
        position: absolute;
        right: 180px;
        top: 383px;
      }
    }
  }
}
</style>