<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Where did you meet us from?</h3>
        </div>
        <div class="col text-right">
          <a @click="getTopAndVisitors()" href="javascript:void(0)" class="btn btn-sm btn-primary">Refresh</a>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="referrals">
        <template v-slot:columns>
          <th>Media</th>
          <th>Total</th>
          <th>Percentage</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item._id }}
          </th>
          <td>
            {{ row.item.count }}
          </td>
          <td>
            <div class="d-flex align-items-center">
              
              <base-progress
                id="progress-meet"
                style="margin-right: 20px"
                :type="row.item.progressType"
                class="pt-0"
                :show-percentage="false"
                :value="row.item.percentage"
              />
              <span class="mr-2">{{ row.item.percentage }}%</span>
            </div>
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "page-visits-table",
  data() {
    return {
      referrals: null,
      tableData: [
        {
          page: "/argon/",
          visitors: "4,569",
          unique: "340",
          bounceRate: "46,53%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/index.html",
          visitors: "3,985",
          unique: "319",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/charts.html",
          visitors: "3,513",
          unique: "294",
          bounceRate: "36,49%",
          bounceRateDirection: "down",
        },
        {
          page: "/argon/tables.html",
          visitors: "2,050",
          unique: "147",
          bounceRate: "50,87%",
          bounceRateDirection: "up",
        },
        {
          page: "/argon/profile.html",
          visitors: "1,795",
          unique: "190",
          bounceRate: "46,53%",
          bounceRateDirection: "down",
        },
      ],
    };
  },
  methods: {
    getTopAndVisitors: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.referrals = response.data.referrals
      })
      
    },
  },
  mounted() {
    this.getTopAndVisitors();
  }
};
</script>
<style>
.progress .bg-default {
  background-color: #741922 !important;
}
</style>
