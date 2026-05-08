<script setup lang="ts">
import { computed } from "vue";
import { properties, formatPropertyPrice } from "../data/properties";

const featuredProperty = computed(() => properties[0]);
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] text-[#1f2933]">
    <section class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:px-8">
      <div class="text-left">
        <p class="font-typewriter text-sm uppercase tracking-[0.18em] text-[#5F7CE0]">
          Boutique real estate
        </p>
        <h1 class="mt-4 font-ancient text-6xl leading-none text-[#172033] md:text-7xl">
          Realm Properties
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-[#44515f]">
          Curated homes with character, clear details, and a calmer path from first look to private showing.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <router-link
            to="/properties"
            class="rounded bg-[#5F7CE0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#4b63bd]"
          >
            View Properties
          </router-link>
          <router-link
            to="/contact"
            class="rounded border border-[#5F7CE0] px-5 py-3 text-sm font-semibold text-[#24304f] transition hover:bg-white"
          >
            Request a Showing
          </router-link>
        </div>
      </div>

      <article class="overflow-hidden rounded-lg bg-white shadow-xl">
        <img
          :src="featuredProperty.heroImage"
          :alt="featuredProperty.title"
          class="h-80 w-full object-cover"
        />
        <div class="p-6 text-left">
          <p class="text-sm uppercase tracking-[0.16em] text-[#5F7CE0]">
            Featured listing
          </p>
          <h2 class="mt-2 font-morris text-3xl text-[#172033]">
            {{ featuredProperty.title }}
          </h2>
          <p class="mt-2 text-[#596675]">{{ featuredProperty.location }}</p>
          <p class="mt-4 text-2xl font-semibold text-[#172033]">
            {{ formatPropertyPrice(featuredProperty) }}
          </p>
          <router-link
            :to="`/properties/${featuredProperty.slug}`"
            class="mt-5 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
          >
            Inspect Property
          </router-link>
        </div>
      </article>
    </section>
  </main>
</template>
