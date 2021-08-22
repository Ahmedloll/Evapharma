import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/login.vue";
import countries from "../components/countries.vue";
import Cities from "../components/cities.vue";
import tryagain from "../components/tryagain.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: login,
  },
  {
    path: "/countries",
    name: "countries",
    component: countries,
  },
  {
    path: "/Cities/:id",
    name: "Cities",
    component: Cities,
  },
  {
    path: "/tryagain",
    name: "tryagain",
    component: tryagain,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
