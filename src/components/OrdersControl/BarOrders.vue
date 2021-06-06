<template>
    <div class="card shadow">
        <div class="card-body">        
            <div class="orders-container">
                <div class="pendings-list lists">
                    <ol class="rectangle-list">
                        <h1>Pending</h1>
                        <li class="list-li" v-for="item in pendings" :key="item.id">
                            <div class="order-information">
                                <div v-if="item.products[0]" class="table-number">
                                    <span>{{ item.table.table_number }}</span>
                                </div>
                                <div v-if="item.products[0]" class="order-time">
                                    <span>{{ getTime(item.date) }}</span>
                                </div>
                            </div>
                            <a v-if="item.products[0]" href="javascript:void(0)" @click="updateOrders(item._id, item.bar_delivered)">
                                <div class="products-interior" v-for="product in item.products" :key="product.id">
                                    <span class="amount">{{ product.amount }}</span> - <span class="name">{{ product.name }}</span>
                                </div>     
                            </a>
                        </li>
                    </ol>
                </div>
                <div class="delivered-list lists">
                    <ol class="rectangle-list delivered">
                        <h1>Delivered</h1>
                        <li class="list-li" v-for="item in delivereds" :key="item.id">
                            <div class="order-information">
                                <div v-if="item.products[0]" class="table-number">
                                    <span>{{ item.table.table_number }}</span>
                                </div>
                                <div v-if="item.products[0]" class="order-time">
                                    <span>{{ getTime(item.date) }}</span>
                                </div>
                            </div>
                            <a v-if="item.products[0]" href="javascript:void(0)" @click="updateOrders(item._id, item.bar_delivered)">
                                <div class="products-interior" v-for="product in item.products" :key="product.id">
                                    <span class="amount">{{ product.amount }}</span> - <span class="name">{{ product.name }}</span>
                                </div>     
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
        </div>
        <div class="hide-left-sidebar"></div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            pendings: [],
            delivereds: []
        };
    },
    methods: {
        getPending: function() {
        axios
        .get(process.env.VUE_APP_API + "order/bar/pending", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
        .then((response) => {
            this.pendings = response.data
        }) 
        },
        getDelivered: function() {
        axios
        .get(process.env.VUE_APP_API + "order/bar/delivered", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
        .then((response) => {
            this.delivereds = response.data
        }) 
        },
        updateOrders: function(id, delivered) {
            delivered = !delivered
            axios
            .put(process.env.VUE_APP_API + "order/bar/toggle/" + id, {
                bar_delivered: delivered
            }, {
            headers: {
                "x-access-token": localStorage.token
                }
            })
            .then(() => {
                this.getPending()
                this.getDelivered()
                
            }) 
        },
        cancelAutoUpdate () {
            clearInterval(this.timer);
        },
        refresh: function() {
            this.getPending();
            this.getDelivered();
        },
        getTime: function(timeDate) {
            let dateLocal = new Date(timeDate)
            let currentHours = dateLocal.getHours();
            let currentMinutes = dateLocal.getMinutes();
            currentHours = ("0" + currentHours).slice(-2);
            currentMinutes = ("0" + currentMinutes).slice(-2);
            let time = currentHours+":"+currentMinutes;
            return time
        }
    },
    mounted() {
        this.getPending();
        this.getDelivered();
        this.timer = setInterval(this.refresh, 5000);
    },
    beforeUnmount () {
        this.cancelAutoUpdate();
    },
};
</script>

<style scoped>

    .lists {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 50%;
    }

    .rectangle-list {
        width: 80%;
    }

    .rectangle-list a{
        text-align: center;
        min-width: 400px;
    }

    .rectangle-list {
        width: 80%;
    }

    .rectangle-list a{
        text-align: center;
        min-width: 400px;
    }
    
    h1 {
        text-align: center;
        margin-bottom: 30px;
    }

    .orders-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
    }

    

    ol {
        counter-reset: li; 
        list-style: none; 
        padding: 0;
        margin-bottom: 4em;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
    }

    ol ol {
        margin: 0 0 0 2em; /* Add some left margin for inner lists */
    }

    .rectangle-list a{
    position: relative;
    display: block;
    padding: 1em 3em 1em 3em;
    background: #ddd;
    color: #444;
    text-decoration: none;
    transition: all .3s ease-out;
    font-size: 1.5em;
  }

    
    .rectangle-list a:hover{
        background: #eee;
    }

    .delivered a:before {
        background: #2dce89;
    }
    .rectangle-list a:after{
        position: absolute;
        content: '';
        border: .5em solid transparent;
        left: 97%;
        top: 50%;
        margin-top: -.5em;
        transition: all .3s ease-out;
    }
    
    .delivered a:after {
        position: absolute;
        content: '';
        border: .5em solid transparent;
        left: 0;
        top: 50%;
        transform: rotate(180deg);
        margin-top: -.5em;
        transition: all .3s ease-out;
    }

    .rectangle-list a:hover:after{
        left: 100%;
        border-left-color: #2dce89;
    }

    .delivered a:hover:after{
        left: -1em;
        border-left-color: #fa8072;
    }

    .table-number{
        background: #741922 !important;
        color: white;
        height: 3em;
        width: 3em;
        line-height: 3em;
        text-align: center;
        font-weight: bold;
        position: relative;
    }
    
    .order-time {
        background: #172b4d !important;
        color: white;
        height: 3em;
        width: 4em;
        line-height: 3em;
        text-align: center;
        font-weight: bold;
        position: relative;
        
    }

    .order-time, .table-number {
        margin: 0 10px;
        position: relative;
        top: 15px;
        z-index: 100;
    }

    .order-information {
        display: flex;
        justify-content: center;
    }
    
    @media screen and (max-width: 1170px) {
        .orders-container {
            flex-direction: column;
            align-items: center;
        }
        .lists {
            width: 100%;
        }
        .card-body {
            padding: 0;
        }
    }

    @media screen and (max-width: 600px) {
        .products-interior {
            font-size: .8em;
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }

        .list-li a {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }

        .rectangle-list a{
            text-align: center;
            min-width: 0;
        }

    }
    
</style>
