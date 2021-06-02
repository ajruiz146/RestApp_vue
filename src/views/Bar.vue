<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row header-text-container">
        <h1>Bar Orders</h1>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <BarOrders/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BarOrders from "@/components/OrdersControl/BarOrders.vue";

export default {
  components: {
    BarOrders,
  }
}
</script>

<style scoped>
    div.header {
        height: 150px;
    }
    .header-text-container {
        position: relative;
        top: -50px;
    }
    .header-text-container h1{
        text-align: center;
        color: white !important;
    }
</style>