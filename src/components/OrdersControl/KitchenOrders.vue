<template>
    <div class="card shadow">
        <div class="card-body">
            <div class="orders-container">
                <div class="pendings-list lists">
                    <ol class="rectangle-list">
                        <h1>Pending</h1>
                        <li class="list-li" v-for="item in pendings" :key="item.id">
                            <a v-if="item.products[0]" href="javascript:void(0)" @click="updateOrders(item._id, item.kitchen_delivered)">
                                <div class="products-interior" v-for="product in item.products" :key="product.id">
                                    <span class="time">{{ getTime(item.date) }}</span> | <span class="amount">{{ product.amount }}</span> - <span class="name">{{ product.name }}</span>
                                </div>     
                            </a>
                        </li>
                    </ol>
                </div>
                <div class="delivered-list lists">
                    <ol class="rectangle-list delivered">
                        <h1>Delivered</h1>
                        <li class="list-li" v-for="item in delivereds" :key="item.id">
                            <a v-if="item.products[0]" href="javascript:void(0)" @click="updateOrders(item._id, item.kitchen_delivered)">
                                <div class="products-interior" v-for="product in item.products" :key="product.id">
                                    <span class="time">{{ getTime(item.date) }}</span> | <span class="amount">{{ product.amount }}</span> - <span class="name">{{ product.name }}</span>
                                </div>     
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-end" :class="type === 'dark' ? 'bg-transparent' : ''"></div>
        </div>
        <div class="hide-left-sidebar"></div>
    </div>
</template>

<script>
import axios from "axios";
//import $ from "jquery";

export default {
  data() {
    return {
        pendings: [],
        delivereds: [],
        timer: "",
    };
  },
    methods: {
        getPending: function() {
            console.log("Entra")
        axios
        .get(process.env.VUE_APP_API + "order/kitchen/pending")
        .then((response) => {
            this.pendings = response.data
            console.log(response)
        })
        },
        getDelivered: function() {
        axios
        .get(process.env.VUE_APP_API + "order/kitchen/delivered")
        .then((response) => {
            this.delivereds = response.data
        }) 
        },
        updateOrders: function(id, delivered) {
            delivered = !delivered
            axios
            .put(process.env.VUE_APP_API + "order/kitchen/toggle/" + id, {
                kitchen_delivered: delivered
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

    .lists {
        display: flex;
        justify-content: center;
        align-content: center;
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
    margin: .5em 0 .5em 2.5em;
    background: #ddd;
    color: #444;
    text-decoration: none;
    transition: all .3s ease-out;
    font-size: 1.5em;
  }

    .rectangle-list a:hover{
        background: #eee;
    }

    .rectangle-list a:before{
        content: counter(li);
        counter-increment: li;
        position: absolute;
        left: -2.5em;
        top: 50%;
        margin-top: -1em;
        background: #dc3545;
        color: white;
        height: 2em;
        width: 2em;
        line-height: 2em;
        text-align: center;
        font-weight: bold;
    }

    .delivered a:before {
        background: #2dce89;
    }
    .rectangle-list a:after{
        position: absolute;
        content: '';
        border: .5em solid transparent;
        left: -1em;
        top: 50%;
        margin-top: -.5em;
        transition: all .3s ease-out;
    }

    .rectangle-list a:hover:after{
        left: -.5em;
        border-left-color: #2dce89;
    }

    .delivered a:hover:after{
        left: -.5em;
        border-left-color: #fa8072;
    }

    @media screen and (max-width: 1170px) {
        .orders-container {
            flex-direction: column;
            align-items: center;
        }
        .lists {
            min-width: 400px;
        }
    }

    @media screen and (max-width: 620px) {
        .rectangle-list a{
            padding: .4em;
        }
    }

    @media screen and (max-width: 500px) {
        .products-interior {
            font-size: 0.7em;
        }

        .rectangle-list a:before {
            left: -1.5em;
            margin-top: -0.7em;
            height: 1.4em;
            width: 1.4em;
            line-height: 1.4em;
        }

        .rectangle-list a {
            margin-left: 1.5em;
        }
    }

</style>

