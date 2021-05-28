<template>
<div class="wrapper">
  <div class="card" 
  v-for="item in data.data" 
  :key="item.id"
  >
    <div class="title">{{ item.name }}</div>
    <div class="icon">
      <img class="product-image" v-bind:src="item.image_url" alt=""/>
    </div>
    <div class="buttons">
      <a data-toggle="modal" data-target="#productEdit" href="#" class="btn" data-id>Edit</a>
      <a href="#" class="btn">Delete</a>
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
                    <label for="exampleInputEmail1">Product name</label>
                    <input type="email" class="form-control" id="product-name" aria-describedby="emailHelp" name="name" :placeholder="item.name">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Product description</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Description">
                </div>
                </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="updateProduct(item.id)" type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>

  </div>
</div>

</template>

<script>
import axios from "axios";
import $ from 'jquery';

export default {
  name: 'WaitersCards',
  data() {
    return {
      data: ''
    };
  },
  methods: {
    updateProduct(id) {
      let nameValue = $('#product-name').val();
      axios.put('http://localhost:3000/api/product/' + id, { 
        name: nameValue 
      }).then((response) => {
        this.data = response
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
  },
  mounted() {
      axios.post('http://localhost:3000/api/product')
      .then((response) => {
        this.data = response
        console.log(response);
      }, (error) => {
        console.log(error);
      });
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