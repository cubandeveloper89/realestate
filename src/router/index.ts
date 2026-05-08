import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import PropertiesView from "../views/PropertiesView.vue";
import PropertyDetailView from "../views/PropertyDetailView.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/properties", name: "properties", component: PropertiesView },
  {
    path: "/properties/:slug",
    name: "property-detail",
    component: PropertyDetailView,
    props: true,
  },
  { path: "/contact", name: "contact", component: ContactView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
