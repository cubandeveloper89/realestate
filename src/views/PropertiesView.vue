<script setup lang="ts">
import { properties, formatPropertyPrice } from "../data/properties";
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] px-6 py-12 text-[#1f2933] lg:px-8">
    <section class="mx-auto max-w-7xl">
      <div class="max-w-3xl text-left">
        <p class="font-typewriter text-sm uppercase tracking-[0.18em] text-[#5F7CE0]">
          Curated portfolio
        </p>
        <h1 class="mt-3 font-ancient text-6xl leading-none text-[#172033]">
          Properties
        </h1>
        <p class="mt-4 text-lg leading-8 text-[#596675]">
          A focused collection of homes chosen for location, character, and long-term value.
        </p>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="property in properties"
          :key="property.id"
          class="overflow-hidden rounded-lg bg-white text-left shadow-lg"
        >
          <img
            :src="property.heroImage"
            :alt="property.title"
            class="h-56 w-full object-cover"
          />
          <div class="p-5">
            <div class="flex items-center justify-between gap-3">
              <span class="rounded bg-[#e8ecff] px-3 py-1 text-xs font-semibold uppercase text-[#4b63bd]">
                {{ property.status }}
              </span>
              <span class="text-sm text-[#596675]">{{ property.type }}</span>
            </div>
            <h2 class="mt-4 font-morris text-2xl text-[#172033]">
              {{ property.title }}
            </h2>
            <p class="mt-1 text-sm text-[#596675]">{{ property.location }}</p>
            <p class="mt-4 text-xl font-semibold text-[#172033]">
              {{ formatPropertyPrice(property) }}
            </p>
            <dl class="mt-4 grid grid-cols-3 gap-3 text-sm text-[#44515f]">
              <div>
                <dt class="font-semibold">Beds</dt>
                <dd>{{ property.bedrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Baths</dt>
                <dd>{{ property.bathrooms }}</dd>
              </div>
              <div>
                <dt class="font-semibold">Sq ft</dt>
                <dd>{{ property.areaSqFt.toLocaleString() }}</dd>
              </div>
            </dl>
            <p class="mt-4 text-sm leading-6 text-[#596675]">
              {{ property.summary }}
            </p>
            <router-link
              :to="`/properties/${property.slug}`"
              class="mt-5 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
            >
              View Details
            </router-link>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
