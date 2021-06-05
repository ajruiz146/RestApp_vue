<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <div data-toggle="modal" data-target="#ordersCreate" class="flex-create reset-form">
        <h3 class="mb-0">Orders</h3>
        <i class="ni ni-fat-add"></i>
      </div>
      <div class="filters">
        <select @change="onChangeOrder($event)" class="form-select form-select-sm" name="" id="">
          <option value="">Order by</option>
          <option value="da">Date Asc</option>
          <option value="dd">Date Desc</option>
          <option value="pa">Price Asc</option>
          <option value="pd">Price Desc</option>
        </select>
      </div>
    </div>
    <div class="card-body" >
      <div class="responsive-table" style="overflow-x:auto; width: 100%">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Client Mail</th>
              <th scope="col">Date</th>
              <th scope="col">Table</th>
              <th scope="col">Total Price</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item._id">
              <td>{{ item.user.email }}</td>
              <td>{{ item.date.substring(0, 10) }}</td>
              <td>{{ item.table.table_number }}</td>
              <td>{{ item.total }}</td>
              <td>
                <div class="dropdown">
                  <button @click="dropMenu($event)" :data-id="item.id" class="drop-button">&mldr;</button>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="javascript:void(0)" @click="updateModal(item._id, item.user, item.table, item.products, item.date)" data-toggle="modal" data-target="#orderUpdate"><i @click="updateModal(item._id, item.user, item.table, item.products)" data-toggle="modal" data-target="#orderUpdate" class="ni ni-ruler-pencil"></i></a>
                    <a href="javascript:void(0)" data-toggle="modal" data-target="#ordersDelete" @click="updateDeleteModal(item._id, item.user.email)"><i data-toggle="modal" data-target="#ordersDelete" @click="updateDeleteModal(item._id, item.name)" class="ni ni-basket"></i></a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <div class="pagination">
          <div class="pagination justify-content-center mt-5">
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" @click="pageDown()">&lt;</a>
                </li>
                <li v-if="page > 1" class="page-item">
                  <a class="page-link" @click="searchPage(1)">1</a>
                </li>
                <li v-if="page > 2" class="page-item">
                  <a class="page-link">...</a>
                </li>
                <li v-for="index in totalPages" :key="index" :class="[index == page ? 'page-item active' : 'page-item', Math.abs(index - page) > 0 ? 'ds' : '']">
                  <a class="page-link" @click="searchPage(index)">{{ index }}</a>
                </li>
                <li v-if="page < totalPages - 1" class="page-item">
                  <a class="page-link">...</a>
                </li>
                <li v-if="page < totalPages" class="page-item">
                  <a class="page-link" @click="searchPage(totalPages)">{{ totalPages }}</a>
                </li>
                <li class="page-item">
                  <a class="page-link" @click="pageUp()">&gt;</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <!-- Update -->
    <div class="modal fade" id="orderUpdate" tabindex="-1" role="dialog" aria-labelledby="orderUpdateTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-update-orders">
              <div class="form-group">
                <input type="hidden" class="form-control" id="update-order-id">
              </div>
              <div class="form-group">
                <label for="update-order-table">Table</label>
                <select id="update-order-table" class="form-select">
                  <option v-bind:value="item.table_number" v-for="item in tables" :key="item.id" :data-id="item._id">{{ item.table_number }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="update-order-user">User</label>
                <select id="update-order-user" class="form-select">
                  <option v-bind:value="item.name" v-for="item in users" :key="item.id" :data-id="item._id">{{ item.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="update-order-date">Date</label>
                <div class="date-time-container">
                  <input type="date" class="form-control" id="update-order-date">
                  <input type="time" class="form-control" id="update-order-time">
                </div>
              </div>
              <div class="card-body" style="padding:0;">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in products" :key="item._id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.price }}</td>
                      <td>
                        <input type="number" class="products-input-update" :data-name="item.name" :data-price="item.price" :data-zone="item.zone" min="0">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateOrder()" type="button" id="update-order-save" class="btn btn-primary save-button">Update Order</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Create -->
    <div class="modal fade" id="ordersCreate" tabindex="-1" role="dialog" aria-labelledby="ordersCreateTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-create-orders">
              <div class="form-group">
                <input type="hidden" class="form-control" id="create-user-id">
              </div>
              <div class="form-group">
                <label for="create-order-table">Table</label>
                <select id="create-order-table" class="form-select">
                  <option value="client" v-for="item in tables" :key="item.id" :data-id="item._id">{{ item.table_number }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="create-order-user">User</label>
                <select id="create-order-user" class="form-select">
                  <option value="client" v-for="item in users" :key="item.id" :data-id="item._id">{{ item.name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="create-order-date">Date</label>
                <div class="date-time-container">
                  <input type="date" class="form-control" id="create-order-date">
                  <input type="time" class="form-control" id="create-order-time">
                </div>
              </div>
              <div class="card-body" style="overflow-x:auto;">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in products" :key="item._id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.price }}</td>
                      <td>
                        <input type="number" class="products-input" :data-name="item.name" :data-price="item.price" :data-zone="item.zone" min="0">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createOrder()" id="createOrderSave" type="button" class="btn btn-primary save-button">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete -->
    <div class="modal fade" id="ordersDelete" tabindex="-1" role="dialog" aria-labelledby="ordersDeleteTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input type="hidden" class="form-control" id="delete-order-id">
            </div>
            <h4 id="delete-order-text"></h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="deleteOrder()" id="delete-orders-save" type="button" class="btn btn-primary save-button">Delete Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import $ from "jquery";
import paginate from '@/mixins/paginate-orders'
import filters from '@/mixins/filters-orders'

export default {
  data() {
    return {
      page: 1,
      data: [],
      users: [],
      tables: [],
      products: [],
      totalPages: [],
    };
  },
  methods: {
    dropMenu: function(event) {
      event.target.parentElement.lastChild.classList.toggle("show");
    },
    getOrders: function() {
      axios
      .post(process.env.VUE_APP_API + "order", {
        page: this.page,
        sort: {
          field: this.field,
          order: this.order
        }  
      }, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then(response => {
        this.page = response.data.current
        this.totalPages = response.data.pages
        this.data = response.data.object
      })
    },
    createOrder: function() {
      let date = $("#create-order-date").val()
      let time = $("#create-order-time").val()
      let dateTime = new Date(date + " " + time);
      if(dateTime == "Invalid Date") {
        dateTime = Date.now();
      }
      this.countProducts()
      axios
      .post(process.env.VUE_APP_API + "order/create", {
        table: this.tableSelected,
        user: this.userSelected,
        total: this.total,
        products: this.obtainProducts,
        date: dateTime,
      }, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then(() => {
        this.getOrders();
      })
    },
    updateOrder: function() {
      let date = $("#update-order-date").val();
      let time = $("#update-order-time").val();
      let dateTime = new Date(date + " " + time);
      this.countProductsUpdate()
      let id = $("#update-order-id").val()
      axios
      .put(process.env.VUE_APP_API + "order/" + id, {
        table: this.tableSelected,
        user: this.userSelected,
        total: this.total,
        products: this.obtainProducts,
        date: dateTime,
      })
      .then(() => {
        this.getOrders();
      })
    },
    updateModal: function(id, user, table, products, date) {
      let dateLocal = new Date(date)
      let currentHours = dateLocal.getHours();
      let currentMinutes = dateLocal.getMinutes();
      currentHours = ("0" + currentHours).slice(-2);
      currentMinutes = ("0" + currentMinutes).slice(-2);
      let time = currentHours+":"+currentMinutes;
      let auxDate = date.substring(0, 10)
      $("#update-order-id").val(id)
      $("#update-order-table").val(table.table_number);
      $("#update-order-user").val(user.name);
      $("#update-order-date").val(auxDate);
      $("#update-order-time").val(time);
      
      let inputClear = document.getElementsByClassName("products-input-update")
      for(let i = 0; i < inputClear.length; i ++) {
        for(let j = 0; j < products.length; j ++) {  
          if(inputClear[i].dataset.name == products[j].name) {
            inputClear[i].value = products[j].amount
          }
        } 
      }
    },
    updateDeleteModal: function(id, email) {
      $("#delete-order-id").val(id)
      $("#delete-order-text").text("Are you sure to delete order of " + email)
    },
    deleteOrder: function() {
      let id = $("#delete-order-id").val()
      axios
      .delete(process.env.VUE_APP_API + "order/" + id)
      .then((response) => {
        if(this.totalPages > response.data.pages) {
          this.page = response.data.pages
        }
        this.getOrders();
      })
    },
    getTables: function() {
      axios
      .get(process.env.VUE_APP_API + "table",)
      .then((response) => {
        this.tables = response.data
      })
    },
    getProducts: function() {
      axios
      .post(process.env.VUE_APP_API + "product")
      .then((response) => {
        this.products = response.data
      })
    },
    countProducts: function() {
      let products = [];
      let allProducts = document.getElementsByClassName("products-input");
      var total = 0;
      for(let i = 0; i < allProducts.length; i++) {
        if(allProducts[i].value > 0) {
          let product = new Object();
          product.name = allProducts[i].dataset.name,
          product.zone = allProducts[i].dataset.zone,
          product.price = allProducts[i].dataset.price,
          product.amount = allProducts[i].value
          total += (parseInt(allProducts[i].dataset.price) * allProducts[i].value)
          products.push(product)
        }
      }
      this.obtainProducts = products;
      this.total = total;
      this.userSelected = $("#create-order-user :selected").data("id");
      this.tableSelected = $("#create-order-table :selected").data("id");
    },
    countProductsUpdate: function() {
      let products = [];
      let allProducts = document.getElementsByClassName("products-input-update");
      var total = 0;
      for(let i = 0; i < allProducts.length; i++) {
        if(allProducts[i].value > 0) {
          let product = new Object();
          product.name = allProducts[i].dataset.name,
          product.zone = allProducts[i].dataset.zone,
          product.price = allProducts[i].dataset.price,
          product.amount = allProducts[i].value
          total += (parseInt(allProducts[i].dataset.price) * allProducts[i].value)
          products.push(product)
        }
      }
      this.obtainProducts = products;
      this.total = total;
      this.userSelected = $("#update-order-user :selected").data("id");
      this.tableSelected = $("#update-order-table :selected").data("id");
    },
    getUsers: function() {
      axios
      .post(process.env.VUE_APP_API + "user")
      .then(response => {
        this.users = response.data
      })
    }
  },
  mixins: [paginate, filters],
  mounted() {
    this.getOrders();
    this.getTables();
    this.getProducts();
    this.getUsers();
    

  },
  beforeCreate() {

    /*
    if(!localStorage.token) {
      this.$router.push("/login")
    }
    */
  }
};
</script>

<style scoped>

.flex-create {
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-bottom: 15px;
}

.date-time-container {
  display: flex;
}

.date-time-container input {
  width: 50%;
}

.ds {
  display: none;
}

.modal-body {
  padding-top: 0;
}

input[type="number"] {
  width:50px;
}

th {
  color: #741922;
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


  /*Botón*/
.drop-button{
  background-color: #741922;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

/*Botón hover y focus*/
.drop-button:hover, drop-buttton:hover{
  background-color: #741922;
}

/*Posición del contenedor*/
.dropdown{
  position: relative;
  display: inline-block;
 }

/*submenu*/
.dropdown-content{
  display: none;
  position: absolute;
  left: 40px;
  top: -15px;
  min-width: 80px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a{
  color: #741922;
  background: white;
  padding: 7px 10px;
  display: block;
  text-align: center;
}
.dropdown-content a:first-child {
  border-bottom: 1px solid #741922;
}

.dropdown-content a:hover{
  background-color: #f1f1f1
}
.show {
  display: block;
}

.ni-fat-add {
  cursor: pointer;
  font-size: 1.5em;
  color: #741922;
  position: relative;
  top: -1px;
}

td {
  vertical-align: middle !important;
}

@media screen and (max-width: 650px) {
  .card-header {
    flex-direction: column;
    align-items: center;
  }

  .card-header .filters {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-header .filters input, .card-header .filters select {
    margin: 3px 3px;
  }
}
</style>