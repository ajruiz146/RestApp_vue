<template>
    <div class="card shadow">
        <input id="printPdf" class="btn" type="button" value="Imprimir"/>
        <div class="card-body">
            <div class="orders-container">
                <div id="pdf" class="pendings-list lists">
                    <ol class="qr-list">
                        <div class="qr-container" v-for="url in urls" :key="url.id">
                            <h1>Table {{ url.table_number }}</h1>    
                            <img :src="url.url" class="qr-img">
                        </div>
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
        tables: [],
        delivereds: [],
        urls: [],

    };
  },
  methods: {
    getTables: function() {
      axios
      .get(process.env.VUE_APP_API + "table", {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        this.tables = response.data
        this.getQr()
      }) 
    },
    getQr: function() {
        //this.urls = new Object();
        
        for(let i = 0; i < this.tables.length; i ++) {
            axios
            .get("https://api.qrserver.com/v1/create-qr-code/?data=" + this.tables[i]._id + "&color=741922")
            .then((response) => {
                let url = new Object();
                url.id = this.tables[i]._id
                url.url = response.config.url
                url.table_number = this.tables[i].table_number
                this.urls.push(url)
            })
        }
    },
  },
  mounted() {
    this.getTables();
  },
  beforeMount() {
      /*
    if(!localStorage.token) {
      this.$router.push("/login")
    }
    */
  }, 
};
</script>

<style scoped>
    h1 {
        text-align: center;
    }

    ol {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .qr-container {
        margin: 50px;
    }

    .qr-img  {
        width: 380px;
    }
    .btn {
        width: 100%;
    }

    .qr-list {
        padding-left: 0;
    }

    #printPdf {
        background-color: #32325d !important;
    }

@media screen and (max-width: 500px) {
    .qr-container {
        width: 100%;
        margin: 20px 5px
    }

    .qr-container img{
        width: 100%;
        margin: 0;
    }
}
</style>

