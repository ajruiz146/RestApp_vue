<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="navbar-brand-img" alt="..." />
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <base-dropdown class="nav-item" position="right">
            <template v-slot:title>
              <a class="nav-link" href="#" role="button">
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img
                      alt="Image placeholder"
                      src="img/brand/single.png"
                    />
                  </span>
                </div>
              </a>
            </template>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <a @click="logout()" href="javascript:void(0)" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button
                @click="closeSidebar"
              ></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"> </slot>
        </ul>
        <!--Divider-->
        <hr class="my-3" />
        <div class="special-links">
          <li class="nav-item">
            <a href="/kitchen" class="nav-link">Kitchen</a>
          </li>

          <li class="nav-item">
            <a href="/bar" class="nav-link">Bar</a>
          </li>

          <li class="nav-item">
            <a href="/qr" class="nav-link">QR Codes</a>
          </li>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/logo-horizontal.svg",
      description: "Sidebar app logo",
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item",
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
    logout: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      this.$router.push("/login")
    },
  },
  beforeUnmount() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style scoped>
  .avatar {
    background-color: white !important;
  }

  .special-links {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .special-links .nav-item a {
    background: #741922;
    border-radius: calc(0.375rem - 1px);
    margin: 0;
    padding: .3em;
    margin: 5px 0;
    color: white;
    padding-left: 20px;
    font-size: .9em !important;
  }

  .special-links .nav-item a:hover {
    background: #551319 !important;
  }

  .special-links .nav-item a:after {
    content: "";
    width: 15px;
    height: 15px;
    position: relative;
    left: 10px;
    top: 1.5px;
    display: inline-block;
    background-image: url(../../../public/img/icons/foreign_white.svg);
  }
</style>