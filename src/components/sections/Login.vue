<template>
  <div class="components col-12">
    <img class="logo" src="/assets/logo.svg" />
    <p class="header">Log In to greenatlas.earth</p>
    <div class="inputs">
      <input type="email" class="email" placeholder="Email address" v-model="email" />
      <input
        id="pass"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        v-model="password"
      />
      <div class="col-12 checkbox custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          id="termsAndConditions"
          v-model="checkbox"
        />
        <label class="custom-control-label" for="termsAndConditions">Remember me</label>
        <label class="green">Forgot password?</label>
      </div>
      <button
        class="login"
        :disabled="!LoginAllowed"
        :style="{'cursor':LoginAllowed ? 'pointer':'not-allowed'}"
        @click="loginUser()"
      >Log in</button>
    </div>
  </div>
</template>
<script>
import { EMAIL_REGEX } from "../../helpers/email-regex.helper";
export default {
  data() {
    return {
      password: "",
      email: "",
      showPassword: false,
      checkbox: false,
      active: false,
      reg: EMAIL_REGEX,
    };
  },
  computed: {
    LoginAllowed() {
      console.log(this.EmailCheck);
      if (!this.email || !this.password) return false;
      if (!this.checkbox) return false;
      if (!this.EmailCheck) return false;
      return true;
    },
    EmailCheck() {
      if (this.reg.test(this.email)) return true;
      return false;
    },
    methods: {
      loginUser() {
        this.$emit("login", { email: this.email, password: this.password });
      },
      logout() {
        delete localStorage.token;
      },
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
@import "../../assets/styles/components/_inputs.scss";
.components {
  display: flex;
  flex-direction: column;
  padding: 0;
  .logo {
    width: 92px;
    height: 78px;
    margin: 92px auto 23px;
  }
  p.header {
    font-size: 40px;
    font-weight: 700;
    color: #26272e;
    margin-bottom: 0;
  }
  .inputs {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    .login {
      margin: 15px 0 16px;
      background: #55b364;
      border-radius: 10px;
      color: #ffffff;
      font-family: $font__IBM;
      border: none;
      outline-color: transparent;
      width: 305px;
      height: 46px;
      text-align: center;
    }
    .email {
      margin-top: 30px;
      margin-bottom: 16px;
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
      text-align: left;
      font-weight: 400;
      margin-left: 25px;
      label {
        line-height: 24px;
        align-items: baseline;
      }
      label.green {
        color: #55b364;
        border: none;
        text-decoration: underline;
        outline-color: none;
        font-weight: 400;
        text-align: right;
        margin: auto;
        top: 15px;
        margin-left: 100px;
        align-items: baseline;
      }
    }
  }
}
</style>