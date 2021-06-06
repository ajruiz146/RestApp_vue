<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
  beforeUnmount() {
    localStorage.token = null
  }
};
</script>

<style>
div.pagination {
  padding-bottom: 10px;
}

.filters input {
  height: 24px !important;
}

.filters select {
  height: 31px !important;
}

.nav-link-hover:hover {
  color: #741922 !important;
  transform: scale(1.01);
}

.btn {
  background: #741922 !important;
  background-color: #741922 !important;
  border-color: #741922 !important;
  color: white !important;
}

#myDropdown{
  left: 0px;
  top: 30px;
}

table .dropdown button{
  background-color: transparent !important;
  padding: 0!important;
  padding-bottom: 5px !important;
  color: #741922 !important;
  position: relative;
  top: -5px;
  
  font-size: 2em !important;
  margin-bottom: 2px;
}

table .dropdown button:hover{
  color: #741922 !important;
}
</style>