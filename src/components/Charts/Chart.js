import Chart from "chart.js";
import axios from "axios";

export const ordersChart = {
  createChart(chartId) {
    const chartColor = "#FFFFFF";
    const fallBackColor = "#f96332";
    const color = this.color || fallBackColor;
    const ctx = document.getElementById(chartId).getContext("2d");
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, color);
    gradientStroke.addColorStop(1, chartColor);
    var lastMonthsOrders = null;
    axios
      .get(process.env.VUE_APP_API + "statistics")
      .then((response) => {
        console.log(response);
        
        lastMonthsOrders = response.data.lastMonthsOrders;
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [lastMonthsOrders[0]._id, lastMonthsOrders[0]._id, lastMonthsOrders[0]._id, lastMonthsOrders[0]._id, lastMonthsOrders[0]._id],
            datasets: [
              {
                label: "Sales",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                backgroundColor: "#fb6340",
                data: [lastMonthsOrders[0].count, lastMonthsOrders[0].count, lastMonthsOrders[0].count, lastMonthsOrders[0].count, lastMonthsOrders[1].count, lastMonthsOrders[0].count],
                maxBarThickness: 10,
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
                  gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    drawBorder: false,
                    drawTicks: false,
                    lineWidth: 0,
                    zeroLineWidth: 0,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                  },
                  ticks: {
                    beginAtZero: true,
                    padding: 10,
                    fontSize: 13,
                    fontColor: "#8898aa",
                    fontFamily: "Open Sans",
                    callback: function (value) {
                      if (!(value % 10)) {
                        return value;
                      }
                    },
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    drawBorder: false,
                    drawOnChartArea: false,
                    drawTicks: false,
                  },
                  ticks: {
                    padding: 20,
                    fontSize: 13,
                    fontColor: "#8898aa",
                    fontFamily: "Open Sans",
                  },
                },
              ],
            },
          },
        });
      })


  },
};

const funcs = {
  ordersChart() {},
};

export default funcs;
