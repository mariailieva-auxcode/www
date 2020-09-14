<template>
  <div class="background-color">
    <NewNavigation :notInverted="true"></NewNavigation>
    <div class="so-questionnaire">
      <UserWizard @change="onFilter($event)"></UserWizard>
      <TableWizard :companies="filteredCompanies"></TableWizard>
    </div>
  </div>
</template>

<script>
import NewNavigation from "../New-Navigation";
import UserWizard from "../../sections/UserWizard";
import TableWizard from "../../sections/TableWizard";
export default {
  components: {
    NewNavigation,
    UserWizard,
    TableWizard,
  },

  data() {
    return {
      filteredCompanies: [],
    };
  },
  methods: {
    onFilter(filteredCompanies) {
      this.filteredCompanies = filteredCompanies;
      console.log(this.filteredCompanies);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/questionnaire-mobile.scss";
@import "../../../assets/styles/main.scss";
.so-questionnaire {
  width: 80%;
  margin: 0 auto;
  .container {
    max-width: 992px;
  }
  .step-6 {
    .container {
      max-width: 768px;
    }
  }
  .account {
    max-width: 420px;
    align-items: center;
    p {
      font: 12px;
      color: #9597ac;
    }
    button {
      outline: none;
      border: 1px solid #55b364;
      border-radius: 10px;
      width: 305px;
      height: 46px;
      font-size: 14px;
      font-family: $font__IBM;
      font-weight: 700;
    }
    .white {
      background-color: transparent;
      color: #55b364;
    }
    .green {
      background-color: #55b364;
      color: #ffffff;
    }
  }
  .form-inputs {
    justify-content: center;
    margin: auto;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    .size {
      position: relative;
      p {
        color: #55b364;
        font-family: $font__IBM;
        font-weight: 700;
        position: absolute;
        right: 10px;
        top: 10px;
      }
      input {
        height: 45px;
        width: 300px;
      }
    }
    input {
      outline: none;
      display: block;
      border-radius: 10px;
      border: 1px solid #d3d5e3;
      padding-left: 20px;
      font-size: 14px;
      font-family: $font__IBM;
      font-weight: 500;
      height: 45px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      color: #26272e;
      &:focus {
        border: 1px solid #55b364;
      }
    }
    .complete {
      flex-direction: column;
      input {
        width: 305px;
      }
    }
    #postal {
      margin-right: 25px;
    }
  }
  .header {
    margin-top: 45px;
    margin-bottom: 50px;
    display: flex;
    justify-content: flex-start;

    p {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 40px;
      color: #26272e;
    }
    .img {
      height: 47.5px;
      margin-left: 25px;
    }
  }
}
.button {
  display: flex;
  justify-content: center;
}
.solar,
.wind {
  width: 150px;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #d3d5e3;
  background-color: white;
  outline: none;
  margin-right: 25px;
  color: #9597ac;
  img {
    margin-right: 8px;
  }
  &.active {
    border: 2px solid #55b364;
    color: #65687e;
  }
}
</style>