<template>
    <div class="create-button">
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