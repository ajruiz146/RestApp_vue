import { createRouter, createWebHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Products from "../views/Products.vue";
import Staff from "../views/Staff.vue";
import Orders from "../views/Orders.vue";
import Tables from "../views/Tables.vue";
import Users from "../views/Users.vue";
import Kitchen from "../views/Kitchen.vue";
import Bar from "../views/Bar.vue";
import Qr from "../views/Qr.vue";
import Profile from "../views/Profile.vue";

import Login from "../views/Login.vue";

//import axios from "axios";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/products",
        name: "products",
        components: { default: Products },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/staff",
        name: "staff",
        components: { default: Staff },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/orders",
        name: "orders",
        components: { default: Orders },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/users",
        name: "users",
        components: { default: Users },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/kitchen",
        name: "kitchen",
        components: { default: Kitchen },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/bar",
        name: "bar",
        components: { default: Bar },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/qr",
        name: "qr",
        components: { default: Qr },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
        beforeEnter: (to, from, next) => {
          if(!localStorage.token || localStorage.role != "admin")
            router.push("/login")
          next();
        }
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});


export default router;