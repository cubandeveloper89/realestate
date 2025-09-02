<template>
  <header class="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center space-x-2 group">
            <!-- Puedes reemplazar esto con tu logo -->
              <img 
                src="../assets/img/realmsquare.png" 
                alt="Logo" 
                class="w-14 h-14 hover:scale-105 transition-transform duration-200 rounded-lg"
              />
            <span class="font-ancient text-xl font-semibold text-gray-900 group-hover:text-[#5F7CE0] transition-colors duration-200">
              Realm Properties
            </span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4" ref="menuRef">
            <router-link
              v-for="item in menuItems"
              :key="item.name"
              :to="item.href"
              class="text-gray-700 hover:text-[#5F7CE0] px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50 relative group"
              :class="{ 'text-[#5F7CE0] bg-blue-50': isActiveRoute(item.href) }"
            >
              {{ item.name }}
              <!-- Línea de subrayado animada -->
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
            :aria-expanded="isMobileMenuOpen"
          >
            <span class="sr-only">Abrir menú principal</span>
            <!-- Hamburger Icon -->
            <svg 
              class="transition-transform duration-300"
              :class="{ 'rotate-45': isMobileMenuOpen }"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" v-show="!isMobileMenuOpen"></line>
              <line x1="3" y1="12" x2="21" y2="12" v-show="!isMobileMenuOpen"></line>
              <line x1="3" y1="18" x2="21" y2="18" v-show="!isMobileMenuOpen"></line>
              <line x1="18" y1="6" x2="6" y2="18" v-show="isMobileMenuOpen"></line>
              <line x1="6" y1="6" x2="18" y2="18" v-show="isMobileMenuOpen"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div 
        class="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
          <router-link
            v-for="item in menuItems"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-[#5F7CE0] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-white"
            :class="{ 'text-[#5F7CE0] bg-white': isActiveRoute(item.href) }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { gsap } from 'gsap'

const menuRef = ref<HTMLElement | null>(null)

// Interfaces
interface MenuItem {
  name: string
  href: string
}

// Props (opcional, para hacer el componente más flexible)
interface Props {
  logoText?: string
  logoImageUrl?: string
  menuItems?: MenuItem[]
}

withDefaults(defineProps<Props>(), {
  logoText: 'TuLogo',
  logoImageUrl: '',
  menuItems: () => [
    { name: 'Inicio', href: '/' },
    { name: 'Acerca', href: '/about' },
    { name: 'Servicios', href: '/services' },
    { name: 'Contacto', href: '/contact' },
  ]
})

// Estado reactivo
const isMobileMenuOpen = ref<boolean>(false)
const route = useRoute()

// Métodos
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

const isActiveRoute = (href: string): boolean => {
  return route.path === href
}

// Cerrar menú móvil al redimensionar la ventana
const handleResize = (): void => {
  if (window.innerWidth >= 768) {
    isMobileMenuOpen.value = false
  }
}

// Animacion entrada del menu
const animatemenu = () => {
  if (menuRef.value) {
    gsap.from(menuRef.value, {
      opacity: 0,
      y: -100,
      ease: "power2.out",
      duration: 1,
    })
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
    animatemenu()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Animaciones adicionales si necesitas algo específico */
</style>