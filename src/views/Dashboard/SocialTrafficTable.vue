<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Top products</h3>
        </div>
        <div class="col text-right">
          <base-button size="sm" @click="getTopProducts()" type="primary">Refresh</base-button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table thead-classes="thead-light" :data="topProducts">
        <template v-slot:columns>
          <th>Product</th>
          <th>Request</th>
        </template>

        <template v-slot:default="row">
          <th scope="row">
            {{ row.item._id }}
          </th>
          <td>
            {{ row.item.count }}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "social-traffic-table",
  data() {
    return {
      topProducts: null,
      tableData: [
        {
          name: "Facebook",
          visitors: "1,480",
          progress: 60,
          progressType: "gradient-danger",
        },
        {
          name: "LinkedIn",
          visitors: "5,480",
          progress: 70,
          progressType: "gradient-success",
        },
        {
          name: "Google",
          visitors: "4,807",
          progress: 80,
          progressType: "gradient-primary",
        },
        {
          name: "Instagram",
          visitors: "3,678",
          progress: 75,
          progressType: "gradient-info",
        },
        {
          name: "Twitter",
          visitors: "2,645",
          progress: 30,
          progressType: "gradient-warning",
        },
      ],
    };
  },
  methods: {
    getTopProducts: function() {
      axios
      .get(process.env.VUE_APP_API + "statistics")
      .then((response) => {
        this.topProducts = response.data.topProducts
      })
      
    },
  },
  mounted() {
    this.getTopProducts();
  }
};
</script>
<style></style>
