import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginUser from "../views/LoginUser.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login-user",
      name: "Se connecter",
      component: LoginUser,
    },
    {
      path: "/register-user",
      name: "S'enregistrer",
      component: () => import("../views/RegisterUser.vue"),
    },
    {
      path: "/create-entity",
      name: "Create entity",
      component: () => import("../views/CreateEntity.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NotFound,
    },
  ],
});

export default router;
