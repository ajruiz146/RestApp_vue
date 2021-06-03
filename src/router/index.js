import { createRouter, createWebHashHistory } from "vue-router";

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

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

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
      },
      {
        path: "/products",
        name: "products",
        components: { default: Products },
      },
      {
        path: "/staff",
        name: "staff",
        components: { default: Staff },
      },
      {
        path: "/orders",
        name: "orders",
        components: { default: Orders },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
      {
        path: "/users",
        name: "users",
        components: { default: Users },
      },
      {
        path: "/kitchen",
        name: "kitchen",
        components: { default: Kitchen },
      },
      {
        path: "/bar",
        name: "bar",
        components: { default: Bar },
      },
      {
        path: "/qr",
        name: "qr",
        components: { default: Qr },
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
      {
        path: "/register",
        name: "register",
        components: { default: Register },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});



export default router;