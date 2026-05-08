<script setup lang="ts">
import { computed } from "vue";
import { findPropertyBySlug, formatPropertyPrice } from "../data/properties";

const props = defineProps<{
  slug: string;
}>();

const property = computed(() => findPropertyBySlug(props.slug));
</script>

<template>
  <main class="min-h-screen bg-[#f7f3ea] px-6 py-12 text-[#1f2933] lg:px-8">
    <section v-if="property" class="mx-auto max-w-6xl">
      <router-link to="/properties" class="text-sm font-semibold text-[#5F7CE0] hover:text-[#4b63bd]">
        Back to properties
      </router-link>

      <div class="mt-6 overflow-hidden rounded-lg bg-white shadow-xl">
        <img
          :src="property.heroImage"
          :alt="property.title"
          class="h-[28rem] w-full object-cover"
        />
        <div class="grid gap-8 p-6 text-left lg:grid-cols-[1fr_20rem] lg:p-8">
          <div>
            <p class="text-sm uppercase tracking-[0.16em] text-[#5F7CE0]">
              {{ property.type }} · {{ property.status }}
            </p>
            <h1 class="mt-3 font-ancient text-6xl leading-none text-[#172033]">
              {{ property.title }}
            </h1>
            <p class="mt-3 text-lg text-[#596675]">{{ property.location }}</p>
            <p class="mt-6 text-base leading-8 text-[#44515f]">
              {{ property.description }}
            </p>
          </div>

          <aside class="rounded bg-[#f7f3ea] p-5">
            <p class="text-2xl font-semibold text-[#172033]">
              {{ formatPropertyPrice(property) }}
            </p>
            <dl class="mt-5 grid grid-cols-3 gap-3 text-sm text-[#44515f]">
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
            <div class="mt-6 space-y-3">
              <div
                v-for="feature in property.features"
                :key="feature.label"
                class="flex justify-between gap-4 border-t border-[#d9d2c3] pt-3 text-sm"
              >
                <span class="font-semibold text-[#172033]">{{ feature.label }}</span>
                <span class="text-right text-[#596675]">{{ feature.value }}</span>
              </div>
            </div>
            <router-link
              to="/contact"
              class="mt-6 inline-flex w-full justify-center rounded bg-[#5F7CE0] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4b63bd]"
            >
              Request Private Showing
            </router-link>
          </aside>
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-3xl rounded-lg bg-white p-8 text-center shadow-lg">
      <h1 class="font-ancient text-5xl text-[#172033]">Property not found</h1>
      <p class="mt-3 text-[#596675]">
        The listing may have moved, sold, or never existed in this realm.
      </p>
      <router-link
        to="/properties"
        class="mt-6 inline-flex rounded bg-[#172033] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2d3b52]"
      >
        Return to Properties
      </router-link>
    </section>
  </main>
</template>
