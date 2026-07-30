<template>
  <footer class="bg-secondaryBlue text-base-white py-12 px-6 md:px-12 border-t border-[#5F7CE0]/30">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <!-- Columna 1: Logo y lema -->
      <div class="flex flex-col items-center md:items-start gap-4">
        <h2 class="font-ancient text-3xl md:text-4xl text-[#5F7CE0]">
          Realm Properties
        </h2>
        <p class="text-sm opacity-80 text-center md:text-left">
          "Donde los sueños encuentran su morada eterna"
        </p>
      </div>

      <!-- Columna 2: Enlaces rápidos -->
      <div class="flex flex-col items-center md:items-start gap-3">
        <h3 class="font-morris text-lg text-[#5F7CE0] mb-2">Navegación</h3>
        <router-link
          to="/home"
          class="hover:text-[#5F7CE0] transition-colors duration-300"
        >
          Inicio
        </router-link>
        <router-link 
          to="/about" 
          class="hover:text-[#5F7CE0] transition-colors duration-300"
        >
          Sobre Nosotros
        </router-link>
        <router-link
          to="/properties"
          class="hover:text-[#5F7CE0] transition-colors duration-300"
        >
          Propiedades
        </router-link>
        <router-link
          to="/contact"
          class="hover:text-[#5F7CE0] transition-colors duration-300"
        >
          Contáctanos
        </router-link>
      </div>

      <!-- Columna 3: Contacto y redes -->
      <div class="flex flex-col items-center md:items-start gap-3">
        <h3 class="font-morris text-lg text-[#5F7CE0] mb-2">Contacto</h3>
        <p class="text-sm">📍 Ciudad del Reino, Reino Properties</p>
        <p class="text-sm">📧 info@realmproperties.com</p>
        <p class="text-sm">📞 +1 (555) 123-4567</p>

        <div class="flex gap-4 mt-4">
          <!-- Iconos de redes (puedes usar heroicons, font-awesome o imágenes) -->
          <a href="#" class="hover:text-[#5F7CE0] transition-colors">
            <img src="../assets/icons/instagram.svg" alt="Instagram">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <!-- Icono Instagram (ejemplo) -->
            </svg>
          </a>
          <!-- Puedes añadir más iconos: Facebook, WhatsApp, etc. -->
           <a href="#" class="hover:text-[#5F7CE0] transition-colors">
            <img src="../assets/icons/facebook.svg" alt="Facebook">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              
            </svg>
          </a>
          <a href="#" class="hover:text-[#5F7CE0] transition-colors">
            <img src="../assets/icons/twitter.svg" width="24" alt="X">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Línea final -->
    <div class="mt-12 pt-8 border-t border-[#5F7CE0]/20 text-center text-sm opacity-70">
      <p>© {{ currentYear }} Realm Properties • Forjada con honor y visión</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* Opcional: hover más mágico */
a:hover {
  text-shadow: 0 0 8px rgba(95, 124, 224, 0.5);
}
</style>
