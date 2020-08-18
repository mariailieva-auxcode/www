<template>
  <div class="signup">
    <div class="components col-12">
      <img class="logo" src="/assets/logo.svg" />
      <p class="header">Sign up for greenatlas.earth</p>
      <div class="inputs">
        <input type="email" id="email" placeholder="Email address " v-model="email" />
        <div class="input-group mb-3">
          <input
            id="pass"
            :type="showPassword ? 'text' : 'password'"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <div class="input-group-append">
            <b-img
              id="eye"
              src="/assets/eye.svg"
              class="btn secondary"
              type="button"
              @click="showPassword = !showPassword"
            ></b-img>
          </div>
        </div>
        <div class="col-12">
          <ul>
            <li>At least 6 symbols</li>
            <li>Numeric character (0-9)</li>
            <li>Uppercase and lowercase letter</li>
          </ul>
        </div>
        <input
          type="password"
          id="confirm"
          name="password"
          placeholder="Confirm Password"
          v-model="confirmPassword"
          :class="{ 'active': confirmError }"
        />
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
        <!-- , $emit('sign-up',{email, password}) -->
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
      confirmError: false,
    };
  },
  computed: {
    signupAllow() {
      if (!this.email || !this.password || !this.confirmPassword) return false;
      if (this.password != this.confirmPassword) {
        this.confirmError = true;
        console.log(this.confirmError);
        return false;
      } else {
        this.confirmError = false;
        console.log(this.confirmError);
      }
      if (this.checkbox == false) return false;
      return true;
    },
  },
  methods: {
    signUp() {
      if (this.signupAllow) return true;
    },
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
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
      margin-bottom: 0;
    }
    .inputs {
      display: flex;
      flex-direction: column;
      margin-left: auto;
      margin-right: auto;
      outline: none;
      width: 305px;
      height: 46px;
      border-radius: 5px;
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
      #email {
        margin-top: 30px;
        margin-bottom: 16px;
        border: 1px solid #d3d5e3;
        padding: 14px 20px;
        outline: none;
      }
      #pass {
        border: 1px solid #d3d5e3;
        padding: 14px 20px;
        outline: none;
        box-shadow: none;
      }
      #eye {
        border: none;
        background-color: none;
        right: 0;
        top: 6px;
        position: absolute;
        z-index: 11;
      }
      #eye:hover {
        border: none;
        background-color: none;
      }
      .input {
        margin-top: 15px;
        border: 1px solid #d3d5e3;
        padding: 14px 20px;
        margin-bottom: 0;
      }
      #confirm {
        outline: none;
        border: 1px solid #d3d5e3;
        padding: 14px 20px;
      }
      &.active {
        border-color: red;
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
    }
  }
}
</style>