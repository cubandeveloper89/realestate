<template>
  <header class="sticky top-0 z-50 bg-bg">
    <!-- Full-bleed bar: the 2px rule runs edge to edge and does the organising. -->
    <nav class="nav">
      <router-link to="/" class="nav-brand flex items-center gap-3 no-underline">
        <img
          src="../assets/img/realmsquare.png"
          alt=""
          class="grayscale h-9 w-9"
        />
        <span>Realm Properties</span>
      </router-link>

      <!-- Desktop navigation -->
      <div class="hidden items-center gap-6 md:flex" ref="menuRef">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.href"
          class="transition-colors duration-200"
        >
          {{ item.name }}
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <button
        @click="toggleMobileMenu"
        type="button"
        class="btn btn-secondary btn-icon md:hidden"
        :aria-expanded="isMobileMenuOpen"
      >
        <span class="sr-only">Abrir menú principal</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <template v-if="!isMobileMenuOpen">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </template>
          <template v-else>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </template>
        </svg>
      </button>
    </nav>

    <!-- Mobile navigation -->
    <div
      class="overflow-hidden border-b-2 border-divider bg-surface transition-all duration-300 ease-in-out md:hidden"
      :class="isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 border-b-0 opacity-0'"
    >
      <router-link
        v-for="item in menuItems"
        :key="item.name"
        :to="item.href"
        class="block px-4 py-3 text-sm text-text no-underline transition-colors duration-200 hover:text-accent aria-[current=page]:text-accent"
        @click="closeMobileMenu"
      >
        {{ item.name }}
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
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
    { name: 'Inicio', href: '/home' },
    { name: 'Acerca', href: '/about' },
    { name: 'Propiedades', href: '/properties' },
    { name: 'Contacto', href: '/contact' },
  ]
})

// Estado reactivo
const isMobileMenuOpen = ref<boolean>(false)

// Métodos
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false
}

// Cerrar menú móvil al redimensionar la ventana
const handleResize = (): void => {
  if (window.innerWidth >= 768) {
    isMobileMenuOpen.value = false
  }
}

// Animacion entrada del menu — restrained: the system doesn't let things float in.
const animatemenu = () => {
  if (menuRef.value) {
    gsap.from(menuRef.value.children, {
      opacity: 0,
      y: -12,
      ease: 'power2.out',
      duration: 0.5,
      stagger: 0.06,
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
