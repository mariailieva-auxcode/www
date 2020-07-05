<template>
  <div class="database">
    <div class="row">
      <h1>Database</h1>
    </div>
    <div class="row">
      <div class="col-6">
        <img src="../../public/assets/person-writing-on-notebook.png" />
      </div>
      <div class="col-6 text">
        <p>{{database.description}}</p>
        <button>
          <p>
            Coming soon
            <img src="../../public/assets/arrow-right-blue.png" />
          </p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import database from "js-yaml-loader!../../content/database.yaml";
export default {
  name: "Database",
  data() {
    return {
      database: {}
    };
  },
  mounted() {
    this.database = database;
  }
};
</script>

<style scoped lang="scss">
@import "../assets/styles/main.scss";
.database {
  .row {
    max-width: 80%;
    h1 {
      margin: 0 0 80px 80px;
    }
    .col-6 {
      p {
        text-align: center;
        font-size: 18px;
        color: #9597ac;
        margin-bottom: 50px;
      }
    }
    .text {
      margin-top: auto;
      margin-bottom: auto;
      button {
        width: 140px;
        height: 45px;
        border-radius: 10px;
        border: 2px solid #2783ff;
        background-color: white;
        p {
          color: #2783ff;
          font-size: 14px;
          margin: auto 0;
        }
      }
    }
  }
}
</style>