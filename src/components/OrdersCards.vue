<template>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Pedido attr</th>
      <th scope="col">Pedido attr</th>
      <th scope="col">Pedido attr</th>
    </tr>
  </thead>
  <tbody>
    <tr   
    v-for="item in data.data" 
    :key="item.id">
      <th scope="row">{{ item.id }}</th>
      <td>Pedido value</td>
      <td>Pedido value</td>
      <td>Pedido value</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import axios from "axios";

export default {
  name: 'WaitersCards',
  data() {
    return {
      data: ''
    };
  },
  mounted() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => (this.data = response))
  },
};
</script>