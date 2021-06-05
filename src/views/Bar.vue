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
import axios from "axios"

export default {
  components: {
    BarOrders,
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
        response.data.role
        if(response.data.role != "admin" || !localStorage.token) {
          this.$router.push("/login")
        }
        console.log(response)
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
        top: -50px;
    }
    .header-text-container h1{
        text-align: center;
        color: white !important;
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