<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <img src="@/../public/img/brand/logo.png" style="width: 60%">
          </div>
          <div class="btn-wrapper text-center">
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with your credentials</small>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
              id="emailAccess"
              @keyup.enter="getAccess()"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
              id="passwordAccess"
              @keyup.enter="getAccess()"
            >
            
            </base-input>
            <small id="credential-error"></small>

            <base-checkbox class="custom-control-alternative" style="visibility: hidden;"></base-checkbox>
            <div class="text-center">
              <a @click="getAccess()" class="btn btn-primary my-4">Sign in</a>
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
        token: null,
      },
    };
  },
  methods: {
    getAccess: function() {
      let email = $("#emailAccess").val()
      let password = $("#passwordAccess").val()
      axios
      .post(process.env.VUE_APP_API + "auth/login", {
        email: email,
        password: password
      }, {
        headers: {
          "x-access-token": localStorage.token
        }
      })
      .then((response) => {
        const role = response.data.role
        const token = response.data.token
        if(role == "admin") {
          localStorage.token = token
          localStorage.role = role
          this.$router.push('/');
        }else {
          localStorage.removeItem("token")
          localStorage.removeItem("role")
          this.error = "Credential error"
          this.$router.push('/login');
          $("#credential-error").text("Credential error")
          $("#passwordAccess").text("")
        }
      })
      .catch(() => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        $("#credential-error").text("Credential error")
        $("#passwordAccess").val("")
      }) 
    },
  }
};
</script>
<style scoped>
  #credential-error {
    color: red;
    font-size: .8em !important;
  }
</style>
