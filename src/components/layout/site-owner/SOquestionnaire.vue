<template>
  <div class="PDquestionnaire">
    <div>
      <label for="companyName">Company Name:</label>
      <input id="companyName" type="text" v-model="companyName" />
    </div>
    <div class="questionnaire">
      <p>What kind of energy do you suggest ?</p>
      <input type="checkbox" id="wind" value="Wind" v-model="energy" />
      <label class="wind">Wind</label>
      <input type="checkbox" id="sun" value="Sun" v-model="energy" />
      <label class="sun">Sun</label>
      <input type="checkbox" id="water" value="Water" v-model="energy" />
      <label class="water">Water</label>
    </div>
    <div>
      <label for="phoneNumber">Phone Number:</label>
      <input id="phoneNumber" type="number" v-model="phoneNumber" />
    </div>
    <div class="row button">
      <button @click="siteOwner()">Submit</button>
    </div>
    <label>Show table</label>
    <button @click="getProjectDev()">Click</button>
    <div v-for="user in projectDev" :key="user">
      <table class="table">
        <tr>
          <th>Company Name</th>
          <th>Phone Number</th>
          <th>Energy</th>
          <th>Position</th>
        </tr>
        <tr>
          <td>{{user.data.companyName}}</td>
          <td>{{user.data.phoneNumber}}</td>
          <td>{{user.data.energy}}</td>
          <td>{{user.data.position}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "../../../axios";
export default {
  data() {
    return {
      companyName: "",
      energy: [],
      phoneNumber: "",
      position: "Site owner",
      projectDev: [],
    };
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
.wind,
.sun {
  margin-right: 10px;
}
.button {
  display: flex;
  justify-content: center;
}
.table {
  margin: 0 auto;
  width: 80%;
  border: 2px solid black;
}
</style>