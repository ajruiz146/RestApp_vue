<template>

<div class="card shadow">
  <div class="card-header bg-transparent">
    <h3 class="mb-0">Staff</h3>
    <div class="create-button">
      <i class="ni ni-fat-add"></i>
    </div>
    <div class="filters">
      <select class="form-select form-select-sm" name="" id="">
        <option value="">Select Staff</option>
        <option value="">Waiters</option>
        <option value="">Cookers</option>
      </select>
      <select class="form-select form-select-sm" name="" id="">
        <option value="">Per Page</option>
        <option value="">12</option>
        <option value="">20</option>
        <option value="">50</option>
      </select>
      <select class="form-select form-select-sm" name="" id="">
        <option value="">Order by</option>
        <option value="">Name Asc</option>
        <option value="">Name Desc</option>
      </select>
    </div>
  </div>
  <div class="card-body">
    <div class="wrapper">
      <!-- inicio card -->

      <!-- fin card -->
    </div>
  </div>
  <div
    class="card-footer d-flex justify-content-end"
    :class="type === 'dark' ? 'bg-transparent' : ''"
  >
    <base-pagination total="40"></base-pagination>
  </div>
</div>

</template>

<script>
import axios from "axios";

export default {
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

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;500&display=swap");

.ni-fat-add {
  cursor: pointer;
  font-size: 1.5em;
  color: #741922;
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

.wrapper {
    display: flex;
    flex-wrap: wrap;
}

/* A partir de aquí */


</style>