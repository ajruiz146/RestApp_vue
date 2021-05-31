<template>
    <div class="create-button">
        <div class="modal fade" id="orderCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Create order</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                    </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="createProduct()" type="button" class="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        <i class="ni ni-fat-add"></i>
        <a data-toggle="modal" data-target="#orderCreate" href="javascript:void(0)">Add New</a>
    </div>
</template>

<script>
import axios from 'axios';
//import $ from 'jquery';

export default {
  name: 'Waiters',
  data() {
    return {
      
    };
  },
  methods: {
      createProduct() {
        axios.post('/login', {
        data1: 'data',
        data2: 'data'
        });
      }
  },
};
</script>

<style scoped>
    .ni-fat-add {
        vertical-align: middle;
        margin-bottom: 3px;
    }
</style>