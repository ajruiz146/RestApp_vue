<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 3.48%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 12.18%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-success mr-2"
                ><i class="fa fa-arrow-up"></i> 54.8%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Products</h3>
              <i class="ni ni-fat-add" data-toggle="modal" data-target="#productCreate"></i>
              <FilterProducts/>
            </div>
            <div class="card-body">
              <ProductCard/>
              <div
                class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent' : ''"
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="productCreate" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Create product</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="modal-name">Product Name</label>
                        <input type="text" class="form-control" id="create-name">
                    </div>
                    <div class="form-group">
                        <label for="modal-price">Product Price</label>
                        <input type="text" class="form-control" id="create-price">
                    </div>
                    <div class="form-group">
                        <label for="modal-description">Product Description</label>
                        <input type="text" class="form-control" id="create-description">
                    </div>
                    <div class="form-group">
                        <label for="modal-image_url">Product Image</label>
                        <input type="file" class="form-control" id="create-image_url">
                    </div>
                    <!--
                    <div class="form-group">
                        <label for="modal-price">Product Category</label>
                        <select name="" id="">
                            <option value="Sin Categoría">Select category</option>
                            <option value="Bebidas">Bebidas</option> 
                            <option value="Comidas">Comidas</option>
                        </select>
                    </div>
                    -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button @click="createProduct()" type="button" class="btn btn-primary">Save changes</button>
                <button @click="handleClick()" type="button" class="btn btn-primary"> Hoa {{ text }}</button>
            </div>
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import FilterProducts from "@/components/Filters/FilterProducts.vue";
import ProductCard from "@/components/Cards/ProductCard.vue";
import axios from "axios";
import $ from "jquery"
export default {
  name: 'Waiters',
  components: {
    FilterProducts,
    ProductCard,
  },
  data() {
    return {
      example: "Hello world"
    };
  },
  props: {
    text: String
  },
  methods: {
    getProducts: function() {
      axios.post("http://localhost:3000/api/product")
      .then((respuesta) => {
        this.test = respuesta.data
      }, (error) => {
        console.log(error);
      });
    },
    createProduct: function() {
      if($("#create-image_url").val() != "") {
        this.uploadFile()
      } else {
        let img = 'default'
        this.updateProductValues(img)
      }
    },
    uploadFile: function() {
      var file = $('#create-image_url').prop('files')[0];
      var filename = null;
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:3000/api/upload", formData)
        .then((result) => {
          filename = result.data.filename
          this.updateProductValues(filename)
        }, (error) => (console.log(error)));
    },
    updateProductValues: function(filename) {
      let name = $('#create-name').val();
      let price = $('#create-price').val();
      let description = $('#create-description').val();
      axios
        .post("http://localhost:3000/api/product/create", {
          name: name,
          price: price,
          description: description,
          image_url: filename,
          category: "Sin Categoría"
        })
        .then((response) => {
          this.getProducts()
          console.log(response)
        }, (error) => {
          console.log(error);
        });
    },
    handleClick: function() {
      this.$emit("click", this.example);
    }
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
}

.ni {
  cursor: pointer;
}
</style>
