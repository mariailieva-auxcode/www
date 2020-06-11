<template>
  <div class="supliers">
    <router-link to="/">Go to News</router-link>
    <!-- <div class="w-50 p-3">
      <input type="number" placeholder="number filter" />
    </div>-->
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Max Area Filter</span>
      </div>
      <input type="number" class="form-control" aria-label="Max Area" @input="filteredSupliers" />
    </div>
    <div>
      <table class="table" border="2px">
        <thead>
          <th>Company Name</th>
          <th>Area</th>
        </thead>
        <tbody>
          <tr v-for="(suplier, key, index) in filteredSupliers" :key="index">
            <td>{{suplier.companyName}}</td>
            <td>{{suplier.area}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import info from "js-yaml-loader!../../supliers.yaml";
export default {
  name: "Supliers",

  data() {
    return {
      supliers: [],
      filteredSupliers: []
    };
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.supliers = info;
      this.filteredSupliers = info;
    }
  }
};
</script>