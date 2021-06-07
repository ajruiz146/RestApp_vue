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
              <span :class="incomesFromLastMonth > 0 ? 'text-success' : 'text-danger'">
                <i :class="incomesFromLastMonth > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{ incomesFromLastMonth }}%
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
              <span :class="ordersFromLastMonth > 0 ? 'text-success' : 'text-danger'">
                <i :class="ordersFromLastMonth > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{ ordersFromLastMonth }}%
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
              <span :class="usersFromLastMonth > 0 ? 'text-success' : 'text-danger'">
                <i :class="usersFromLastMonth > 0 ? 'fa fa-arrow-up' : 'fa fa-arrow-down'"></i> {{ usersFromLastMonth }}%
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
              </span>
              <span class="text-nowrap"></span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <UsersCards/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import UsersCards from '@/components/Cards/UsersCards'

export default {
  name: "orders",
  components: {
    UsersCards
  },
  data() {
    return {
      totalIncomes: null,
      totalOrders: null,
      totalStaff: null,
      totalUsers: null,
      incomesFromLastMonth: null,
      ordersFromLastMonth: null,
      usersFromLastMonth: null,
    };
  },
  methods: {
    getStatistics: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.totalIncomes = response.data.totalIncomes
        this.totalOrders = response.data.totalOrders
        this.totalStaff = response.data.totalStaff
        this.totalUsers = response.data.totalUsers
        this.incomesFromLastMonth = response.data.incomesFromLastMonth.toFixed(2)
        this.ordersFromLastMonth = response.data.ordersFromLastMonth.toFixed(2)
        this.usersFromLastMonth = response.data.usersFromLastMonth.toFixed(2)
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
        localStorage.role = response.data.role
      },() => { 
        localStorage.removeItem("role")
        localStorage.removeItem("token")
      })
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
