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
      axios
      .post(process.env.VUE_APP_API + "auth/login", {
        email: email,
        password: password
      })
      .then((response) => {
        const role = response.data.role
        const token = response.data.token
        if(role == "admin") {
          localStorage.token = token
          this.$router.push('/');
        }else {
          this.$router.push('/login');
        }
      })
      .catch(() => {
        localStorage.removeItem("token")
      }) 
    },
  }
};
</script>
<style></style>
