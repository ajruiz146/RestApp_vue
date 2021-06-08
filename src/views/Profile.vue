<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 600px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center" v-if="user">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{user.name}} </h1>
            <p class="text-white mt-0 mb-5">
              This is your profile page. You can see your information and change your profile
            </p>
            <a href="javascript:void(0)" class="btn btn-info">Log Out</a>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7" v-if="user != null">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0" >
          <div class="card card-profile shadow">
            
            <img src="img/brand/vertical.png" class="rounded-circle"/>
            
            <div class="card-body pt-0 pt-md-4">
              <div class="text-center">
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{user.role}}
                </div>
                <div class="margin-bottom-3">
                  <i class="ni education_hat mr-2"></i>{{user.email}}
                </div>
                
                <h3>
                  {{ user.name + " " + user.lastName}}
                </h3>
                <hr class="my-4" />
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4" v-if="user">User information</h6>
              <div class="pl-lg-4">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-group">
                            <label for="profile-name"><b>Name</b></label>
                            <input type="text" class="form-control" id="profile-name">
                        </div>
                        <div class="form-group">
                            <label for="profile-lastName"><b>Last Name</b></label>
                            <input type="text" class="form-control" id="profile-lastName">
                        </div>
                        <div class="form-group">
                            <label for="profile-email"><b>Email</b></label>
                            <input type="email" class="form-control" id="profile-email">
                        </div>
                        <div class="form-group">
                            <label for="profile-role"><b>Role</b></label>
                            <select class="form-control form-select" id="profile-role">
                              <option value="bar">Bar</option>
                              <option value="admin">Admin</option>
                              <option value="client">Client</option>
                              <option value="kitchen">Kitchen</option>
                            </select>
                            <small class="success-message" id="profile-change"></small>
                            <small class="error-message" id="profile-change-error"></small>
                        </div>
                        <input type="button" @click="updateProfile()" value="Change Profile" class="btn btn-primary">
                        <hr>
                        <div class="form-group">
                            <label for="last-password"><b>Last Password</b></label>
                            <input type="password" class="form-control" id="last-password">
                        </div>

                        <div class="form-group">
                            <label for="new-password"><b>New Password</b></label>
                            <input type="password" class="form-control" id="new-password">
                        </div>
                        <div class="form-group">
                            <label for="confirm-password"><b>Confirm Password</b></label>
                            <input type="password" class="form-control" id="confirm-password">
                            <small id="password-change-alert" class="error-message"></small>
                            <small id="password-correct-alert" class="success-message"></small>
                        </div>
                        <input type="button" @click="changePassword()" value="Change Password" class="btn btn-primary">
                    </div>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import $ from "jquery"
export default {
  data() {
    return {
      user: null
    };
  },
    methods: {
      logout: function() {
          this.$router.push("/login")
          localStorage.removeItem('token');
      },
      getUser: function() {
          axios
          .post(process.env.VUE_APP_API + "user/myUser",{}, {
            headers: {
            "x-access-token": localStorage.token
          }}).then((response) => {
              this.user = response.data
          }) 
      },
      updateProfile: function() {
        let name = $("#profile-name").val()
        let lastName = $("#profile-lastName").val()
        let email = $("#profile-email").val()
        let role = $("#profile-role").val()
        let password = $("#profile-password").val()
        if(this.checkUpdate(name, lastName, email)) {
        axios
          .put(process.env.VUE_APP_API + "user/" + this.user._id,
            {
              name: name,
              lastName: lastName,
              email: email,
              role: role,
              password: password,
            }, 
            {
              headers: {
              "x-access-token": localStorage.token
            }
          }).then(() => {
            localStorage.role = role
            this.getUser()
            $("#profile-change").text("Profile updated success");
            $("#profile-change-error").text("");
          }, () => {
            $("#profile-change-error").text("Email registed yet");
            $("#profile-change").text("");
          }) 
        }
      },
      updateFields: function() {
        $("#profile-name").val(this.user.name)
        $("#profile-lastName").val(this.user.lastName)
        $("#profile-email").val(this.user.email)
        $("#profile-role").val(this.user.role)
      },
      changePassword: function() {
        let last_password = $("#last-password").val()
        let new_password = $("#new-password").val()
        let confirm_password = $("#confirm-password").val()
        if(new_password === confirm_password) {
          axios
          .post(process.env.VUE_APP_API + "auth/changeMyPassword",
            {
              oldPassword: last_password,
              newPassword: new_password,
            }, 
            {
              headers: {
              "x-access-token": localStorage.token
            }
          }).then(() => {
            this.getUser()
            $("#password-correct-alert").text("Password succesfully changed")
            $("#password-change-alert").text("")
          }, ()=> {
            $("#password-change-alert").text("Wrong old password")
            $("#password-correct-alert").text("")
          })             
        } else {
          $("#password-change-alert").text("Passwords do not match")
          $("#password-correct-alert").text("")
        }
        $("#last-password").val("")
        $("#new-password").val("")
        $("#confirm-password").val("")
      },
      getUserStats: function() {
        axios
        .post(process.env.VUE_APP_API + "user/myUser", {}, {
          headers: {
            "x-access-token": localStorage.token
          }
        })
        .then((response) => {
          localStorage.role = response.data.role
        },() => { 
          localStorage.removeItem("role")
          localStorage.removeItem("token")
        })
      },
      checkUpdate: function(name, lastName, email) {
        let status = true
        let small = "<small class='small-control'>Insert a valid value</small>"
        $(".small-control").remove();
        $(".success-message").text("");
        if(name == "") {
          status = false
          $("#profile-name").after(small)
        }else if(lastName == "") {
          status = false
          $("#profile-lastName").after(small)
        }else if(email == "") {
          status = false
          $("#profile-email").after(small)
        }
        return status
      }
    },
    created() {
      this.getUserStats();
    },
    beforeMount(){
      this.getUser()
    },
    updated() {
      this.updateFields()
    },
};
</script>
<style scoped> 

span.bg-gradient-success {
    background: #741922 !important;
}

.btn {
    background: #172b4d !important;
    border-color: #172b4d !important;
}

.col-8 h3 {
    width: 100px;
}

.margin-bottom-3 {
    margin-bottom: 10px;
}

div.bg-primary {
    min-height: 0 !important;
    height: 400px;
}

img {
    height: 150px;
    width: 300px;
    object-fit: contain;
    margin: 0 auto;
    margin-top: 40px;
}

form {
  margin: 0 auto;
}
</style>