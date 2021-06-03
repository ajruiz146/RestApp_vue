import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ArgonDashboard from "./plugins/argon-dashboard";
import $ from 'jquery'

import "element-plus/lib/theme-chalk/index.css";

const appInstance = createApp(App);
appInstance.use(router);
appInstance.use($);
appInstance.use(ArgonDashboard);
appInstance.mount("#app");
