import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import batimentRouter from "./batiment-router";

// TODO use constants to `path`
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
      component: () => import("../views/LoginUser.vue"),
    },
    {
      path: "/forgotten-password",
      name: "Mot de passe oublié",
      component: () => import("../views/ForgottenPassword.vue"),
    },
    {
      path: "/register-user",
      name: "S'enregistrer",
      component: () => import("../views/RegisterUser.vue"),
    },
    {
      path: "/legal-info",
      name: "Informations légales",
      component: () => import("../views/LegalInfo.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/NotFound.vue"),
    },
    batimentRouter,
  ],
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
