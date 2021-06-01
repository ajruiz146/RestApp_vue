<template>

<div class="card shadow">
  <div class="card-header bg-transparent">
    <h3 class="mb-0">Orders</h3>
    <div class="create-button">
        <i data-toggle="modal" data-target="#ordersCreate" class="ni ni-fat-add"></i>
    </div>
    <div class="filters">
      <select @change="onChangeOrder($event)" class="form-select form-select-sm" name="" id="">
          <option value="">Order by</option>
          <option value="ea">Email Asc</option>
          <option value="ed">Email Desc</option>
          <option value="da">Date Asc</option>
          <option value="dd">Date Desc</option>
          <option value="pa">Price Asc</option>
          <option value="pd">Price Desc</option>
      </select>
    </div>
  </div>
  <div class="card-body">
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
        <tr   
        v-for="item in data" 
        :key="item._id">
          <td>{{ item.user.email }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.table.table_number }}</td>
          <td>{{ item.total }}</td>
          <td>
            <div class="dropdown">
              <button @click="dropMenu($event)" :data-id="item.id" class="drop-button">&mldr;</button>
              <div id="myDropdown" class="dropdown-content">
                <a href="javascript:void(0)" @click="updateModal(item._id, item.name, item.lastName, item.email, item.role)" data-toggle="modal" data-target="#userEdit"><i @click="updateModal(item._id, item.name, item.lastName, item.email, item.role)" data-toggle="modal" data-target="#userEdit" class="ni ni-ruler-pencil"></i></a>
                <a href="javascript:void(0)" data-toggle="modal" data-target="#ordersDelete" @click="updateDeleteModal(item._id, item.user.email)"><i data-toggle="modal" data-target="#userDelete" @click="updateDeleteModal(item._id, item.name)" class="ni ni-basket"></i></a>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
    <div class="pagination">
      <div class="pagination justify-content-center mt-5">
        <nav aria-label="...">
        <ul class="pagination">
            <li class="page-item">
                <a class="page-link" @click="pageDown()">&lt;</a>
            </li>
            <li 
            v-for="index in totalPages" :key="index"
            :class="index == page ? 'page-item active' : 'page-item'"
            >
                <a class="page-link" @click="searchPage(index)">{{ index }}</a>
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
            <form>
              <div class="form-group">
                  <input type="hidden" class="form-control" id="create-user-id">
              </div>
              <div class="form-group">
                  <label for="create-order-table">Table</label>
                  <select id="create-order-table">
                    <option value="client" v-for="item in tables" :key="item.id" :data-id="item._id">{{ item.table_number }}</option>
                </select>
              </div>
              <div class="form-group">
                  <label for="create-order-user">User</label>
                  <select id="create-order-user">
                    <option value="client" v-for="item in users" :key="item.id" :data-id="item._id">{{ item.name }}</option>
                </select>
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
                    <tr   
                    v-for="item in products" 
                    :key="item._id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.price }}</td>
                      <td>
                        <input type="number" id="products-input" class="products-input" :data-name="item.name" :data-price="item.price" :data-zone="item.zone" min="0">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createOrder()" type="button" class="btn btn-primary">Save changes</button>
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
            <button @click="deleteOrder()" type="button" class="btn btn-primary">Delete Order</button>
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
      data: '',
      page: 1,
      totalPages: null,
      tables: null,
      products: null,
      field: null,
      order: null
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
        },  
      })
      .then(response => {
        console.log(response)
        this.page = response.data.current
        this.totalPages = response.data.pages
        this.data = response.data.object
      })
    },
    createOrder: function() {
      this.countProducts()
      axios
      .post(process.env.VUE_APP_API + "order/create", {
        table: this.tableSelected,
        user: this.userSelected,
        total: this.total,
        products: this.obtainProducts
      })
      .then(() => {
        this.getOrders();
      })
    },
    updateDeleteModal: function(id, email) {
      $("#delete-order-id").val(id)
      $("#delete-order-text").text("Are you sure to delete order of " + email)
    },
    deleteOrder: function() {
      let id = $("#delete-order-id").val()
      axios
      .delete(process.env.VUE_APP_API + "order/" + id)
      .then(() => {
        this.getOrders();
      })
    },
    getTables: function() {
      axios
      .get(process.env.VUE_APP_API + "table",)
      .then(response => {
        console.log(response)
        this.tables = response.data
      })
    },
    getProducts: function() {
      axios
      .post(process.env.VUE_APP_API + "product")
      .then(response => {
        console.log(response)
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
    getUsers: function() {
      axios
      .post(process.env.VUE_APP_API + "user")
      .then(response => {
        console.log(response)
        console.log(response)
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
};
</script>

<style scoped>
input[type="number"] {
  width: 100px;
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
}

td {
  vertical-align: middle !important;
}
</style>