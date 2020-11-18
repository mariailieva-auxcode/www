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
      <button @click="specialists()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from "@axios";
export default {
  data() {
    return {
      companyName: "",
      energy: [],
      phoneNumber: "",
      position: "Specialists",
    };
  },
  methods: {
    specialists() {
      axios
        .post("specialist", {
          companyName: this.companyName,
          phoneNumber: this.phoneNumber,
          energy: this.energy,
          position: this.position,
        })
        .then((data) => (console.log(data), this.projectDev.push(data.data)));
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
</style>