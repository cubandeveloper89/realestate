<script setup lang="ts">
import HeaderComponent from "./components/HeaderComponent.vue";
</script>

<template>
  <!-- Flex column so a view can claim the remaining viewport height with
       flex-1, without hard-coding the header's height anywhere. -->
  <div class="flex min-h-dvh flex-col">
    <HeaderComponent />
    <router-view></router-view>
  </div>
</template>
