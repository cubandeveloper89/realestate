<script setup lang="ts">
import Footer from "./components/Footer.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent />
  <router-view />
  <Footer />
</template>
