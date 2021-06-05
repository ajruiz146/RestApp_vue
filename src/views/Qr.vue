<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row header-text-container">
        <h1>QR</h1>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <QrGenerate/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import QrGenerate from "@/components/OrdersControl/QrGenerate.vue";
import axios from "axios"

export default {
  components: {
    QrGenerate,
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
</style>