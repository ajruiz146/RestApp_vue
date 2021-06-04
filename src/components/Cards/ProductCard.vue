<template>
  <div class="card shadow">
    <div class="card-header bg-transparent">
      <h3 class="mb-0">Products</h3>
      <i class="ni ni-fat-add reset-form" data-toggle="modal" data-target="#productCreate"></i>
      <div class="filters">
        <select class="form-select form-select-sm" @change="onChangeFilter($event)" name="" id="">
          <option value="">Select type</option>
          <option value="s">Starters</option>
          <option value="p">Principal</option>
          <option value="d">Drinks</option>
          <option value="de">Dessert</option>
        </select>
        <select class="form-select form-select-sm" @change="onChangeOrder($event)" name="" id="">
          <option value="">Order by</option>
          <option value="na">Name Asc</option>
          <option value="nd">Name Desc</option>
          <option value="pa">Price Asc</option>
          <option value="pd">Price Desc</option>
        </select>
      </div>
    </div>
    <div class="card-body">
      <div class="wrapper wrapper-products" v-if="data">
        <div class="row staff">
          <div class="card" style="width: 18rem" v-for="item in data" :key="item._id">
            <div class="card-img-top" />
            <div class="profile-thumb-block">
              <img v-bind:src="item.image_url" alt="profile-image" class="profile"/>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <div class="flex-price-cat">
                <p class="card-text">{{ item.price }} $</p>
                <p class="card-text">{{ item.category}}</p>
              </div>
              <p class="card-text">{{ item.description }}</p>
              <div class="cards-buttons">
                <a href="javascript:void(0)" @click="updateModal(item.id, item.name, item.price, item.description, item.image_url, item.category)" id="editButton" data-toggle="modal" data-target="#productEdit"><img src="img/icons/icon_edit_red.svg" alt="icon-edit"></a>
                <a href="javascript:void(0)" @click="deleteModal(item.id, item.name)" data-toggle="modal" data-target="#productDelete"><img src="img/icons/icon_trash_red.svg" alt="icon-delete"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-end" :class="type === 'dark' ? 'bg-transparent' : ''"></div>
    </div>
    <div class="pagination">
      <div class="pagination justify-content-center mt-5">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item">
                <a class="page-link" @click="pageDown()">&lt;</a>
            </li>
            <li v-for="index in totalPages" :key="index" :class="index == page ? 'page-item active' : 'page-item'">
                <a class="page-link" @click="searchPage(index)">{{ index }}</a>
            </li>
            <li class="page-item">
                <a class="page-link" @click="pageUp()">&gt;</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <!-- Modals --> 
    <!-- Create -->
    <div class="modal fade" id="productCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Create product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-product-create">
              <div class="form-group">
                <label for="modal-name">Product Name</label>
                <input type="text" class="form-control" id="create-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Product Price</label>
                <input type="text" class="form-control" id="create-price">
              </div>
              <div class="form-group">
                <label for="modal-description">Product Description</label>
                <input type="text" class="form-control" id="create-description">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Product Image</label>
                <input type="file" class="form-control" id="create-image_url">
              </div>
              <div class="form-group">
                <label for="modal-price">Product Category</label>
                <select id="create-product-select" class="form-select">
                  <option value="Sin Categoría">Select category</option>
                  <option v-for="category in categories" :key="category.id" :v-bind:value="category.name">
                    {{ category.name }}
                  </option> 
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createProduct()" type="button" id="create-product-save" class="btn btn-primary save-button">Create product</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Update -->
    <div class="modal fade" id="productEdit" tabindex="-1" role="dialog" aria-labelledby="productEditTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="form-product-update">
              <div class="form-group">
                <input type="hidden" class="form-control" id="modal-id">
              </div>
              <div class="form-group">
                <input type="hidden" class="form-control" id="modal-previous-img">
              </div>
              <div class="form-group">
                <input type="hidden" class="form-control" id="modal-category">
              </div>
              <div class="form-group">
                <label for="modal-name">Product Name</label>
                <input type="text" class="form-control" id="modal-name">
              </div>
              <div class="form-group">
                <label for="modal-price">Product Price</label>
                <input type="text" class="form-control" id="modal-price">
              </div>
              <div class="form-group">
                <label for="modal-description">Product Description</label>
                <input type="text" class="form-control" id="modal-description">
              </div>
              <div class="form-group">
                <label for="modal-image_url">Product Image</label>
                <input type="file" class="form-control" id="modal-image_url">
              </div>
              <div class="form-group">
                <label for="modal-price">Product Category</label>
                <select id="update-product-select" class="form-select" v-model="selected">
                  <option v-for="category in categories" :key="category.id" :v-bind:value="category.name">
                    {{ category.name }}
                  </option> 
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" id="update-product-save" type="button" class="btn btn-primary save-button">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Delete -->
    <div class="modal fade" id="productDelete" tabindex="-1" role="dialog" aria-labelledby="productDeleteTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit product</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4 id="title-delete">Are you sure about delete </h4>
          </div>
          <div class="form-group">
            <input type="hidden" class="form-control" id="delete-id">
          </div>
          <div class="form-group">
            <input type="hidden" class="form-control" id="delete-name">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="deleteProduct()" type="button" id="delete-product-save" class="btn btn-primary save-button">Delete product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import paginate from '@/mixins/paginate-products'
import filters from '@/mixins/filters-products'

export default {
  name: "ProductCards",
  mixins: [paginate, filters],
  data() {
    return {
      page: 1,
      data: [],
    }
  },
  methods: {
    getProducts: function() {
      axios.post(process.env.VUE_APP_API + "product", {
        page: this.page,
        sort: {
          field: this.field,
          order: this.order
        },
        where: {
          field: this.fieldWhere,
          value: this.value
        }
      })
      .then((respuesta) => {
        this.data = respuesta.data.object
        this.totalPages = respuesta.data.pages
        this.page = respuesta.data.current
      }, (error) => {
        console.log(error);
      });
    },
    updateProduct: function() {
      if($("#modal-image_url").val() != "") {
        this.uploadFile()
      } else {
        let img = $("#modal-previous-img").val()
        let imgAux = img.split("/");
        this.updateProductValues(imgAux[imgAux.length - 1])
      }
    },
    uploadFile: function() {
      var file = $('#modal-image_url').prop('files')[0];
      var filename = null;
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(process.env.VUE_APP_API + "upload", formData)
        .then((result) => {
          filename = result.data.filename
          this.updateProductValues(filename)
        }, (error) => (console.log(error)));
    },
    updateProductValues: function(filename) {
      let id = $('#modal-id').val();
      let name = $('#modal-name').val();
      let price = $('#modal-price').val();
      let description = $('#modal-description').val();
      let category = $("#update-product-select").val();
      
      axios
        .put(process.env.VUE_APP_API + "product/" + id, { 
          id: id,
          name: name,
          price: price,
          description: description,
          image_url: filename,
          category: category
        })
        .then(() => {
          this.getProducts()
        }, (error) => {
          console.log(error);
        });
    },
    updateModal: function(id, name, price, description, image_url, category) {
      $("#modal-id").val(id);
      $("#modal-name").val(name);
      $("#modal-price").val(price);
      $("#modal-description").val(description);
      $("#modal-previous-img").val(image_url);
      $("#update-product-select").val(category);
    },
    deleteModal: function(id, name) {
      $("#delete-id").val(id);
      $("#delete-name").val(name);
      $("#title-delete").text("Are you sure about delete " + name + " product")
    },
    deleteProduct: function() {
      let id = $("#delete-id").val();
      axios
        .delete(process.env.VUE_APP_API + "product/" + id)
        .then(() => {
          this.getProducts()
        }, (error) => {
          console.log(error);
        });
    },
    createProduct: function() {
      if($("#create-image_url").val() != "") {
        this.createUploadFile()
      } else {
        let img = 'default'
        this.createProductValues(img)
      }
    },
    createUploadFile: function() {
      var file = $('#create-image_url').prop('files')[0];
      var filename = null;
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post(process.env.VUE_APP_API + "upload", formData)
        .then((result) => {
          filename = result.data.filename
          this.createProductValues(filename)
        }, (error) => (console.log(error)));
    },
    createProductValues: function(filename) {
      let name = $('#create-name').val();
      let price = $('#create-price').val();
      let description = $('#create-description').val();
      let category = $("#create-product-select").val();
      
      axios
        .post(process.env.VUE_APP_API + "product/create", {
          name: name,
          price: price,
          description: description,
          image_url: filename,
          category: category
        })
        .then(() => {
          this.getProducts()
        }, (error) => {
          console.log(error);
        });
    },
    getCategories: function() {
      axios.get(process.env.VUE_APP_API + "category").then((response) => this.categories = response.data);
    }
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  beforeCreate() {
    /*
    axios
    .post(process.env.VUE_APP_API + "user/myUser",{}, {
      headers: {
      "x-access-token": localStorage.token
    }}).then((response) => {
      console.log(response)
      if(response.data.role != "client") {
        this.$router.push("/login")
      }
    })
    */
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);

select {
    margin: 0 3px;
}
.filters {
    display: flex;
}

.ni-fat-add {
  cursor: pointer;
  font-size: 1.5em;
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

*, *:before, *:after {
  box-sizing: border-box;
}
/*

body {
  background: #383A3F;
  font-family: "Varela Round", sans-serif;
}

.wrapper-products .card {
  background: #1F2124;
  box-shadow: 0 0 20px rgba(0,0,0,0.4);
  border-radius: 5px;
  margin: 50px 20px 20px 20px;
  width: 21%;
  margin: 2%;
  padding: 20px;
  text-align: center;
  color: white;
  float: left;
  }

.wrapper-products  .title {
    font-size: 25px;
  }

.wrapper-products  .icon {
    margin: 50px 0;
    width: 100%;
  }

  .wrapper-products .icon svg path {
    fill: #F6B352
  }
  .wrapper-products .icon svg {
    width: 100px;
    height: 100px;
  }

  .wrapper-products .features ul {
    padding: 0;
    margin: 20px 0 50px 0;
    list-style-type: none;
  }

  .wrapper-products .features ul li {
    margin: 10px 0;
    font-size: 14px;
  }

  .wrapper-products .features ul li span {
    border-bottom: 2px dotted #F6B352;
  }

  .wrapper-products .btn {
    width: 45%;
    display: block;
    background: #F6B352;
    color: white;
    padding: 15px 20px;
    margin: 20px 0;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.9);
    transition: all 200ms ease-in-out;
    text-decoration: none;
  }

  .wrapper-products .btn :hover {
    background: #F68657;
  }

  .wrapper-products .buttons {
    display: flex;
    justify-content: center;
  }

  .wrapper-products .product-image {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  .wrapper-products .icon {
    margin-top: 20px;
    margin-bottom: 90px;
  }

  .wrapper-products label {
    color: black !important;
  }

  @media screen and (max-width: 738px) {
    .wrapper-products .card {
      margin: 10px 20px;
      width: calc(100% - 40px);
    }
  }
*/
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
  height: 100px;
  opacity: 1;
  object-fit: cover;
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
  width: 30px;
  height: 30px;
}

.staff .text-black {
  color: black;
  font-size: 24px;
}

.staff .flex-price-cat {
  display: flex;
  justify-content: space-evenly;
}

@media screen and (max-width: 710px) {
  .staff .card {
    min-width: none;
    max-width: none;
    width: 100%;
  }
}
</style>