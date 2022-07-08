import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Page1",
    component: () => import("../views/Page1.vue"),
  },
  {
    path: "/page2",
    name: "Page2",
    component: () => import("../views/Page2.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
