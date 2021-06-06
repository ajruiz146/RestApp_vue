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

</style>