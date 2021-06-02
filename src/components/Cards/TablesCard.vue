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
          <div class="card need-waiter" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">12</h2>
            </div>
          </div>

          <div class="card need-waiter" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">3</h2>
            </div>
          </div>

          <div class="card need-waiter" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">7</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">1</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">2</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">3</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">8</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">6</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">9</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">4</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">5</h2>
            </div>
          </div>

          <div class="card" style="width: 18rem">
            <div class="card-body">
              <h2 class="card-title">6</h2>
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
      data: []
    };
  },
  mounted() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => (this.data = response))
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
    flex: 0 0 200px;
}

.tables .need-waiter {
    animation: shadow-alert 2s infinite;
}

.tables .card-body {
  position: relative;
  z-index: 100;
  background: url("../../../public/img/theme/table_texture.jpg") no-repeat center center;
  background-size: cover;
}

.tables .card-title {
  font-size: 150px;
  text-align: center;
  color: #741922;
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