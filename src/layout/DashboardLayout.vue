<template>
  <div id="wrapper-main" class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Products',
            icon: 'ni ni-basket text-orange',
            path: '/products',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Staff',
            icon: 'ni ni-pin-3 text-orange',
            path: '/staff',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Orders',
            icon: 'ni ni-single-02 text-yellow',
            path: '/orders',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/tables',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Users',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/users',
          }"
        />
        
        <br>
        <a href="#/kitchen" target="_blank">Kitchen</a>
        <a href="#/bar" target="_blank">Bar</a>
        <br>  
        <a @click="logout()" href="javascript:void(0)" target="">Logout</a>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    logout: function() {
      this.$router.push("/login")
      localStorage.removeItem('token');
    }
  },
};
</script>
<style lang="scss"></style>
