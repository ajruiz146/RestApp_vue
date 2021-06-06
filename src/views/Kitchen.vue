<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row header-text-container">
        <h1>Kitchen Orders</h1>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <KitchenOrders/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import KitchenOrders from "@/components/OrdersControl/KitchenOrders.vue";
import axios from "axios"

export default {
  components: {
    KitchenOrders,
  },
  methods: {
    getUserStats: function() {
      axios
      .post(process.env.VUE_APP_API + "user/myUser", {}, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        if(response.data.role != "admin" || !localStorage.token) {
          this.$router.push("/login")
        }
      },() => { this.$router.push("/login") })
    }
  },
  created() {
    this.getUserStats();
  },
}
</script>

<style scoped>
    div.header {
        height: 150px;
    }
    .header-text-container {
        position: relative;
        top: -65px;
    }
    .header-text-container h1{
        text-align: center;
        color: white !important;
        font-size: 2.2em;
    }

    @media screen and (max-width: 768px) {
      .header-text-container {
        top: -30px;
      }
      .header-text-container h1{
        text-align: center;
        color: white !important;
        font-size: 1.7em;
      }
    }
</style>