<template>
  <div class="PDquestionnaire">
    <div>
      <label for="companyName">{{nameType}}</label>
      <input id="companyName" type="text" v-model="companyName" />
    </div>
    <div class="questionnaire">
      <p>{{energyType}}</p>
      <input type="checkbox" id="wind" value="Solar" v-model="energy" />
      <label class="wind">Solar</label>
      <input type="checkbox" id="sun" value="Wind" v-model="energy" />
      <label class="sun">Wind</label>
    </div>
    <div class="questionnaire">
      <p>{{materialType}}</p>
      <input type="checkbox" id="wind" value="Roof" v-model="material" />
      <label class="wind">Roof</label>
      <input type="checkbox" id="sun" value="Land" v-model="material" />
      <label class="sun">Land</label>
      <input type="checkbox" id="water" value="Water" v-model="material" />
      <label class="water">Water</label>
    </div>
    <div>
      <label for="phoneNumber">{{sizeType}}</label>
      <input id="phoneNumber" type="text" v-model="size" />
    </div>
    <div class="row button">
      <button @click="projectDev()">{{button}}</button>
    </div>
  </div>
</template>

<script>
import questionnaire from "js-yaml-loader!../../../../content/nl/project-developer/questionnaire.yaml";
import questionnaireEn from "js-yaml-loader!../../../../content/en/project-developer/questionnaire.yaml";
import axios from "../../../axios";
export default {
  data() {
    return {
      companyName: "",
      energy: [],
      size: "",
      material: [],
      nameType: "",
      energyType: "",
      materialType: "",
      sizeType: "",
      button: "",
    };
  },
  created() {
    this.getCompanies();
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
  methods: {
    init() {
      this.lang = this.$router.history.current.params.lang;
      let data = this.lang === "en" ? questionnaireEn : questionnaire;
      this.nameType = data.name;
      this.energyType = data.energy;
      this.materialType = data.material;
      this.sizeType = data.size;
      this.button = data.button;
    },
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