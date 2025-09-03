import { createMemoryHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import PropertiesView from "../views/PropertiesView.vue";
import AboutView from "../views/AboutView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/contact", component: ContactView },
  { path: "/properties", component: PropertiesView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
