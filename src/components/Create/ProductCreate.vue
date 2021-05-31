<template>
    <div class="create-button">
        
        <i class="ni ni-fat-add"></i>
        <a data-toggle="modal" data-target="#productCreate" href="javascript:void(0)">Add New</a>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery';

export default {
  name: 'Waiters',
  data() {
    return {
      
    };
  },
  methods: {
    getProducts: function() {
      axios.post("http://localhost:3000/api/product")
      .then((respuesta) => {
        this.data = respuesta.data
      }, (error) => {
        console.log(error);
      });
    },
    createProduct: function() {
      if($("#create-image_url").val() != "") {
        this.uploadFile()
      } else {
        let img = 'default'
        this.updateProductValues(img)
      }
    },
    uploadFile: function() {
      var file = $('#create-image_url').prop('files')[0];
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
      let name = $('#create-name').val();
      let price = $('#create-price').val();
      let description = $('#create-description').val();
      axios
        .post("http://localhost:3000/api/product/create", {
          name: name,
          price: price,
          description: description,
          image_url: filename,
          category: "Sin Categoría"
        })
        .then((response) => {
          this.getProducts()
          console.log(response)
        }, (error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
    .ni-fat-add {
        vertical-align: middle;
        margin-bottom: 3px;
    }
</style>