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

li.nav-item:hover, li.nav-item:hover span{
  color: #741922 !important;
  transform: scale(1.02);
}

</style>