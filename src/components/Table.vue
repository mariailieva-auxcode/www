<template>
  <div class="suppliers">
    <router-link to="/">Go to News</router-link>
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
      <div class="form-check" v-for="(val, key, index) in companyid" :key="index">
        <button
          class="btn"
          :class="companyid[key] && !showAll ? 'btn-primary' : 'btn-secondary'"
          @click="toggleFilter(key)"
        >{{key}}</button>
      </div>
    </div>
    <div>
      <table class="table" border="2px">
        <thead>
          <th>Company Name</th>
          <th>Area</th>
          <th>Company ID</th>
        </thead>
        <tbody>
          <tr
            v-for="(supplier, key, index) in filteredSuppliers"
            :key="index"
            v-show="companyid[supplier.companyid]"
          >
            <td>{{supplier.companyName}}</td>
            <td>{{supplier.area}}</td>
            <td>{{supplier.companyid}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../suppliers.yaml";
export default {
  name: "Suppliers",
  props: { companyid: Object },

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
      Object.keys(this.companyid).forEach(
        companyId => (this.companyid[companyId] = show)
      );
      this.showAll = show;
    },

    toggleFilter(index) {
      if (this.showAll) this.toggleAllCompanies(false);
      this.companyid[index] = !this.companyid[index];

      const hasSelectedCompanyId = Object.values(this.companyid).some(
        companyId => companyId == true
      );
      if (!hasSelectedCompanyId) this.toggleAllCompanies();
    },

    getAllCategories() {
      let companyid = [
        ...new Set(
          [].concat.apply(
            [],
            this.suppliers.map(e => e.companyid)
          )
        )
      ];
      this.companyid = companyid.reduce(
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
