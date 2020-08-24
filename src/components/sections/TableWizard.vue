<template>
  <div class="table-wizard">
    <table class="table">
      <thead>
        <tr>
          <th>{{tableCompany}}</th>
          <th>{{tableEnergy}}</th>
          <th>{{tableMaterial}}</th>
          <th>{{tableSize}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredCompanies" :key="user">
          <td>
            <p>{{user.data.companyName}}</p>
          </td>
          <td>
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/wind.svg"
              v-if="user.data.energy.includes('Wind')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/solar.svg"
              v-if="user.data.energy.includes('Solar')"
            />
          </td>
          <td>
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/roof.svg"
              v-if="user.data.material.includes('Roof')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/land.svg"
              v-if="user.data.material.includes('Land')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/water.svg"
              v-if="user.data.material.includes('Water')"
            />
          </td>
          <td>
            <p>{{user.data.size}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "../../axios";
import questionnaire from "js-yaml-loader!../../../content/nl/site-owner/questionnaire.yaml";
import questionnaireEn from "js-yaml-loader!../../../content/en/site-owner/questionnaire.yaml";
export default {
  data() {
    return {
      tableCompany: "",
      tableEnergy: "",
      tableMaterial: "",
      tableSize: "",
      companyName: "",
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
      this.welcomeText = data["welcome-header-text"];
      this.welcomeIcon = data["welcome-icon"];
      this.welcomeLabel = data["welcome-label"];
      this.startButton = data["start-button"];
      this.headerCardText = data["header-card-text"];
      this.firstQuestion = data["first-question"];
      this.secondQuestion = data["second-question"];
      this.thirdQuestion = data["third-question"];
      this.fourthQuestion = data["fourth-question"];
      this.completeLabel = data["complete-label"];
      this.firstButton = data["first-button"];
      this.firstDescription = data["first-description"];
      this.secondButton = data["second-button"];
      this.secondDescription = data["second-description"];
      this.tableCompany = data["company-name"];
      this.tableEnergy = data["energy-type"];
      this.tableMaterial = data["material-type"];
      this.tableSize = data["size"];
    },
    getCompanies() {
      axios.get(`site-owner`).then((data) => {
        this.companies = data.data.data;
        this.filteredCompanies = this.companies;
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/questionnaire-mobile.scss";
@import "../../assets/styles/main.scss";
.table-wizard {
  box-shadow: 0px 6px 30px #1d226f0d;
  padding: 15px 45px 30px;
  border-radius: 15px;
}
.table {
  margin: 0 auto;
  width: 100%;
  th {
    border-top: none;
    border-bottom: 1px solid #f4f4f4;
    font-family: $font__IBM;
    font-weight: 700;
    font-size: 14px;
    color: #333333;
  }
  td {
    border: none;
    p {
      font-family: $font__IBM;
      font-weight: 700;
      font-size: 12px;
      color: #9597ac;
    }
    .image {
      margin-right: 10px;
    }
  }
}
</style>