<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <h3 class="mb-0">Tables</h3>
    </div>
    <div class="card-body">
      <div v-if="success" class="alert alert-success" role="alert">
        Success operation!
      </div>
      <div class="wrapper">
        <div class="row tables">
          <!-- Inicio Card -->
          <!-- Esta es la carta de Staff por si quieres reutilizar partes, Te he traido abajo también el css -->
          <div :class="table.need_waiter ?  'card need-waiter' : 'card'" style="width: 18rem" v-for="table in tables" :key="table._id" @click="updateNeedWaiter(table._id)">
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
      tables: [],
      success: 0,
    };
  },
  methods: {
    getTables: function() {
      axios
        .get(process.env.VUE_APP_API + "table", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
        .then((response) => {
          this.tables = response.data
          setTimeout(this.defaultAlerts, 3000);
        })
    },
    updateNeedWaiter: function(id) {
      axios
        .post(process.env.VUE_APP_API + "table/turn/" + id, {}, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
        .then(() => {
          this.getTables()
          this.success = 1
        })
    },
    defaultAlerts: function() {
      this.success = 0
    },
  },
  mounted() {
    this.getTables()
  },
};
</script>

<style scoped>

.row {
  justify-content: center;
}

.card {
  cursor: pointer;
}

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
    height: 200px;
    margin: 0.7em 0.7em;
    padding: 0;
    box-shadow: 1px 1px 4px rgb(128 128 128 / 29%);
    flex: 0 0 170px;
    background: #d3d3d3a1;
}

.tables .need-waiter {
    animation: shadow-alert 2s infinite;
}

.tables .card-body {
  position: relative;
  z-index: 100;
  background: url("../../../public/img/theme/table-370x400.png") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tables .card-title {
    font-size: 60px;
    text-align: center;
    color: #172b4d;
    text-shadow: 2px 2px 1px #00000087;
    margin-bottom: 5.25rem;
}

@keyframes shadow-alert {
  0% {
      box-shadow: 0px 0px 10px #741922;
      border: 2px solid #741922;
  }

  20% {
      box-shadow: 0px 0px 20px #741922;
      border: 3px solid #741922;
  }

  100% {
      box-shadow: 0px 0px 10px #741922;
      border: 2px solid #741922;
  }
}
@media screen and (max-width: 768px) {
  .tables .card {
    flex: 1 0 170px;
  }
}
</style>