<template>
  <div class="PDquestionnaire">
    <div>
      <label for="companyName">Company Name:</label>
      <input id="companyName" type="text" v-model="companyName" />
    </div>
    <div class="questionnaire">
      <p>What kind of energy do you suggest ?</p>
      <input type="checkbox" id="wind" value="Solar" v-model="energy" />
      <label class="wind">Solar</label>
      <input type="checkbox" id="sun" value="Wind" v-model="energy" />
      <label class="sun">Wind</label>
    </div>
    <div class="questionnaire">
      <p>What type of site do you have?</p>
      <input type="checkbox" id="wind" value="Roof" v-model="material" />
      <label class="wind">Roof</label>
      <input type="checkbox" id="sun" value="Land" v-model="material" />
      <label class="sun">Land</label>
      <input type="checkbox" id="water" value="Water" v-model="material" />
      <label class="water">Water</label>
    </div>
    <div>
      <label for="phoneNumber">What is the size of the site?</label>
      <input id="phoneNumber" type="text" v-model="size" />
    </div>
    <div class="row button">
      <button @click="projectDev()">Submit</button>
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
      size: "",
      material: [],
    };
  },
  methods: {
    projectDev() {
      axios
        .post("projectDev", {
          companyName: this.companyName,
          size: this.size,
          energy: this.energy,
          material: this.material,
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