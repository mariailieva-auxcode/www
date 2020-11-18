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
        <tr v-for="company in companies" :key="company.data.companyName">
          <td>
            <p>{{company.data.companyName}}</p>
          </td>
          <td>
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/wind.svg"
              v-if="company.data.energy.includes('Wind')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/solar.svg"
              v-if="company.data.energy.includes('Solar')"
            />
          </td>
          <td>
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/roof.svg"
              v-if="company.data.material.includes('Roof')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/land.svg"
              v-if="company.data.material.includes('Land')"
            />
            <lazy-img
              class="image"
              :blur="30"
              src="/assets/water.svg"
              v-if="company.data.material.includes('Water')"
            />
          </td>
          <td>
            <p>{{company.data.size}}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import questionnaire from "@content/nl/site-owner/questionnaire.yaml";
import questionnaireEn from "@content/en/site-owner/questionnaire.yaml";
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
  props: {
    companies: { type: Array },
  },
  created() {
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
      this.tableCompany = data["company-name"];
      this.tableEnergy = data["energy-type"];
      this.tableMaterial = data["material-type"];
      this.tableSize = data["size"];
    },
  },
};
</script>

<style scoped lang="scss">
@import "@styles/questionnaire-mobile.scss";
@import "@styles/main.scss";
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