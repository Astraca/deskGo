import { createWebHashHistory, createRouter } from "vue-router";

// import HomeView from './HomeView.vue'
const routes = [
  { path: "/", redirect: "/course" },
  //   { path: "*", component: () => import("@/view/404.vue") },
  //   {
  //     path: "/404",
  //     name: "404",
  //     component: () => import("@/view/404.vue"),
  //   },

  {
    path: "/course",
    component: () => import("@/view/CoursePage.vue"),
  },
  {
    path: "/weather",
    component: () => import("@/view/WeatherPage.vue"),

  },
  {
    path: "/setting",
    component: () => import("@/view/SettingPage.vue"),

  },
  {
    path: "/:pathMatch(.*)",
    component: () => import("@/view/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
