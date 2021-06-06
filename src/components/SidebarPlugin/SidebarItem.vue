<template>
  <li class="nav-item">
    <router-link
      :to="link.path"
      @click="linkClick"
      class="nav-link"
      :target="link.target"
      :href="link.path"
    >
      <!--<i :class="link.icon"></i> -->
      <img class="nav-bar-svg" :src="link.src" alt="">
      <span class="nav-link-text">{{ link.name }}</span>
    </router-link>
  </li>
</template>
<script>
export default {
  name: "sidebar-item",
  props: {
    link: {
      type: Object,
      default: () => {
        return {
          name: "",
          path: "",
          children: [],
        };
      },
      description:
        "Sidebar link. Can contain name, path, icon and other attributes. See examples for more info",
    },
  },
  inject: {
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      children: [],
      collapsed: true,
    };
  },
  methods: {
    linkClick() {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>

<style scoped>
  .nav-bar-svg {
    position: relative;
    top: -1px;
    width: 16px;
    margin-right: 7px;
  }

  @media (min-width: 768px){
    .navbar-vertical.navbar-expand-md .navbar-nav .nav-link.active:before {
      top: 0.25rem;
      bottom: 0.25rem;
      left: 10px;
      right: auto;
      border-left: 3px solid #741922 !important;
      border-bottom: 0;
    }
  }
</style>