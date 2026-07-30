<template>
  <!-- Flush left, ink on ground, closed by a strong 2px rule. -->
  <footer class="mt-auto border-t-2 border-divider bg-surface px-4 py-12">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-3">
      <!-- Columna 1: Logo y lema -->
      <div>
        <h2 class="text-2xl">Realm Properties</h2>
        <p class="text-muted mt-2 max-w-prose text-sm">
          "Where dreams find their eternal home"
        </p>
      </div>

      <!-- Columna 2: Enlaces rápidos -->
      <div>
        <h6>Navigation</h6>
        <div class="mt-3 flex flex-col items-start gap-2">
          <router-link
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="text-sm text-text no-underline transition-colors duration-200 hover:text-accent"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>

      <!-- Columna 3: Contacto y redes -->
      <div>
        <h6>Contact</h6>
        <div class="text-muted mt-3 flex flex-col gap-2 text-sm">
          <p class="m-0 flex items-center gap-2">
            <svg
              class="shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Kingdom City, Realm Properties
          </p>
          <p class="m-0 flex items-center gap-2">
            <svg
              class="shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            info@realmproperties.com
          </p>
          <p class="m-0 flex items-center gap-2">
            <svg
              class="shrink-0"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            +1 (555) 123-4567
          </p>
        </div>

        <!-- Lucide, inline so the marks inherit currentColor and stay mono. -->
        <div class="mt-5 flex gap-2">
          <a href="#" class="btn btn-secondary btn-icon" aria-label="Instagram">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a href="#" class="btn btn-secondary btn-icon" aria-label="Facebook">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" class="btn btn-secondary btn-icon" aria-label="X">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Línea final -->
    <div class="mx-auto mt-12 max-w-7xl border-t-2 border-divider pt-6">
      <p class="text-muted m-0 text-xs">
        © {{ currentYear }} Realm Properties • Forged with honor and vision
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())

const navLinks = [
  { label: 'Home', href: '/home' },
  { label: 'About Us', href: '/about' },
  { label: 'Properties', href: '/properties' },
  { label: 'Contact Us', href: '/contact' },
]
</script>
