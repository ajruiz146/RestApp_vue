<template>

<div class="wrapper" v-if="data">
  <div class="card" 
  v-for="item in data" 
  :key="item.id"
  >
    <div class="title">{{ item.name }}</div>
    <div class="icon">
      <img class="product-image" v-bind:src="item.image_url" alt=""/>
    </div>
    <div class="buttons">
      <a @click="updateModal(item.id, item.name, item.price, item.description, item.image_url)" id="editButton" data-toggle="modal" data-target="#productEdit" href="#" class="btn">Edit</a>
      <a @click="deleteModal(item.id, item.name)" href="javascript:void(0)" class="btn" data-toggle="modal" data-target="#productDelete">Delete</a>
    </div>
  </div>

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
            <form>
              <div class="form-group">
                  <input type="hidden" class="form-control" id="modal-id">
              </div>
              <div class="form-group">
                  <input type="hidden" class="form-control" id="modal-previous-img">
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
              <!--
              <div class="form-group">
                  <label for="modal-price">Product Category</label>
                  <select name="" id="">
                    <option value="Sin Categoría">Select category</option>
                    <option value="Bebidas">Bebidas</option> 
                    <option value="Comidas">Comidas</option>
                  </select>
              </div>
              -->
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

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
            <button @click="deleteProduct()" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "ProductCards",
  data() {
    return {
      data: this.test,
    };
  },
  props: ['test'],
  methods: {
    getProducts: function() {
      axios.post("http://localhost:3000/api/product")
      .then((respuesta) => {
        this.data = respuesta.data
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
        .post("http://localhost:3000/api/upload", formData)
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
      
      axios
        .put('http://localhost:3000/api/product/' + id, { 
          id: id,
          name: name,
          price: price,
          description: description,
          image_url: filename
        })
        .then(() => {
          this.getProducts()
        }, (error) => {
          console.log(error);
        });
    },
    updateModal: function(id, name, price, description, image_url) {
      $("#modal-id").val(id);
      $("#modal-name").val(name);
      $("#modal-price").val(price);
      $("#modal-description").val(description);
      $("#modal-previous-img").val(image_url);
    },
    deleteModal: function(id, name) {
      $("#delete-id").val(id);
      $("#delete-name").val(name);
      $("#title-delete").text("Are you sure about delete " + name + " product")
    },
    deleteProduct: function() {
      let id = $("#delete-id").val();
      axios
        .delete('http://localhost:3000/api/product/' + id)
        .then(() => {
          this.getProducts()
        }, (error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getProducts()
  },
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Varela+Round);

*, *:before, *:after {
  box-sizing: border-box;
}

body {
  background: #383A3F;
  font-family: "Varela Round", sans-serif;
}

.card {
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

  .title {
    font-size: 25px;
  }

  .icon {
    margin: 50px 0;
    width: 100%;
  }

  .icon svg path {
    fill: #F6B352
  }
  .icon svg {
    width: 100px;
    height: 100px;
  }

  .features ul {
    padding: 0;
    margin: 20px 0 50px 0;
    list-style-type: none;
  }

  .features ul li {
    margin: 10px 0;
    font-size: 14px;
  }

  .features ul li span {
    border-bottom: 2px dotted #F6B352;
  }

  .btn {
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

  .btn :hover {
    background: #F68657;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  .product-image {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    object-fit: cover;
  }

  .icon {
    margin-top: 20px;
    margin-bottom: 90px;
  }

  label {
    color: black !important;
  }

  @media screen and (max-width: 738px) {
    .card {
      margin: 10px 20px;
      width: calc(100% - 40px);
    }
  }

</style>