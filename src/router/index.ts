import { createMemoryHistory, createRouter } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import ContactView from "../views/ContactView.vue";
import PropertiesView from "../views/PropertiesView.vue";
import AboutView from "../views/AboutView.vue";
import RegisterView from "../views/auth/RegisterView.vue";

const routes = [
  { path: "/", component: LoginView },
  { path: "/login", component: LoginView },
  { path: "/home", component: HomeView },
  { path: "/register", component: RegisterView },
  { path: "/contact", component: ContactView },
  { path: "/properties", component: PropertiesView },
  { path: "/about", component: AboutView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
