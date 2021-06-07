<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <div class="flex-create reset-form" data-toggle="modal" data-target="#staffCreate">
        <h3 class="mb-0">Staff</h3>
        <i class="ni ni-fat-add"></i>
      </div>

      <div class="filters">
        <input type="search" class="form-control form-control-sm" id="search-staff" placeholder="Search staff" @keyup="contain()">
        <select class="form-select form-select-sm" @change="onChangeFilter($event)">
          <option value="">Select Staff</option>
          <option value="waiter">Waiter</option>
          <option value="kitchen">Kitchen</option>
          <option value="bar">Bar</option>
        </select>
        <select class="form-select form-select-sm" @change="onChangeOrder($event)">
          <option value="">Order by</option>
          <option value="na">Name Asc</option>
          <option value="nd">Name Desc</option>
          <option value="ra">Role Asc</option>
          <option value="rd">Role Desc</option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <div v-if="success" class="alert alert-success" role="alert">
        Success operation!
      </div>
      <div v-if="error" class="alert alert-danger" role="alert">
        Email already taken!
      </div>
      <div v-if="info" class="alert alert-warning" role="alert">
        Insert correct values on fields
      </div>
      <div class="wrapper">
        <div class="row staff">
          <div class="card" style="width: 18rem" v-for="item in staff" :key="item._id">
            <div class="card-img-top" />
            <div class="profile-thumb-block">
              <img v-bind:src="'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) + '.jpg'" alt="profile-image" class="profile"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">{{ item.email }}</p>
              <p class="card-text">{{ item.role}}</p>
              <div class="cards-buttons">
                <a href="javascript:void(0)" @click="updateModal(item._id, item.name, item.lastName, item.email, item.role)" data-toggle="modal" data-target="#staffUpdate"><img src="img/icons/icon_edit_red.svg" alt="icon-edit"></a>
                <a href="javascript:void(0)" @click="updateModalDelete(item._id, item.name, item.role)" data-toggle="modal" data-target="#staffDelete"><img @click="updateModalDelete(item._id, item.name)" data-toggle="modal" data-target="#staffDelete" src="img/icons/icon_trash_red.svg" alt="icon-delete"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
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
    <!-- Modals -->
    <!-- Create -->
    <div class="modal fade" id="staffCreate" tabindex="-1" role="dialog" aria-labelledby="ordersCreateTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-staff-create">
              <div class="form-group">
                <label for="modal-name">Name</label>
                <input type="text" class="form-control" id="create-staff-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Last name</label>
                <input type="text" class="form-control" id="create-staff-lastName">
              </div>
              <div class="form-group">
                <label for="modal-description">Email</label>
                <input type="email" class="form-control" id="create-staff-email">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Password</label>
                <input type="password" class="form-control" id="create-staff-password">
              </div>
              <div class="form-group">
                <label for="modal-price">Role</label>
                <select id="create-staff-role" class="form-select">
                  <option value="waiter">Waiter</option>
                  <option value="bar">Bar</option>
                  <option value="kitchen">Kitchen</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createStaff()" id="createOrderSave" type="button" class="btn btn-primary save-button">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Update -->
    <div class="modal fade" id="staffUpdate" tabindex="-1" role="dialog" aria-labelledby="ordersCreateTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-staff-update">
              <div class="form-group">
                <input type="hidden" class="form-control" id="update-staff-id">
              </div>
              <div class="form-group">
                <label for="modal-name">Name</label>
                <input type="text" class="form-control" id="update-staff-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Last name</label>
                <input type="text" class="form-control" id="update-staff-lastName">
              </div>
              <div class="form-group">
                <label for="modal-description">Email</label>
                <input type="email" class="form-control" id="update-staff-email">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Password</label>
                <input type="password" class="form-control" id="update-staff-password">
              </div>
              <div class="form-group">
                <label for="modal-price">Role</label>
                <select id="update-staff-role" class="form-select">
                  <option value="bar">Bar</option>
                  <option value="waiter">Waiter</option>
                  <option value="client">Client</option>
                  <option value="kitchen">Kitchen</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateStaff()" id="createOrderSave" type="button" class="btn btn-primary save-button">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete -->
    <div class="modal fade" id="staffDelete" tabindex="-1" role="dialog" aria-labelledby="staffDeleteTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Delete staff</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input type="hidden" class="form-control" id="delete-staff-id">
            </div>
            <h4 id="delete-staff-text"></h4>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="deleteStaff()" id="delete-user-save" type="button" class="btn btn-primary save-button">Delete User</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import $ from "jquery";
import axios from "axios";
import filters from '@/mixins/filters-staff'
import paginate from '@/mixins/paginate-staff'

export default {
  data() {
    return {
      page: 1,
      staff: [],
      totalPages: [],
      search: "",
      success: 0,
      error: 0,
      info: 0
    };
  },
  methods: {
    getStaff: function() {
      axios
      .post(process.env.VUE_APP_API + "user/staff", {
        page: this.page,
        where: {
          field: this.fieldWhere,
          value: this.value
        },
        sort: {
          field: this.field,
          order: this.order
        },
        contains: this.search,
      }, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.totalPages = response.data.pages
        this.page = response.data.current
        this.staff = response.data.object
        setTimeout(this.defaultAlerts, 3000);
      }) 
    },
    createStaff: function() {
      let name = $("#create-staff-name").val()
      let lastName = $("#create-staff-lastName").val()
      let email = $("#create-staff-email").val()
      let password = $("#create-staff-password").val()
      let role = $("#create-staff-role").val()
      if(this.checkModal(name, lastName, email, password, role, "create")) {
        axios
        .post(process.env.VUE_APP_API + "auth/signup", {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          role: role
        }, {
          headers: {
            "x-access-token": localStorage.token
          }
        })
        .then(() => {
          this.getStaff()
          this.success = 1
        }, () => {
          this.getStaff()
          this.error = 1
        })
      } else {
        this.getStaff()
        this.info = 1
      }
    },
    updateStaff: function() {
      let id = $("#update-staff-id").val()
      let name = $("#update-staff-name").val()
      let lastName = $("#update-staff-lastName").val()
      let email = $("#update-staff-email").val()
      let password = $("#update-staff-password").val()
      let role = $("#update-staff-role").val()
      if(this.checkModal(name, lastName, email, password, role, "update")) {
      axios
        .put(process.env.VUE_APP_API + "user/" + id, {
          name: name,
          lastName: lastName,
          email: email,
          password: password,
          role: role
        }, {
          headers: {
            "x-access-token": localStorage.token
          }
        })
        .then(() => {
          this.getStaff()
          this.success = 1
        }, () => {
          this.getStaff()
          this.error = 1
        })
      } else {
        this.getStaff()
        this.info = 1
      }
      
    },
    deleteStaff:function() {
      let id = $("#delete-staff-id").val()
      axios.delete(process.env.VUE_APP_API + "user/deleteStaff/" + id, {
        headers: {
          "x-access-token": localStorage.token
        },
        data: {
          where: {
            field: this.fieldWhere,
            value: this.value
          },
          contains: this.search,
        }
      }).then((response) => {
        if(this.totalPages > response.data.pages) {
            this.page = response.data.pages
        }
        this.getStaff()
        this.success = 1
      })
    },
    updateModal: function(id, name, lastName, email, role) {
      $("#update-staff-id").val(id)
      $("#update-staff-name").val(name)
      $("#update-staff-lastName").val(lastName)
      $("#update-staff-email").val(email)
      $("#update-staff-role").val(role)
    },
    updateModalDelete: function(id, name, role){
      $("#delete-staff-id").val(id)
      $("#delete-staff-text").text("Are you sure to delete " + name + " with role " + role + "?")
    },
    contain: function() {
      this.search = $("#search-staff").val()
      this.getStaff();
    },
    defaultAlerts: function() {
      this.success = 0
      this.error = 0
      this.info = 0
    },
    checkModal: function(name, lastName, email, password, role, mode) {
      let status = true
      if(name == "") {
        status = false
      } else if(lastName == "") {
        status = false
      } else if(email == "") {
        status = false
      } else if(password == "" && mode == "create") {
        status = false
      } else if(role == "") {
        status = false
      }
  
      return status
    }
  },
  mixins: [paginate, filters],
  mounted() {
    this.getStaff();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;500&display=swap");

.flex-create {
  display: flex;
  cursor: pointer;
  align-items: center;
}


.ds {
  display: none;
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
  position: relative;
  top: -1px;
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

/* A partir de aquí */
.staff .card-img-top {
  height: 110px;
  width: 100%;
  overflow: hidden;
  background-color: #172b4d !important;
}

.staff .card {
  overflow: hidden;
    height: 380px;
    margin: 0.7em 0.7em;
    padding: 0;
    box-shadow: 1px 1px 4px rgb(128 128 128 / 29%);
    flex: 1 0 300px;
    max-width: 366px;
}

.staff .card-body {
  position: relative;
  z-index: 100;
}

.staff .card-body::before {
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

.staff .profile {
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

.staff .card-title {
  font-size: 25px;
  padding-top: 22px;
  text-align: center;
}

.staff .card-text {
  text-align: center;
}

.staff .cards-buttons {
  position: absolute;
  bottom: 23px;
  left: 0;
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.staff .cards-buttons .edit {
  background-color:#898989;
}

.staff .cards-buttons .delete {
  background-color:#898989;
}

.staff .cards-buttons a img {
  width: 25px;
  height: 25px;
}

.staff .text-black {
  color: black;
  font-size: 24px;
}


@media screen and (max-width: 995px) {
  .staff {
    justify-content: center;
  }
  .staff .card {
    flex: 1 0 260px;
  }
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

@media screen and (max-width: 400px) {
  .staff .card {
    min-width: none;
    max-width: none;
    width: 100%;
  }
}


</style>