<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <h3 class="mb-0">Tables</h3>
      <div class="create-button">
        <i class="ni ni-fat-add"></i>
      </div>
      <div class="filters">
        <select class="form-select form-select-sm">
          <option value="">Select type</option>
          <option value="">Bar</option>
          <option value="">Kitchen</option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <div class="wrapper">
        <div class="row tables">
          <!-- Inicio Card -->
          <!-- Esta es la carta de Staff por si quieres reutilizar partes, Te he traido abajo también el css -->
          <div :class="table.need_waiter ?  'card need-waiter' : 'card'" style="width: 18rem" v-for="table in tables" :key="table._id">
            <div class="card-body">
              <h2 class="card-title">{{ table.table_number }}</h2>
            </div>
          </div>
          <!-- Fin Card -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      tables: []
    };
  },
  methods: {
    getTables: function() {
    axios
      .get(process.env.VUE_APP_API + "table")
      .then((response) => {
        console.log(response)
        this.tables = response.data
      })
    }
  },
  mounted() {
    this.getTables()
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);

.page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #741922;
    border-color: #741922;
}

.page-link {
  cursor: pointer;
}

.pagination {
  margin: 0 auto;
}

.ni-fat-add {
  cursor: pointer;
  font-size: 1.5em;
  color: #741922;
}

.ni-fat-add {
  vertical-align: middle;
  margin-bottom: 3px;
}

.ni-bold-down {
  cursor: pointer;
}

select {
  margin: 0 3px;
}

.filters {
  display: flex;
}

/* Cards Tables Css */

.tables .card {
  overflow: hidden;
    height: 300px;
    margin: 0.7em 0.7em;
    padding: 0;
    box-shadow: 1px 1px 4px rgb(128 128 128 / 29%);
    flex: 1 0 289px;
}

.tables .need-waiter {
    animation: shadow-alert 2s infinite;
}

.tables .card-body {
  position: relative;
  z-index: 100;
  background: url("../../../public/img/theme/table_texture.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tables .card-title {
  font-size: 100px;
  text-align: center;
  color: #172b4d;
  text-shadow: 1px 1px 1px #0000005c;
}

@keyframes shadow-alert {
  0% {
      box-shadow: 0px 0px 10px #741922;
  }
  20% {
      box-shadow: 0px 0px 20px #741922;
  }
  100% {
      box-shadow: 0px 0px 10px #741922;
  }
}

@media screen and (max-width: 710px) {
  .tables .card {
    width: 50%;
  }
}
</style>