<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <div class="flex-create">
        <h3 class="mb-0">Users</h3>
        <i class="ni ni-fat-add reset-form" data-toggle="modal" data-target="#userCreate"></i>
      </div>
      <div class="filters">
        <input type="search" class="form-control form-control-sm" id="search-user" placeholder="Searh product" @keyup="contain()">
        <select class="form-select form-select-sm" @change="onChangeOrder($event)" name="" id="">
          <option value="">Order by</option>
          <option value="na">Name Asc</option>
          <option value="nd">Name Desc</option>
          <option value="ea">Email Asc</option>
          <option value="ed">Email Desc</option>
        </select>
      </div>
    </div>
    <div class="card-body" >
      <div class="responsive-table" style="overflow-x:auto;">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Created</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            <tr   
            v-for="item in data" 
            :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.lastName }}</td>
              <td>{{ item.email }}</td>     
              <td>{{ item.createdAt.substring(0, 10) }}</td>
              <td>
                <div class="dropdown">
                  <button @click="dropMenu($event)" :data-id="item.id" class="drop-button">&mldr;</button>
                  <div id="myDropdown" class="dropdown-content">
                    <a href="javascript:void(0)" @click="updateModal(item._id, item.name, item.lastName, item.email, item.role)" data-toggle="modal" data-target="#userEdit" class="reset-form"><i @click="updateModal(item._id, item.name, item.lastName, item.email, item.role)" data-toggle="modal" data-target="#userEdit" class="ni ni-ruler-pencil reset-form"></i></a>
                    <a href="javascript:void(0)" data-toggle="modal" data-target="#userDelete" @click="updateDeleteModal(item._id, item.name)"><i data-toggle="modal" data-target="#userDelete" @click="updateDeleteModal(item._id, item.name)" class="ni ni-basket"></i></a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card-footer d-flex justify-content-center" :class="type === 'dark' ? 'bg-transparent' : ''">
        <div class="pagination">
          <div class="pagination justify-content-center mt-5">
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" @click="pageDown()">&lt;</a>
                </li>
                <li v-if="page > 2" class="page-item">
                  <a class="page-link" @click="searchPage(1)">1</a>
                </li>
                <li v-if="page > 3" class="page-item">
                  <a class="page-link">...</a>
                </li>
                <li v-for="index in totalPages" :key="index" :class="[index == page ? 'page-item active' : 'page-item', Math.abs(index - page) > 1 ? 'ds' : '']">
                  <a class="page-link" @click="searchPage(index)">{{ index }}</a>
                </li>
                <li v-if="page < totalPages - 2" class="page-item">
                  <a class="page-link">...</a>
                </li>
                <li v-if="page < totalPages - 1" class="page-item">
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
    <!-- Edit -->
    <div class="modal fade" id="userEdit" tabindex="-1" role="dialog" aria-labelledby="userEditTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
            <form id="form-user-create">
              <div class="form-group">
                <input type="hidden" class="form-control" id="edit-user-id">
              </div>
              <div class="form-group">
                <label for="modal-name">Name</label>
                <input type="text" class="form-control" id="edit-user-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Last name</label>
                <input type="text" class="form-control" id="edit-user-lastName">
              </div>
              <div class="form-group">
                <label for="modal-description">Email</label>
                <input type="email" class="form-control" id="edit-user-email">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Password</label>
                <input type="password" class="form-control" id="edit-user-password">
              </div>
              <div class="form-group">
                <label for="modal-price">Role</label>
                <select id="edit-user-role" class="form-select">
                  <option value="client">Client</option>
                  <option value="waiter">Waiter</option>
                  <option value="bar">Bar</option>
                  <option value="kitchen">Kitchen</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateUser()" id="update-user-save" type="button" class="btn btn-primary save-button">Save changes</button>
          </div>
        </div>
      </div>
    </div>
      <!-- Create -->
    <div class="modal fade" id="userCreate" tabindex="-1" role="dialog" aria-labelledby="userCreateTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-user-create">
              <div class="form-group">
                <input type="hidden" class="form-control" id="create-user-id">
              </div>
              <div class="form-group">
                <label for="modal-name">Name</label>
                <input type="text" class="form-control" id="create-user-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Last name</label>
                <input type="text" class="form-control" id="create-user-lastName">
              </div>
              <div class="form-group">
                <label for="modal-description">Email</label>
                <input type="email" class="form-control" id="create-user-email">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Password</label>
                <input type="password" class="form-control" id="create-user-password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createUser()" type="button" id="create-user-save" class="btn btn-primary save-button">Save user</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete -->
    <div class="modal fade" id="userDelete" tabindex="-1" role="dialog" aria-labelledby="userDeleteTitle" aria-hidden="true">
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
              <input type="hidden" class="form-control" id="delete-user-id">
            </div>
            <h4 id="delete-user-text"></h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="deleteUser()" id="delete-user-save" type="button" class="btn btn-primary save-button">Delete User</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import axios from "axios";
import filters from '@/mixins/filters-users'
import paginate from '@/mixins/paginate-users'

export default {
  data() {
    return {
      page: 1,
      data: [],
      search: "",
    };
  },
  mixins: [paginate, filters],
  methods: {
    dropMenu: function(event) {
      event.target.parentElement.lastChild.classList.toggle("show");
    },
    getUsers: function() {
      axios
      .post(process.env.VUE_APP_API + 'user', {
        page: this.page,
        where: {
          field: "role",
          value: "client"
        },
        sort: {
          field: this.field,
          order: this.order
        },
        contains: this.search,
      })
      .then(response => {
        this.data = response.data.object
        this.page = response.data.current
        this.totalPages = response.data.pages
      })
    },
    updateUser: function() {
      let id = $("#edit-user-id").val()
      let name = $("#edit-user-name").val()
      let lastName = $("#edit-user-lastName").val()
      let email = $("#edit-user-email").val()
      let password = $("#edit-user-password").val()
      let role = $("#edit-user-role").val()
      
      axios
      .put(process.env.VUE_APP_API + 'user/' + id, {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        role: role
      })
      .then((response) => {
        console.log(response)
        this.getUsers()
      })
      
    },
    deleteUser: function() {
      let id = $("#delete-user-id").val()
      axios
      .delete(process.env.VUE_APP_API + 'user/' + id)
      .then((response) => {
        console.log(response)
        this.getUsers()
      })
    },
    createUser: function() {
      let name = $("#create-user-name").val()
      let lastName = $("#create-user-lastName").val()
      let email = $("#create-user-email").val()
      let password = $("#create-user-password").val()

      axios
      .post(process.env.VUE_APP_API + "auth/signup", {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        role: "client"
      })
      .then((response) => {
        console.log(response)
        this.getUsers()
      })
    },
    updateModal: function(id, name, lastName, email, role) {
      $("#edit-user-id").val(id)
      $("#edit-user-name").val(name)
      $("#edit-user-lastName").val(lastName)
      $("#edit-user-email").val(email)
      $("#edit-user-password").val('')
      $("#edit-user-role").val(role);
    },
    updateDeleteModal: function(id, name) {
      $("#delete-user-id").val(id)
      $("#delete-user-text").text("Are you sure to delete " + name)
    },
    contain: function() {
      this.search = $("#search-user").val()
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers()
  },
  beforeMount() {
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

.ds {
  display: none;
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
  cursor: pointer;
  font-size: 1.5em;
  color: #741922;
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