<template>
  <div class="background-color">
    <div class="SOquestionnaire">
      <div class="header">
        <p>Welcome to greenatlas.earth!</p>
        <img src="/assets/hello-hand.svg" />
      </div>
      <div class="user-wizard">
        <div class="row questions-header">
          <p>COMPLETE YOUR PROFILE</p>
        </div>
        <div class="user-questions">
          <div class="step" v-if="step === 1">
            <div class="row">
              <label>Comapny Name:</label>
            </div>
            <div class="row">
              <input id="companyName" type="text" placeholder="Company..." v-model="companyName" />
            </div>
          </div>
          <div class="step" v-if="step === 2">
            <label>Energy type:</label>
            <div class="row" id="powerType">
              <input type="checkbox" id="wind" value="Wind" v-model="powerType" />
              <p class="choice">Wind</p>
              <input type="checkbox" id="sun" value="Sun" v-model="powerType" />
              <p class="choice">Sun</p>
              <input type="checkbox" id="water" value="Water" v-model="powerType" />
              <p class="choice">Water</p>
            </div>
          </div>
          <div class="step" v-if="step === 3">
            <div class="row">
              <label for="phoneNumber">Phone Number:</label>
            </div>
            <div class="row">
              <input id="phoneNumber" placeholder="Number..." type="number" v-model="phoneNumber" />
            </div>
          </div>
          <div class="step" v-if="step === 4">
            <div class="row">
              <label>How much does the service cost?</label>
            </div>
            <div class="row">
              <input id="serviceValue" type="number" v-model="phoneNumber" />
            </div>
          </div>
        </div>
        <div class="buttons">
          <div class="row">
            <button class="back-button" @click="step--" v-if="step !== 1">
              <p>Back</p>
            </button>
            <button class="next-button" @click="step++" v-if="step !== 4">
              <p>Continue</p>
            </button>
            <button class="next-button" v-else>
              <p>Submit</p>
            </button>
          </div>
        </div>
      </div>
      <!-- <div>
      <label for="companyName">Company Name:</label>
      <input id="companyName" type="text" v-model="companyName" />
      </div>-->
      <!-- <div class="questionnaire">
      <p>What kind of energy do you suggest ?</p>
      <input type="checkbox" id="wind" value="Wind" v-model="energy" />
      <label class="wind">Wind</label>
      <input type="checkbox" id="sun" value="Sun" v-model="energy" />
      <label class="sun">Sun</label>
      <input type="checkbox" id="water" value="Water" v-model="energy" />
      <label class="water">Water</label>
      </div>-->
      <!-- <div>
      <label for="phoneNumber">Phone Number:</label>
      <input id="phoneNumber" type="number" v-model="phoneNumber" />
    </div>
    <div class="row button">
      <button @click="siteOwner()">Submit</button>
      </div>-->
      <div class="table-wizard">
        <div class="row search-bar">
          <div class="col-6 table-header-input">
            <img src="/assets/table-filter.svg" />
            <input type="text" placeholder="Search..." />
          </div>
          <div class="col-6 table-header-menu">
            <p>Owner</p>
            <img src="/assets/arrow-down.svg" />
            <p>Energy Type</p>
            <img src="/assets/arrow-down.svg" />
            <p>Location</p>
            <img src="/assets/arrow-down.svg" />
            <p>Cost</p>
            <img src="/assets/arrow-down.svg" />
          </div>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Phone Number</th>
                <th>Energy</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in projectDev" :key="user">
                <td>{{user.data.companyName}}</td>
                <td>{{user.data.phoneNumber}}</td>
                <td>{{user.data.energy}}</td>
                <td>{{user.data.position}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../axios";
export default {
  data() {
    return {
      companyName: "",
      powerType: [],
      phoneNumber: "",
      position: "Site owner",
      projectDev: [],
      step: 1,
    };
  },
  created() {
    this.getProjectDev();
  },
  methods: {
    siteOwner() {
      axios
        .post("siteOwner", {
          companyName: this.companyName,
          phoneNumber: this.phoneNumber,
          energy: this.energy,
          position: this.position,
        })
        .then((data) => (console.log(data), this.siteOwner.push(data.data)));
    },
    getProjectDev() {
      axios.get(`siteOwner`).then((data) => {
        this.projectDev = data.data.data;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/styles/main.scss";
.SOquestionnaire {
  width: 80%;
  margin: 0 auto;
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
    img {
      height: 47.5px;
      margin-left: 25px;
    }
  }
  .user-wizard {
    margin-bottom: 25px;
    min-height: 385px;
    height: auto;
    box-shadow: 0px 6px 30px #1d226f0d;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    .questions-header {
      color: #55b364;
      font-family: $font__IBM;
      font-weight: 500;
      font-size: 14px;
      margin: 10px auto 60px;
    }
    .step {
      display: flex;
      justify-content: center;
      flex-direction: column;
      label {
        font-family: $font__IBM;
        font-weight: 700;
        font-size: 25px;
        color: #65687e;
        margin-bottom: 50px;
      }
      #companyName,
      #phoneNumber,
      #serviceValue {
        border-radius: 5px;
        border: 1px solid #d3d5e3;
        height: 45px;
        width: 300px;
      }
      #powerType {
        display: flex;
        align-items: center;
      }
      .choice {
        margin: 0;
        margin-right: 20px;
        margin-left: 5px;
      }
    }
    .buttons {
      margin-top: auto;
      margin-bottom: 30px;
      .next-button {
        display: flex;
        margin-left: auto;
        margin-right: 45px;
        height: 35px;
        width: 150px;
        border-radius: 10px;
        background-color: #55b364;
        border: none;
        outline: none;
        p {
          color: #f7f7fa;
          font-family: $font__IBM;
          font-weight: 700;
          font-size: 14px;
          margin: auto;
        }
      }
      .back-button {
        display: flex;
        margin-right: auto;
        margin-left: 55px;
        height: 35px;
        width: 150px;
        border: 2px solid #d3d5e3;
        background-color: white;
        border-radius: 10px;
        outline: none;
        p {
          color: #9597ac;
          font-family: $font__IBM;
          font-weight: 700;
          font-size: 14px;
          margin: auto;
        }
      }
    }
  }
  .table-wizard {
    box-shadow: 0px 6px 30px #1d226f0d;
    padding: 15px 45px 30px;
    border-radius: 15px;
    .search-bar {
      display: flex;
      background-color: #fafafd;
      border-radius: 8px;
      height: 40px;
      margin-bottom: 25px;
      .table-header-input {
        padding: 0;
        display: flex;
        img {
          margin: auto 15px;
        }
        input {
          background-color: #fafafd;
          border: none;
          outline: none;
        }
      }
      .table-header-menu {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        p {
          margin: 0;
          margin-left: 25px;
        }
        img {
          margin-left: 6px;
        }
      }
    }
  }
}
.button {
  display: flex;
  justify-content: center;
}
.table {
  margin: 0 auto;
  width: 100%;
  th {
    border-top: none;
    border-bottom: 1px solid #f4f4f4;
  }
  td {
    border: none;
  }
}
</style>