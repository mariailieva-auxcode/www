<template>
  <div class="components col-12">
    <img class="logo" src="/assets/logo.svg" />
    <p class="header">Log In to greenatlas.earth</p>
    <div class="inputs">
      <input type="email" class="email" placeholder="Email address" />
      <input
        id="pass"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Password"
        v-model="password"
      />
      <div class="col-12 checkbox custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="termsAndConditions" />
        <label class="custom-control-label" for="termsAndConditions">Remember me</label>
        <label class="green">Forgot password?</label>
      </div>
      <button class="login">Log in</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      showPassword: false,
      checkbox: false,
      active: false,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/styles/main.scss";
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
      margin: 30px 0 16px;
      background: #55b364;
      border-radius: 10px;
      color: #ffffff;
      font-family: $font__IBM;
      border: none;
      outline-color: none;
      width: 305px;
      height: 46px;
      text-align: center;
    }
    .email {
      margin-top: 30px;
      margin-bottom: 16px;
      width: 305px;
      height: 46px;
      border: 1px solid #d3d5e3;
      border-radius: 5px;
      padding: 14px 20px;
    }
    #pass {
      width: 305px;
      height: 46px;
      border: 1px solid #d3d5e3;
      border-radius: 5px;
      padding: 14px 20px;
      margin-right: 0;
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