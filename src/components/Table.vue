<template>
  <div class="suppliers">
    <router-link to="/">Go to News</router-link>
    <div>
      <router-link to="resize">Drag/resizing Page</router-link>
    </div>
    <div class="input-group mb-3 row">
      <div class="input-group-prepend">
        <span class="input-group-text">Max Area Filter</span>
      </div>
      <input
        type="number"
        placeholder="Search..."
        class="form-control"
        aria-label="Max Area"
        v-model="areaSearch"
        @input="filterByArea"
      />
    </div>
    <div class="input-group mb-3 row">
      <span class="input-group-text">Company Name</span>
      <input
        type="text"
        placeholder="Search..."
        class="form-control"
        aria-label="Company Name"
        v-model="nameSearch"
        @input="filterByName"
      />
    </div>
    <div class="d-flex">
      <button
        class="btn"
        :class="showAll ? 'btn-primary' : 'btn-secondary'"
        @click="toggleAllCompanies()"
      >All</button>
      <div class="form-check" v-for="(val, key, index) in industry" :key="index">
        <button
          class="btn"
          :class="industry[key] && !showAll ? 'btn-primary' : 'btn-secondary'"
          @click="toggleFilter(key)"
        >{{key}}</button>
      </div>
    </div>
    <div>
      <table class="table" border="2px">
        <thead>
          <th>Company Name</th>
          <th>Free Area (m2)</th>
          <th>Industry</th>
        </thead>
        <tbody>
          <tr
            v-for="(supplier, key, index) in filteredSuppliers"
            :key="index"
            v-show="industry[supplier.industry]"
          >
            <td>{{supplier.companyName}}</td>
            <td>{{supplier.area}}</td>
            <td>{{supplier.industry}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../content/suppliers.yaml";
export default {
  name: "Suppliers",
  props: { industry: Object },

  data() {
    return {
      areaSearch: "",
      nameSearch: "",
      suppliers: [],
      filteredSuppliers: [],
      showAll: true
    };
  },

  beforeMount() {
    this.init();
  },

  methods: {
    init() {
      this.suppliers = info;
      this.filteredSuppliers = info;
      this.getAllCategories();
    },
    resize(area) {
      this.width = area;
      this.height = area;
    },

    filterByArea() {
      this.filteredSuppliers = this.suppliers.filter(
        supplier => !this.areaSearch || this.areaSearch >= supplier.area
      );
    },

    filterByName() {
      this.filteredSuppliers = this.suppliers.filter(
        supplier =>
          !this.nameSearch ||
          supplier.companyName
            .toLowerCase()
            .includes(this.nameSearch.toLowerCase())
      );
    },

    toggleAllCompanies(show = true) {
      Object.keys(this.industry).forEach(
        industryId => (this.industry[industryId] = show)
      );
      this.showAll = show;
    },

    toggleFilter(index) {
      if (this.showAll) this.toggleAllCompanies(false);
      this.industry[index] = !this.industry[index];

      const hasSelectedIndustryId = Object.values(this.industry).some(
        industryId => industryId == true
      );
      if (!hasSelectedIndustryId) this.toggleAllCompanies();
    },

    getAllCategories() {
      let industry = [
        ...new Set(
          [].concat.apply(
            [],
            this.suppliers.map(e => e.industry)
          )
        )
      ];
      this.industry = industry.reduce(
        (a, b) => ((a[b.toLowerCase()] = true), a),
        {}
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/main.scss";
</style>
