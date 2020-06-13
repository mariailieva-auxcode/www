<template>
  <div class="suppliers">
    <router-link to="/">Go to News</router-link>
    <!-- <div class="w-50 p-3">
      <input type="number" placeholder="number filter" />
    </div>-->
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
    <div class="form-check category" v-for="(val, key, index) in categories" :key="index">
      <button class="btn" @click="filter(key)">{{key}}</button>
    </div>
    <div>
      <table class="table" border="2px">
        <thead>
          <th>Company Name</th>
          <th>Area</th>
        </thead>
        <tbody>
          <tr v-for="(supplier, key, index) in filteredSuppliers" :key="index">
            <td>{{supplier.companyName}}</td>
            <td>{{supplier.area}}</td>
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

  data() {
    return {
      areaSearch: "",
      nameSearch: "",
      suppliers: [],
      filteredSuppliers: [],
      categories: {}
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
    getAllCategories() {
      let distinctCategories = [
        ...new Set(
          [].concat.apply(
            [],
            this.suppliers.map(e => e.categories)
          )
        )
      ];
      this.categories = distinctCategories.reduce(
        (a, b) => ((a[b.toLowerCase()] = true), a),
        {}
      );
    }
  }
};
</script>