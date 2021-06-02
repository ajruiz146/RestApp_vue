<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/github.svg"
              /></span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/google.svg"
              /></span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or sign in with credentials</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
              id="emailAccess"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
              id="passwordAccess"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative" style="visibility: hidden;"></base-checkbox>
            <div class="text-center">
              <button @click="getAccess()" class="btn btn-primary my-4">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import $ from "jquery"


export default {
  name: "login",
  data() {
    return {
      model: {
        role: null,
        token: null
      },
    };
  },
  methods: {
    getAccess: function() {
      
      let email = $("#emailAccess").val()
      let password = $("#passwordAccess").val()
      console.log(email, password)
      axios
      .post(process.env.VUE_APP_API + "auth/login", {
        email: email,
        password: password
      })
      .then((response) => {
        this.role = response.data.role
        this.token = response.data.token
        if(this.role == "client" && this.token != "") {
          this.$router.push('/');
          localStorage.token = this.token
        }
      }) 
    },
    getUser: function() {
      
      let email = $("#emailAccess").val()
      let password = $("#passwordAccess").val()
      console.log(email, password)
      axios
      .post(process.env.VUE_APP_API + "auth/home", {
        email: email,
        password: password
      })
      .then((response) => {
        this.role = response.data.role
        this.token = response.data.token
        if(this.role == "client" && this.token != "") {
          this.$router.push('/');
          localStorage.token = this.token
        }
      }) 
    },
  }
};
</script>
<style></style>
