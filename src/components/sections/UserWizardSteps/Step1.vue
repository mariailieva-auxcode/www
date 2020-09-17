<template>
  <div class="step start-onboarding">
    <div class="onboarding-card">
      <div class="col-12 first-step">
        <div class="row top-description">
          <img class="col-2" src="/assets/address.svg" />
          <p class="col-10 done">1. Enter Your Site</p>
        </div>
        <div class="row descriptions">
          <img class="col-1" src="/assets/correct-green.svg" />
          <h5 class="col-11">Tell us a bit about your site to get started</h5>
        </div>
        <div class="row descriptions last-description">
          <img class="col-1" src="/assets/correct-green.svg" />
          <h5
            class="col-11"
          >The list of project developers below is adjusted according to your answers</h5>
        </div>
        <button @click="nextStep()">
          <span>Start Here</span>
        </button>
        <h5 class="time-info-description">5 minutes</h5>
      </div>
    </div>
    <div class="onboarding-card">
      <div class="col-12 first-step disabled">
        <div class="row top-description">
          <img class="col-2" src="/assets/profile-gray.svg" />
          <p class="col-10">2. Create Your Profile and Discover</p>
        </div>
        <div class="row descriptions">
          <img class="col-1" src="/assets/correct-gray.svg" />
          <h5
            class="col-11"
          >Create your profile to help us understand more about your location, preferences and goals</h5>
        </div>
        <div class="row descriptions last-description">
          <img class="col-1" src="/assets/correct-gray.svg" />
          <h5
            class="col-11"
          >Learn about the earnings potential and possibilities of your site based on your information</h5>
        </div>
        <button class="create-account">
          <span>Create Account</span>
        </button>
        <h5 class="time-info-description">5 minutes</h5>
      </div>
    </div>
    <div class="onboarding-card">
      <div class="col-12 first-step disabled">
        <div class="row top-description">
          <img class="col-2" src="/assets/trust-gray.svg" />
          <p class="col-10">3. Match and Start Your Project</p>
        </div>
        <div class="row descriptions">
          <img class="col-1" src="/assets/correct-gray.svg" />
          <h5
            class="col-11"
          >When your profile is complete we will show you a short list of the best project developers based on your site and preferences</h5>
        </div>
        <div class="row descriptions">
          <img class="col-1" src="/assets/correct-gray.svg" />
          <h5
            class="col-11 second-description"
          >Select your preferred partner(s) to kick-start your renewable energy project. We provide ongoing support to ensure that the partnership is a success!</h5>
        </div>
        <div class="row descriptions last-description">
          <img class="col-1" src="/assets/correct-gray.svg" />
          <h5
            class="col-11"
          >If you have more than one site, you can add it in your registered profile section</h5>
        </div>
        <button class="create-account">
          <span>Match</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Step 1",
  methods: {
    nextStep() {
      this.$emit("nextStep");
    },
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/components/questionnaire.scss";
@import "../../../assets/styles/questionnaire-mobile.scss";
@import "../../../assets/styles/main.scss";
@import "../../../assets/styles/newmain.scss";
div.so-questionnaire {
  .user-wizard {
    div.step {
      &.start-onboarding {
        flex-direction: row;
        justify-content: space-evenly;
        .onboarding-card {
          max-width: 275px;
          width: 100%;
          height: 420px !important;
          .first-step {
            border: 2px solid #55b364;
            border-radius: 10px;
            padding: 25px 25px 15px;
            height: 100%;
            position: relative;
            &.disabled {
              border: 2px solid #d3d5e3;
            }
            > .row {
              &.descriptions {
                align-items: center;
                img {
                  padding: 0;
                  max-width: 15.5px;
                  max-height: 12px;
                }
                h5 {
                  padding: 0 0 0 10px;
                }
              }
              &.top-description {
                padding-bottom: 25px;
                border-bottom: 1px solid #d3d5e3;
                width: 100%;
                margin-bottom: 25px;
                text-align: left;
                img {
                  padding: 0;
                }
                p {
                  margin-bottom: 0;
                  align-items: flex-end;
                  display: flex;
                  &.done {
                    color: #65687e;
                  }
                }
              }
              h5 {
                text-align: left;
                margin: 0;
                &.second-description {
                  margin-top: 15px;
                }
                img {
                  margin-right: 10px;
                }
              }
              &.last-description {
                margin-top: 15px;
              }
            }
            button {
              position: absolute;
              bottom: 35px;
              left: 34px;
              margin: 0 !important;
              border-radius: 10px;
              width: 205px;
              height: 45px;
              background-color: #55b364;
              outline: none;
              border: none;
              span {
                font-family: $font__IBM;
                font-weight: 700;
                font-size: 14px;
                color: white;
                margin: auto;
              }
              &.create-account {
                cursor: default;
                background-color: #d3d5e3;
              }
            }
            .time-info-description {
              position: absolute;
              bottom: 15px;
              left: 111px;
              margin: 0;
            }
          }
        }
      }
    }
  }
}
</style>