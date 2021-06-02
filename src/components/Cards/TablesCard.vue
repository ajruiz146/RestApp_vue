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
          <div class="card" style="width: 18rem">
            <div class="card-img-top" />
            <div class="profile-thumb-block">
              <img :src="'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg'" alt="profile-image" class="profile"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">Manolito Gafotas</h5>
              <p class="card-text">Waiter</p>
              <div class="cards-buttons">
                <a href="javascript:void(0)"><img src="img/icons/icon_edit.svg" alt="icon-edit"></a>
                <a href="javascript:void(0)"><img src="img/icons/icon_trash.svg" alt="icon-delete"></a>
              </div>
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

/* Card Staff Css */

.tables .card-img-top {
  height: 110px;
  width: 100%;
  overflow: hidden;
  background-color: #19746b;
}

.tables .card {
  overflow: hidden;
    height: 380px;
    margin: 0.7em 0.7em;
    padding: 0;
    box-shadow: 1px 1px 4px rgb(128 128 128 / 29%);
    flex: 1 0 300px;
    max-width: 366px;
}

.tables .card-body {
  position: relative;
  z-index: 100;
}

.tables .card-body::before {
  content: "";
  display: block;
  width: 114%;
  height: 25%;
  position: absolute;
  top: -23px;
  left: 2px;
  transform: rotate(-7deg);
  background: white;
  z-index: -1;
}

.tables .profile {
  border-radius: 50%;
  position: absolute;
  top: 30px;
  left: 50%;
  max-width: 100px;
  opacity: 1;
  box-shadow: 3px 3px 20px rgb(0 0 0 / 50%);
  border: 2px solid rgba(255, 255, 255, 1);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  z-index: 101;
}

.tables .card-title {
  font-size: 25px;
  padding-top: 22px;
  text-align: center;
}

.tables .card-text {
  text-align: center;
}

.tables .cards-buttons {
  position: absolute;
  bottom: 23px;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.tables .cards-buttons .edit {
  background-color:#898989;
}

.tables .cards-buttons .delete {
  background-color:#898989;
}

.tables .cards-buttons a img {
  width: 30px;
  height: 30px;
}

.tables .text-black {
  color: black;
  font-size: 24px;
}

@media screen and (max-width: 710px) {
  .tables .card {
    min-width: none;
    max-width: none;
    width: 100%;
  }
}
</style>