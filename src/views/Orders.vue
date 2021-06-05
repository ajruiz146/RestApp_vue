<template>
  <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total incomes"
            type="gradient-red"
            :sub-title="totalIncomes + ' $'"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 3.48%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total orders"
            type="gradient-yellow"
            :sub-title="totalOrders + ' orders'"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 12.18%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="total users"
            type="gradient-purple"
            :sub-title="totalUsers + ' users'"
            icon="ni ni-single-02"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2">
                <i class="fa fa-arrow-down"></i> 5.72%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="total staff"
            type="gradient-info"
            :sub-title="totalStaff +' members'"
            icon="fa fa-users"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> 54.8%
              </span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <OrdersCards/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios"
import OrdersCards from '@/components/Cards/OrdersCards'

export default {
  name: "orders",
  components: {
    OrdersCards,
  },
  data() {
    return {
      totalIncomes: null,
      totalOrders: null,
      totalStaff: null,
      totalUsers: null,
    };
  },
  methods: {
    getStatistics: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics")
      .then((response) => {
        this.totalIncomes = response.data.totalIncomes
        this.totalOrders = response.data.totalOrders
        this.totalStaff = response.data.totalStaff
        this.totalUsers = response.data.totalUsers
      })
    },
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
  mounted() {
    this.getStatistics()
  }
};
</script>
<style>
  .card-header {
    display:flex;
    justify-content: space-between;
  }
  
</style>
