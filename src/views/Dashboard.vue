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
      <!--Charts-->
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                  <h5 class="h3 text-white mb-0">Last Months Incomes</h5>
                </div>
                <div class="col">
                  <ul class="nav nav-pills justify-content-end">
                    <li class="nav-item mr-2 mr-md-0">
                      <a
                        class="nav-link py-2 px-3"
                        href="#"
                        :class="{ active: bigLineChart.activeIndex === 0 }"
                        @click.prevent="initBigChart(0)"
                      >
                        <span class="d-none d-md-block">Refresh</span>
                        <span class="d-md-none">M</span>
                      </a>
                    </li>
                    <li class="nav-item">
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="salesChartID"></canvas>
            </div>
          </card>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent" style="padding-bottom: 30px;">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">
                    Performance
                  </h6>
                  <h5 class="h3 mb-0">Total orders in lasts months</h5>
                </div>
              </div>
            </template>
            <div class="chart-area">
              <canvas :height="350" :id="ordersChartID"></canvas>
            </div>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </div>
        <div class="col-xl-4">
          <social-traffic-table></social-traffic-table>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>
<script>
// Charts
import { ordersChart } from "@/components/Charts/Chart";
import Chart from "chart.js";
import axios from "axios";

import PageVisitsTable from "./Dashboard/PageVisitsTable";
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";

let chart;

export default {
  components: {
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      info: null,
      salesChartID: "salesChart",
      ordersChartID: "ordersChart",
      lastMonthsIncomes: 100,
      bigLineChart: {
        allData: [
          [10, 20, 10, 30, 15],
        ],
        activeIndex: 0,
      },
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
    initBigChart(index) {
      chart.destroy();
      chart = new Chart(
        document.getElementById(this.salesChartID).getContext("2d"),
        {
          type: "line",
          data: {
            labels: [this.lastMonthsIncomes[0]?._id ?? "No data", this.lastMonthsIncomes[1]?._id ?? "No data", this.lastMonthsIncomes[2]?._id ?? "No data", this.lastMonthsIncomes[3]?._id ?? "No data", this.lastMonthsIncomes[4]?._id ?? "No data"],
            datasets: [
              {
                label: "Incomes",
                tension: 0.4,
                borderWidth: 4,
                borderColor: "#5e72e4",
                pointRadius: 0,
                backgroundColor: "transparent",
                data: this.bigLineChart.allData[index],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              enabled: true,
              mode: "index",
              intersect: false,
            },
            scales: {
              yAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 0,
                    fontColor: "#8898aa",
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 1.6,
                  gridLines: {
                    drawBorder: false,
                    color: "rgba(29,140,248,0.0)",
                    zeroLineColor: "transparent",
                  },
                  ticks: {
                    padding: 10,
                    fontColor: "#8898aa",
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  },
                },
              ],
            },
            layout: {
              padding: 0,
            },
          },
        }
      );
      this.bigLineChart.activeIndex = index;
      
    },
    getStatistics: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.totalIncomes = response.data.totalIncomes.toFixed(2)
        this.totalOrders = response.data.totalOrders
        this.totalStaff = response.data.totalStaff
        this.totalUsers = response.data.totalUsers
        this.incomesFromLastMonth = response.data.incomesFromLastMonth.toFixed(2)
        this.ordersFromLastMonth = response.data.ordersFromLastMonth.toFixed(2)
        this.usersFromLastMonth = response.data.usersFromLastMonth.toFixed(2)

        this.lastMonthsIncomes = response.data.lastMonthsIncomes
        this.lastMonthsOrders = response.data.lastMonthsOrders
      
        this.initBigChart(0)
        this.bigLineChart.allData = [
          [this.lastMonthsIncomes[0]?.total ?? 0, this.lastMonthsIncomes[1]?.total ?? 0, this.lastMonthsIncomes[2]?.total ?? 0, this.lastMonthsIncomes[3]?.total ?? 0, this.lastMonthsIncomes[4]?.total ?? 0],
        ]
        this.initBigChart(0)
      })
    },
    refreshStatistics: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.totalIncomes = response.data.totalIncomes.toFixed(2)
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
    },
    cancelAutoUpdate () {
      clearInterval(this.timer);
    },
  },
  beforeMount() {
   this.getStatistics();
   this.timer = setInterval(this.refreshStatistics, 5000);
  },
  beforeUnmount () {
    this.cancelAutoUpdate();
  },
  mounted() {
    chart = new Chart(
      document.getElementById(this.salesChartID).getContext("2d"),
      {
        type: "line",
        data: {
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Performance",
              tension: 0.4,
              borderWidth: 4,
              borderColor: "#5e72e4",
              pointRadius: 0,
              backgroundColor: "transparent",
              data: this.bigLineChart.allData[1],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            mode: "index",
            intersect: false,
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 0,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 10,
                  fontColor: "#8898aa",
                  fontSize: 13,
                  fontFamily: "Open Sans",
                },
              },
            ],
          },
          layout: {
            padding: 0,
          },
        },
      }
    );
    ordersChart.createChart(this.ordersChartID);
  },
  created() {
    this.getUserStats();
  }
};
</script>
<style></style>
